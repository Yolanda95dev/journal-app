// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore/lite'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyC9KbCqfpDXMiF-VIhuxWC-at6eRjyZkAY",
    authDomain: "react-cursos-27317.firebaseapp.com",
    projectId: "react-cursos-27317",
    storageBucket: "react-cursos-27317.firebasestorage.app",
    messagingSenderId: "249545024787",
    appId: "1:249545024787:web:4743f4a9225097a80ce6e6"
};

// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig);
export const FirebaseAuth = getAuth(FirebaseApp)
export const FirebaseDB = getFirestore(FirebaseApp) 