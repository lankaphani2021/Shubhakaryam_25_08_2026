import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  onAuthStateChanged
} from "firebase/auth";
import { auth, isFirebaseEnabled } from "../firebase";

const appAuth = {
  signUp: async (email, password) => {
    if (!isFirebaseEnabled) return { user: { email, firstName: "Mock User" } };
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  },

  signIn: async (email, password) => {
    if (!isFirebaseEnabled) return { user: { email, firstName: "Mock User" } };
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  },

  signOut: async () => {
    if (!isFirebaseEnabled) return;
    await firebaseSignOut(auth);
  },

  getUser: async () => {
    if (!isFirebaseEnabled) return null;
    return auth.currentUser;
  },

  onAuthStateChanged: (callback) => {
    if (!isFirebaseEnabled) return () => {};
    return onAuthStateChanged(auth, callback);
  }
};

export default appAuth;
