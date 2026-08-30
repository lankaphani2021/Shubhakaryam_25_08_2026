import { initializeApp, getApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { getAnalytics } from "firebase/analytics";

// Use environment variables for the config
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
};

// Check if Firebase is actually configured
export const isFirebaseEnabled = !!import.meta.env.VITE_FIREBASE_API_KEY;

if (!isFirebaseEnabled) {
  console.warn("Firebase API Key is missing. The app will run in MOCK MODE.");
}

// Initialize Firebase only if enabled
const app = isFirebaseEnabled
  ? (getApps().length === 0 ? initializeApp(firebaseConfig) : getApp())
  : null;

const auth = app ? getAuth(app) : null;
const db = app ? getFirestore(app) : null;
const storage = app ? getStorage(app) : null;
let analytics = null;

if (app && typeof window !== "undefined") {
  try {
    analytics = getAnalytics(app);
  } catch (e) {
    console.warn("Analytics initialization failed");
  }
}

/**
 * Uploads an image to Firebase Storage and returns the download URL
 */
export const uploadImage = async (file: File, path: string): Promise<string> => {
  if (!storage) throw new Error("Firebase Storage is not enabled");
  const storageRef = ref(storage, path);
  await uploadBytes(storageRef, file);
  return getDownloadURL(storageRef);
};

export { app, auth, db, storage, analytics };
