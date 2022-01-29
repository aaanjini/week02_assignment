// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAhvHe_gPU9GyVozWpjp5q13UJr7ppbXEk",
  authDomain: "week02-assignment.firebaseapp.com",
  projectId: "week02-assignment",
  storageBucket: "week02-assignment.appspot.com",
  messagingSenderId: "14807738251",
  appId: "1:14807738251:web:7a7b0b2416c62f1a5b318e",
  measurementId: "G-12NLFDHMFG"
};


// Initialize Firebase
initializeApp(firebaseConfig);
const db = getFirestore();

export { db };