// src/App.tsx
import { useEffect, useState } from "react";
import Banner from "./components/Banner";
import TermPage from "./components/TermPage";
import type { Course } from "./components/CourseCard";

type Schedule = { title: string; courses: Record<string, Course> };

const DATA_URL =
  "https://courses.cs.northwestern.edu/394/guides/data/cs-courses.php";

const app = () => {
  const [schedule, setSchedule] = useState<Schedule | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const r = await fetch(DATA_URL);
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        const json: Schedule = await r.json();
        if (alive) setSchedule(json);
      } catch (e) {
        if (alive) setError((e as Error).message);
      }
    })();
    return () => { alive = false; };
  }, []);

  if (error) return <p className="p-6">Error: {error}</p>;
  if (!schedule) return <p className="p-6">Loading…</p>;

  return (
    <main className="w-full">
      <Banner title={schedule.title} />
      <TermPage courses={schedule.courses} />
    </main>
  );
};

export default app;
