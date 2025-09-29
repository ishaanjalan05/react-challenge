import { useEffect, useState } from "react";

export function useJsonQuery<T>(url: string): [T | undefined, boolean, Error | null] {
  const [data, setData] = useState<T>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let alive = true;

    (async () => {
      setLoading(true);
      setError(null);
      try {
        const r = await fetch(url);
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        const json = (await r.json()) as T;
        if (alive) setData(json);
      } catch (e) {
        if (alive) setError(e as Error);
      } finally {
        if (alive) setLoading(false);
      }
    })();

    return () => { alive = false; };
  }, [url]);

  return [data, loading, error];
}
