// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-blog-87682.firebaseapp.com",
  projectId: "mern-blog-87682",
  storageBucket: "mern-blog-87682.firebasestorage.app",
  messagingSenderId: "858112770203",
  appId: "1:858112770203:web:18511ca3213fc5072bc63e"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

