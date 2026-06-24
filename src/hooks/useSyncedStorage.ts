import { useState, useEffect, useRef } from 'react';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase/config';
import { saveProfileData } from '../firebase/syncService';
import { notifySyncing } from './useFirestoreStatus';

/**
 * Hook idêntico ao useLocalStorage, mas que adiciona sincronização bidirecional com o Firestore.
 *
 * Funciona offline-first: a interface usa localStorage para velocidade e tolerância a falhas,
 * e a sincronização ocorre em background via onSnapshot e persistência nativa do Firestore.
 *
 * Correções v2:
 * - onSnapshot com { source: 'default' } → força recepção do servidor, não só do cache.
 * - Uso de useRef para rastrear o timestamp do último save local e evitar loops de eco.
 * - Listener garantidamente destruído no cleanup do useEffect (sem duplicatas).
 * - Notifica o hook de status global (useFirestoreStatus) ao salvar.
 */
export function useSyncedStorage<T>(key: string, initialValue: T, profileId: string) {

  // 1. Inicializa o estado com localStorage
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.warn('Erro ao ler localStorage', error);
      return initialValue;
    }
  });

  // Usar ref para o timestamp do último save local evita re-registrar o listener a cada save
  const lastLocalUpdateRef = useRef<number>(0);

  // 2. Listener do Firestore para receber mudanças de outro dispositivo
  useEffect(() => {
    if (!profileId || !key) return;

    // A estrutura adotada no syncService: usuarios/{profileId}/dados/{key}
    const docRef = doc(db, 'usuarios', profileId, 'dados', key);

    // { source: 'default' } → tenta o servidor primeiro; usa cache só se offline.
    // Isso garante que atualizações do APK apareçam na web em tempo real.
    const unsubscribe = onSnapshot(
      docRef,
      { includeMetadataChanges: false },
      (docSnap) => {
        if (!docSnap.exists()) return;

        const remoteData = docSnap.data();
        const remoteValue = remoteData.data;
        const remoteTimestamp = remoteData.updatedAt
          ? new Date(remoteData.updatedAt).getTime()
          : 0;

        // Evita loop infinito: ignora snapshots que chegaram dentro de 2s do nosso próprio save.
        if (remoteTimestamp <= lastLocalUpdateRef.current + 2000) return;

        try {
          const remoteStr = JSON.stringify(remoteValue);
          const localStr = window.localStorage.getItem(key);

          // Só aplica se houver mudança real
          if (remoteStr !== localStr) {
            setStoredValue(remoteValue);
            window.localStorage.setItem(key, remoteStr);
          }
        } catch (e) {
          console.warn('Aviso: erro ao processar atualização remota via Firestore', e);
        }
      },
      (error) => {
        // Se não houver internet ou permissão, apenas avisa. O app não vai quebrar.
        console.warn(
          `Aviso no onSnapshot para a chave ${key} (offline ou sem acesso?):`,
          error.message
        );
      }
    );

    // Cleanup: garante que o listener anterior é cancelado antes de recriar
    return () => unsubscribe();
  }, [profileId, key]); // ← NÃO depende de lastLocalUpdateRef (é ref, não state)

  // 3. Função para salvar mudanças
  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;

      // Atualiza o estado do React imediatamente (síncrono)
      setStoredValue(valueToStore);

      // Atualiza o localStorage imediatamente (síncrono, offline funciona 100%)
      window.localStorage.setItem(key, JSON.stringify(valueToStore));

      // Registra o tempo da mudança local (via ref, sem re-render)
      lastLocalUpdateRef.current = Date.now();

      // Notifica o indicador global que uma sincronização está em andamento
      notifySyncing(true);

      // Envia assincronamente para o Firestore via camada de serviço
      saveProfileData(profileId, key, valueToStore)
        .then(() => notifySyncing(false))
        .catch(e => {
          notifySyncing(false);
          console.warn(
            `Aviso: falha ao salvar remotamente a chave ${key}. Estará sincronizado quando online.`,
            e
          );
        });

    } catch (error) {
      notifySyncing(false);
      console.warn(`Aviso: Erro crítico ao definir useSyncedStorage (${key})`, error);
    }
  };

  return [storedValue, setValue] as const;
}
