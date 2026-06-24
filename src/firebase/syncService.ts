import { Capacitor } from '@capacitor/core';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { db } from './config';

export async function saveProfileData(profileId: string, key: string, data: any) {
  try {
    const docRef = doc(db, 'usuarios', profileId, 'dados', key);
    await setDoc(docRef, {
      data,
      updatedAt: new Date().toISOString()
    });
    console.log(`[Firebase] Salvo com sucesso: ${key}`);
  } catch (error) {
    console.error(`[Firebase] ERRO ao salvar (${key}):`, error);
    throw error; // relança para o useSyncedStorage tratar
  }
}

export async function loadProfileData(profileId: string, key: string) {
  try {
    const docRef = doc(db, 'usuarios', profileId, 'dados', key);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      console.log(`[Firebase] Carregado com sucesso: ${key}`);
      return docSnap.data().data;
    }
    return null;
  } catch (error) {
    console.error(`[Firebase] ERRO ao carregar (${key}):`, error);
    return null;
  }
}
