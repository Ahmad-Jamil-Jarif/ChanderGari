import { initializeApp, getApps, getApp } from "firebase/app";
import { 
  getAuth, 
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
  signOut as firebaseSignOut, 
  signInAnonymously,
  onAuthStateChanged,
  User 
} from "firebase/auth";
import { 
  getFirestore, 
  collection, 
  addDoc, 
  getDocs, 
  deleteDoc,
  doc,
  query, 
  where 
} from "firebase/firestore";
import { BookingRecord } from "./types";

// Firebase config is injected via Vite env vars (see .env.example).
// Never commit real keys — GitHub secret scanning flags hardcoded AIza... keys.
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY as string,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN as string,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID as string,
  appId: import.meta.env.VITE_FIREBASE_APP_ID as string,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET as string,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID as string,
};

if (!firebaseConfig.apiKey) {
  console.warn(
    "Missing VITE_FIREBASE_API_KEY. Copy .env.example to .env and fill in your Firebase web config."
  );
}

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
export const auth = getAuth(app);

// Initialize Firestore specifying databaseId if provided (defaults to "(default)")
const dbId =
  (import.meta.env.VITE_FIRESTORE_DATABASE_ID as string) || "(default)";
export const db = getFirestore(app, dbId);

export async function registerWithEmail(email: string, pass: string, name: string) {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, pass);
    if (name && userCredential.user) {
      await updateProfile(userCredential.user, { displayName: name });
    }
    return userCredential.user;
  } catch (error) {
    console.error("Email registration error:", error);
    throw error;
  }
}

export async function loginWithEmail(email: string, pass: string) {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, pass);
    return userCredential.user;
  } catch (error) {
    console.error("Email login error:", error);
    throw error;
  }
}

export async function signInAsGuest() {
  try {
    const result = await signInAnonymously(auth);
    return result.user;
  } catch (error: any) {
    console.warn("Guest sign in error (falling back to guest session):", error);
    const guestUser = {
      uid: "traveler_" + Date.now().toString(36),
      email: null,
      displayName: "Chandergari Traveler",
      photoURL: null,
      isAnonymous: true,
    };
    sessionStorage.setItem("chandergari_user_session", JSON.stringify(guestUser));
    return guestUser as unknown as User;
  }
}

export async function signOut() {
  sessionStorage.removeItem("chandergari_user_session");
  try {
    return await firebaseSignOut(auth);
  } catch (e) {
    console.warn("Firebase sign out note:", e);
  }
}

// Persistent Storage Helpers (Offline localStorage + Firestore cloud sync)
const LOCAL_BOOKINGS_KEY = "chandergari_local_bookings";

export async function saveBooking(booking: Omit<BookingRecord, "id">): Promise<BookingRecord> {
  const generatedId = "cg_" + Date.now() + "_" + Math.random().toString(36).substring(2, 7);
  const newBooking: BookingRecord = {
    ...booking,
    id: generatedId,
    bookedAt: booking.bookedAt || new Date().toISOString()
  };

  // 1. Always save locally to localStorage for instant offline persistence
  try {
    const existingLocalRaw = localStorage.getItem(LOCAL_BOOKINGS_KEY);
    const existingLocal: BookingRecord[] = existingLocalRaw ? JSON.parse(existingLocalRaw) : [];
    existingLocal.unshift(newBooking);
    localStorage.setItem(LOCAL_BOOKINGS_KEY, JSON.stringify(existingLocal));
  } catch (err) {
    console.warn("LocalStorage save warning:", err);
  }

  // 2. Sync to Firestore if authenticated
  if (auth.currentUser && !auth.currentUser.isAnonymous) {
    try {
      const docRef = await addDoc(collection(db, "bookings"), newBooking);
      newBooking.id = docRef.id;
    } catch (err) {
      console.warn("Firestore sync warning (booking saved locally):", err);
    }
  }

  return newBooking;
}

export async function getUserBookings(userId: string): Promise<BookingRecord[]> {
  let localBookings: BookingRecord[] = [];
  try {
    const existingLocalRaw = localStorage.getItem(LOCAL_BOOKINGS_KEY);
    if (existingLocalRaw) {
      localBookings = JSON.parse(existingLocalRaw);
    }
  } catch (err) {
    console.warn("LocalStorage fetch warning:", err);
  }

  if (auth.currentUser && !auth.currentUser.isAnonymous) {
    try {
      const q = query(
        collection(db, "bookings"),
        where("userId", "==", userId)
      );
      const snapshot = await getDocs(q);
      const remoteBookings = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as BookingRecord));
      
      // Combine remote and local, avoiding duplicates by id or bookedAt
      const combined = [...remoteBookings];
      for (const loc of localBookings) {
        if (!combined.some(r => (r.id && r.id === loc.id) || r.bookedAt === loc.bookedAt)) {
          combined.push(loc);
        }
      }
      return combined.sort((a, b) => new Date(b.bookedAt).getTime() - new Date(a.bookedAt).getTime());
    } catch (err) {
      console.warn("Firestore fetch warning, falling back to local storage:", err);
    }
  }

  return localBookings
    .filter(b => b.userId === userId || !userId || userId.startsWith("traveler_"))
    .sort((a, b) => new Date(b.bookedAt).getTime() - new Date(a.bookedAt).getTime());
}

export async function deleteBooking(bookingId: string): Promise<void> {
  // 1. Remove from local storage
  const existingLocalRaw = localStorage.getItem(LOCAL_BOOKINGS_KEY);
  if (existingLocalRaw) {
    const existingLocal: BookingRecord[] = JSON.parse(existingLocalRaw);
    const updated = existingLocal.filter(b => b.id !== bookingId && b.bookedAt !== bookingId);
    localStorage.setItem(LOCAL_BOOKINGS_KEY, JSON.stringify(updated));
  }

  // 2. Remove from Firestore if authenticated and id exists
  if (auth.currentUser && !auth.currentUser.isAnonymous && bookingId) {
    try {
      await deleteDoc(doc(db, "bookings", bookingId));
    } catch (err) {
      console.warn("Firestore delete warning:", err);
    }
  }
}
