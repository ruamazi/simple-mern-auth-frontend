import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-auth-with--acc.firebaseapp.com",
  projectId: "mern-auth-with--acc",
  storageBucket: "mern-auth-with--acc.appspot.com",
  messagingSenderId: "795627297659",
  appId: "1:795627297659:web:a15cfe5d9ec50214fe7bde",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
