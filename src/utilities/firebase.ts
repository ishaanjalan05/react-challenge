import { initializeApp } from "firebase/app";
import { getDatabase, onValue, ref } from "firebase/database";
import { useEffect, useState } from "react";

// 1) Paste your project's Web App config from Firebase console:
//    Firebase console → Project Settings → General → Your Apps → Web App → "Config"
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

// 2) Singletons
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// 3) Typed data hook (subscribes and live-updates)
export function useDataQuery<T>(path: string): [T | undefined, boolean, Error | undefined] {
  const [data, setData] = useState<T>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error>();

  useEffect(() => {
    setLoading(true);
    setError(undefined);
    setData(undefined);
    // Firebase calls this immediately and on every change
    return onValue(
      ref(db, path),
      (snap) => {
        setData(snap.val() as T);
        setLoading(false);
      },
      (err) => {
        setError(err as Error);
        setLoading(false);
      }
    );
  }, [path]);

  return [data, loading, error];
}
