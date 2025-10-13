// src/App.tsx
import Banner from "./components/Banner";
import TermPage from "./components/TermPage";
import type { Course } from "./components/CourseCard";
import { useDataQuery } from "./utilities/firebase";

type Schedule = { title: string; courses: Record<string, Course> };

const app = () => {
  const [schedule, loading, error] = useDataQuery<Schedule>("/schedule"); // or "/" if you imported at root

  if (error) return <p className="p-6">Error: {error.message}</p>;
  if (loading || !schedule) return <p className="p-6">Loading…</p>;

  return (
    <main className="w-full">
      <Banner title={schedule.title} />
      <TermPage courses={schedule.courses} />
    </main>
  );
};

export default app;
