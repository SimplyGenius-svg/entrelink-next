import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"; 
import { getFirestore, collection, doc, setDoc, addDoc, serverTimestamp } from "firebase/firestore"; 

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB5Isf96YUgNgEzmGXBHxTAFDHP22DWDFk",
  authDomain: "entrelink-v3.firebaseapp.com",
  projectId: "entrelink-v3",
  storageBucket: "entrelink-v3.appspot.com",
  messagingSenderId: "618077790579",
  appId: "1:618077790579:web:323c9baa618eca48946506",
  measurementId: "G-NRN56Q7RHM",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);

// Initialize Authentication
export const auth = getAuth(app);

// Export Firestore functions
export { db, collection, addDoc, serverTimestamp, doc, setDoc };
