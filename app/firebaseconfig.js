// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from "firebase/firestore";
//import { ReactNativeAsyncStorage } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: process.env.FIREBASE_KEY,
  authDomain: "orbital-16abe.firebaseapp.com",
  projectId: "orbital-16abe",
  storageBucket: "orbital-16abe.appspot.com",
  messagingSenderId: "330002817844",
  appId: "1:330002817844:web:dadd5b752a5b608b75bb61",
  measurementId: "G-2FBFYJ8R1J"
};

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);
export const auth = getAuth(firebaseApp);
export const firestoredb = getFirestore(firebaseApp);