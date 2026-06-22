import { useState, useEffect } from 'react';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase/config';
import { saveProfileData } from '../firebase/syncService';

/**
 * Hook idêntico ao useLocalStorage, mas que adiciona sincronização bidirecional com o Firestore.
 * Funciona offline-first: a interface usa localStorage para velocidade e tolerância a falhas,
 * e a sincronização ocorre em background via onSnapshot e persistência nativa do Firestore.
 */
export function useSyncedStorage<T>(key: string, initialValue: T, profileId: string) {
  // O uso original do app costuma ser useLocalStorage(`${profile}_water_goal`, 2500)
  // Para manter a API, injetaremos o profileId também (isso pode ser refatorado futuramente se a key já tiver o profile)
  
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

  // Track the timestamp of the last local update to prevent echo loops
  const [lastLocalUpdate, setLastLocalUpdate] = useState<number>(0);

  // 2. Listener do Firestore para receber mudanças de outro dispositivo
  useEffect(() => {
    if (!profileId || !key) return;

    // A estrutura adotada no syncService: usuarios/{profileId}/dados/{key}
    const docRef = doc(db, 'usuarios', profileId, 'dados', key);
    
    const unsubscribe = onSnapshot(docRef, (docSnap) => {
      if (docSnap.exists()) {
        const remoteData = docSnap.data();
        const remoteValue = remoteData.data;
        const remoteTimestamp = remoteData.updatedAt ? new Date(remoteData.updatedAt).getTime() : 0;
        
        // Evita loop infinito caso a mudança no snapshot seja eco do que acabamos de salvar.
        // Damos uma janela de segurança (ex: 2 segundos).
        if (remoteTimestamp > lastLocalUpdate + 2000) {
          try {
            // Verifica se houve mudança real
            const remoteStr = JSON.stringify(remoteValue);
            const localStr = window.localStorage.getItem(key);
            
            if (remoteStr !== localStr) {
              setStoredValue(remoteValue);
              window.localStorage.setItem(key, remoteStr);
            }
          } catch (e) {
            console.warn("Aviso: erro ao processar atualização remota via Firestore", e);
          }
        }
      }
    }, (error) => {
      // Se não houver internet ou permissão, apenas avisa. O app não vai quebrar, continuará usando localStorage.
      console.warn(`Aviso no onSnapshot para a chave ${key} (offline ou sem acesso?):`, error.message);
    });

    return () => unsubscribe();
  }, [profileId, key, lastLocalUpdate]);

  // 3. Função para salvar mudanças
  const setValue = (value: T | ((val: T) => T)) => {
    try {
      // Permite o uso de callbacks na função de set
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      
      // Atualiza o estado do React imediatamente (síncrono)
      setStoredValue(valueToStore);
      
      // Atualiza o localStorage imediatamente (síncrono, offline funciona 100%)
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
      
      // Registra o tempo da mudança local para ignorar o próximo onSnapshot correspondente
      setLastLocalUpdate(Date.now());
      
      // Envia assincronamente para o Firestore via camada de serviço (não bloqueia a interface)
      saveProfileData(profileId, key, valueToStore).catch(e => {
         // O erro aqui pode ser offline (o próprio SDK lida) ou permissão negada. A interface já atualizou.
         console.warn(`Aviso: falha ao salvar remotamente a chave ${key}. Estará sincronizado quando online.`, e);
      });
      
    } catch (error) {
      console.warn(`Aviso: Erro crítico ao definir useSyncedStorage (${key})`, error);
    }
  };

  return [storedValue, setValue] as const;
}
