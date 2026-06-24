import { useState, useEffect, useRef } from 'react';
import { doc, onSnapshot, getDoc } from 'firebase/firestore';
import { Capacitor } from '@capacitor/core';
import { db } from '../firebase/config';
import { saveProfileData } from '../firebase/syncService';
import { notifySyncing } from './useFirestoreStatus';

/**
 * Hook idêntico ao useLocalStorage, mas que adiciona sincronização bidirecional com o Firestore.
 *
 * Funciona offline-first: a interface usa localStorage para velocidade e tolerância a falhas,
 * e a sincronização ocorre em background via onSnapshot e persistência nativa do Firestore.
 *
 * Correções v3:
 * - Correção 2: Remove prefixo duplicado do profileId no caminho do Firestore.
 *   O localStorage mantém a chave completa (ex: "marcos_weights") para retrocompatibilidade,
 *   mas o Firestore usa apenas a parte sem o prefixo (ex: "weights") no caminho
 *   usuarios/{profileId}/dados/{firestoreKey}.
 * - Correção 3: onSnapshot com erro agora chama notifySyncing(false) para refletir
 *   o estado "offline" no indicador visual do Dashboard.
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

  // Correção 2: Remove prefixo duplicado para o caminho do Firestore.
  // Ex: "marcos_weights" → chave LS intacta, Firestore usa "weights" em usuarios/marcos/dados/weights
  const firestoreKey = key.startsWith(`${profileId}_`)
    ? key.slice(profileId.length + 1)
    : key;

  // 2. Listener do Firestore para receber mudanças de outro dispositivo
  useEffect(() => {
    if (!profileId || !key) return;

    const docRef = doc(db, 'usuarios', profileId, 'dados', firestoreKey);

    // Função compartilhada de aplicar dado remoto
    const applyRemote = (remoteData: any) => {
      if (!remoteData) return;
      const remoteValue = remoteData.data;
      const remoteTimestamp = remoteData.updatedAt
        ? new Date(remoteData.updatedAt).getTime()
        : 0;

      if (remoteTimestamp <= lastLocalUpdateRef.current + 2000) return;

      try {
        const remoteStr = JSON.stringify(remoteValue);
        const localStr = window.localStorage.getItem(key);
        if (remoteStr !== localStr) {
          setStoredValue(remoteValue);
          window.localStorage.setItem(key, remoteStr);
        }
      } catch (e) {
        console.warn('Erro ao aplicar dado remoto:', e);
      }
    };

    // No ambiente nativo (APK), usa polling pois o WebView
    // pode bloquear o canal gRPC do onSnapshot
    if (Capacitor.isNativePlatform()) {
      const poll = async () => {
        try {
          const snap = await getDoc(docRef);
          if (snap.exists()) applyRemote(snap.data());
        } catch (e) {
          console.warn(`[Polling] Erro ao buscar ${key}:`, e);
        }
      };

      poll(); // busca imediata ao montar
      const interval = setInterval(poll, 10000); // a cada 10s
      return () => clearInterval(interval);
    }

    // Na web, usa onSnapshot para tempo real
    const unsubscribe = onSnapshot(
      docRef,
      { includeMetadataChanges: false },
      (docSnap) => {
        if (docSnap.exists()) applyRemote(docSnap.data());
      },
      (error) => {
        notifySyncing(false);
        console.warn(`[onSnapshot] Erro na chave ${key}:`, error.message);
      }
    );

    // Cleanup garantido: cancela o listener ao desmontar ou antes de recriar
    return () => unsubscribe();
  }, [profileId, key, firestoreKey]); // firestoreKey é derivado de key/profileId, sem loops

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

      // Correção 2: Salva no Firestore usando a chave sem prefixo duplicado
      saveProfileData(profileId, firestoreKey, valueToStore)
        .then(() => notifySyncing(false))
        .catch(e => {
          notifySyncing(false);
          console.warn(
            `Aviso: falha ao salvar remotamente a chave ${firestoreKey}. Estará sincronizado quando online.`,
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
