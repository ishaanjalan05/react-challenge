import { initializeApp } from "firebase/app";
import { getDatabase, onValue, ref, update } from "firebase/database";
import {
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  signOut as fbSignOut,
  type User
} from "firebase/auth";
import { useEffect, useState } from "react";

// --- your existing config (must include databaseURL) ---
const firebaseConfig = {
  apiKey: "AIzaSyBfAfY62VKNQfXGLpyzTgbz0Uhh830wmkI",
  authDomain: "react-challenge-13cdf.firebaseapp.com",
  databaseURL: "https://react-challenge-13cdf-default-rtdb.firebaseio.com",
  projectId: "react-challenge-13cdf",
  storageBucket: "react-challenge-13cdf.firebasestorage.app",
  messagingSenderId: "397792646413",
  appId: "1:397792646413:web:018dd4b60fc6a340db0c44",
  measurementId: "G-XQT8K3NKZW"
};
const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);

// ---- auth helpers ----
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export const signInWithGoogle = () => signInWithPopup(auth, provider);
export const signOut = () => fbSignOut(auth);

export type AuthState = {
  user: User | null;
  isAuthenticated: boolean;
  isInitialLoading: boolean;
};

export function useAuthState(): AuthState {
  const [user, setUser] = useState<User | null>(auth.currentUser);
  const [isInitialLoading, setInitial] = useState(true);

  useEffect(() => {
    return onAuthStateChanged(auth, u => {
      setUser(u);
      setInitial(false);
    });
  }, []);

  return { user, isAuthenticated: !!user, isInitialLoading: isInitialLoading };
}

// ---- existing live-read hook (unchanged) ----
export function useDataQuery<T>(path: string): [T | undefined, boolean, Error | undefined] {
  const [data, setData] = useState<T>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error>();

  useEffect(() => {
    setLoading(true); setError(undefined); setData(undefined);
    return onValue(
      ref(db, path),
      snap => { setData(snap.val() as T); setLoading(false); },
      err  => { setError(err as Error); setLoading(false); }
    );
  }, [path]);

  return [data, loading, error];
}

// ---- writer (unchanged) ----
export async function updateCourse(
  courseId: string,
  patch: Partial<{ title: string; term: string; number: string; meets: string }>
) {
  await update(ref(db, `/schedule/courses/${courseId}`), patch);
}
