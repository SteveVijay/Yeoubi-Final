import { initializeApp, getApps, getApp, type FirebaseApp } from "firebase/app";
import { getFirestore, collection, addDoc, serverTimestamp, type Firestore } from "firebase/firestore";
import { DROP_LIST_KEY } from "@/config/site";
import { safeStorage } from "@/lib/safe-storage";

/**
 * Firebase Configuration
 * Read credentials from Vite environment variables (VITE_FIREBASE_*)
 * with fallback initialization for local/dev environment.
 */
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyYEOUBI_DEMO_API_KEY",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "yeoubi-showcase.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "yeoubi-showcase",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "yeoubi-showcase.appspot.com",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "123456789012",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:123456789012:web:abc123def456",
};

// Initialize Firebase App singleton
let app: FirebaseApp;
let db: Firestore | null = null;

try {
  app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
  db = getFirestore(app);
} catch (error) {
  console.warn("Firebase initialization warning (using local fallback mode):", error);
}

export { app, db };

/**
 * Subscribes a user's email to the Yeoubi Drop List.
 * Saves to Firebase Cloud Firestore ('droplist' collection) and syncs to localStorage.
 */
export async function subscribeToDropList(email: string): Promise<{ success: boolean; mode: "firebase" | "local" }> {
  const trimmed = email.trim().toLowerCase();
  if (!trimmed || !trimmed.includes("@")) {
    throw new Error("Invalid email address.");
  }

  // 1. Sync to localStorage
  const existing = safeStorage.getJSON<string[]>(DROP_LIST_KEY, []);
  if (!existing.includes(trimmed)) {
    existing.push(trimmed);
    safeStorage.setJSON(DROP_LIST_KEY, existing);
  }

  // 2. Sync to Firebase Firestore if initialized
  if (db) {
    try {
      await addDoc(collection(db, "droplist"), {
        email: trimmed,
        createdAt: serverTimestamp(),
        source: "web_droplist",
      });
      return { success: true, mode: "firebase" };
    } catch (err) {
      console.warn("Could not save to Firebase Firestore, saved locally:", err);
    }
  }

  return { success: true, mode: "local" };
}
