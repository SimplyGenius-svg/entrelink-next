// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth"; // Import getAuth for authentication

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB5Isf96YUgNgEzmGXBHxTAFDHP22DWDFk",
  authDomain: "entrelink-v3.firebaseapp.com",
  projectId: "entrelink-v3",
  storageBucket: "entrelink-v3.appspot.com", // Corrected storage bucket domain
  messagingSenderId: "618077790579",
  appId: "1:618077790579:web:323c9baa618eca48946506",
  measurementId: "G-NRN56Q7RHM",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Analytics (optional, remove if not using)
const analytics = getAnalytics(app);

// Initialize Authentication
export const auth = getAuth(app);
