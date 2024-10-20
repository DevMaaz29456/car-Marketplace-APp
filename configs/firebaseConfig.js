// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "car-marketplace-cd714.firebaseapp.com",
  projectId: "car-marketplace-cd714",
  storageBucket: "car-marketplace-cd714.appspot.com",
  messagingSenderId: "111506459020",
  appId: "1:111506459020:web:6e74d2a19c4fd541db2ea9",
  measurementId: "G-X6R2S1ETD1",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
