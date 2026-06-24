import { useState, useEffect } from 'react';
import { enableNetwork, disableNetwork } from 'firebase/firestore';
import { db } from '../firebase/config';

export type SyncStatus = 'synced' | 'syncing' | 'offline';

/**
 * Hook que observa o status de conectividade do Firestore.
 * Usa o evento online/offline do navegador + um flag interno de operação ativa.
 */
export function useFirestoreStatus(): SyncStatus {
  const [status, setStatus] = useState<SyncStatus>(navigator.onLine ? 'synced' : 'offline');

  useEffect(() => {
    const handleOnline = () => {
      setStatus('syncing');
      // Reativa a rede do Firestore ao voltar online
      enableNetwork(db)
        .then(() => setStatus('synced'))
        .catch(() => setStatus('offline'));
    };

    const handleOffline = () => {
      setStatus('offline');
      // Desativa a rede do Firestore para evitar timeouts desnecessários
      disableNetwork(db).catch(() => {});
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return status;
}

/**
 * Sinaliza que uma operação de escrita está em andamento.
 * Exporta uma função utilitária para o useSyncedStorage notificar o status.
 */
let _setSyncingCallbacks: Array<(syncing: boolean) => void> = [];

export function registerSyncingCallback(cb: (syncing: boolean) => void) {
  _setSyncingCallbacks.push(cb);
  return () => {
    _setSyncingCallbacks = _setSyncingCallbacks.filter(f => f !== cb);
  };
}

export function notifySyncing(syncing: boolean) {
  _setSyncingCallbacks.forEach(cb => cb(syncing));
}
