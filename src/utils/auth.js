// src/utils/auth.js
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "../firebase";

// Sign Up Function
export async function signUp(email, password) {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    return userCredential; // Return the full UserCredential object
  } catch (error) {
    console.error("Error signing up:", error.message);
    throw error;
  }
}

// Login Function
export async function logIn(email, password) {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential; // Return the full UserCredential object
  } catch (error) {
    console.error("Error logging in:", error.message);
    throw error;
  }
}

// Logout Function
export async function logOut() {
  try {
    await signOut(auth);
  } catch (error) {
    console.error("Error logging out:", error.message);
  }
}
