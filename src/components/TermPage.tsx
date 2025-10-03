// src/components/TermPage.tsx
import { useState } from "react";
import TermSelector from "./TermSelector";
import CourseList from "./CourseList";
import type { Course } from "./CourseCard";

type Props = { courses: Record<string, Course> };
type Term = "Fall" | "Winter" | "Spring";

const toggleList = (id: string, lst: string[]) =>
  lst.includes(id) ? lst.filter(x => x !== id) : [...lst, id];

export default function TermPage({ courses }: Props) {
  const [term, setTerm] = useState<Term>("Fall");
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const toggleSelected = (id: string) => {
    setSelectedIds(prev => toggleList(id, prev));
  };

  return (
    <>
      <TermSelector selected={term} setSelected={setTerm} />
      <CourseList
        courses={courses}
        term={term}
        selectedIds={selectedIds}
        toggleSelected={toggleSelected}
      />
    </>
  );
}
