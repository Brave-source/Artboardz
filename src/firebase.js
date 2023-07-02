import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage"

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_KEY,
  authDomain: "cardano-d265c.firebaseapp.com",
  projectId: "cardano-d265c",
  storageBucket: "cardano-d265c.appspot.com",
  messagingSenderId: "432857824833",
  appId: "1:432857824833:web:68bedefcd8cc5f5eb450c0",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;