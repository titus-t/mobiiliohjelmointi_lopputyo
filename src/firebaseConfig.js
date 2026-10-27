import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCuyFfBCe3TZFa-FDWI38Un8heLWryS9Qc",
  authDomain: "fitt-3fb3d.firebaseapp.com",
  projectId: "fitt-3fb3d",
  storageBucket: "fitt-3fb3d.firebasestorage.app",
  messagingSenderId: "407408846490",
  appId: "1:407408846490:web:df561fe6a8bd20eb126123",
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
