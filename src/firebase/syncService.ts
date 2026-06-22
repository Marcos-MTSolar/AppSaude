import { doc, setDoc, getDoc } from 'firebase/firestore';
import { db } from './config';

export async function saveProfileData(profileId: string, key: string, data: any) {
  try {
    const docRef = doc(db, 'usuarios', profileId, 'dados', key);
    await setDoc(docRef, { data, updatedAt: new Date().toISOString() });
  } catch (error) {
    console.error(`Erro ao salvar dados (${key}) no Firebase:`, error);
  }
}

export async function loadProfileData(profileId: string, key: string) {
  try {
    const docRef = doc(db, 'usuarios', profileId, 'dados', key);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return docSnap.data().data;
    } else {
      return null;
    }
  } catch (error) {
    console.error(`Erro ao carregar dados (${key}) do Firebase:`, error);
    return null;
  }
}
