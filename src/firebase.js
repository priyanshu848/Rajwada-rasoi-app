// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDPZYpIIIWfAjuv56tVoe_5-SxdejEw3NM",
  authDomain: "rajwadarasoi-87ce1.firebaseapp.com",
  databaseURL: "https://rajwadarasoi-87ce1-default-rtdb.firebaseio.com",
  projectId: "rajwadarasoi-87ce1",
  storageBucket: "rajwadarasoi-87ce1.appspot.com",
  messagingSenderId: "764442934463",
  appId: "1:764442934463:web:a2ef623e84d7fd9b181a0a",
  measurementId: "G-CR9349R8D6",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore();

export { db, app };
