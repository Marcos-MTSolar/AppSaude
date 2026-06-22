import { initializeApp } from 'firebase/app';
import { getFirestore, enableIndexedDbPersistence } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCjn9j6xHzmObqDKnJijDmPhotlBzKpBks",
  authDomain: "appsaude-7ceb3.firebaseapp.com",
  projectId: "appsaude-7ceb3",
  storageBucket: "appsaude-7ceb3.firebasestorage.app",
  messagingSenderId: "985999858985",
  appId: "1:985999858985:web:c85967f062025ba6456b38"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

// Habilita persistência offline (cache via IndexedDB)
enableIndexedDbPersistence(db).catch((err) => {
  if (err.code == 'failed-precondition') {
    console.warn('Firebase persistência falhou: múltiplas abas abertas.');
  } else if (err.code == 'unimplemented') {
    console.warn('Firebase persistência falhou: navegador não suportado.');
  }
});
