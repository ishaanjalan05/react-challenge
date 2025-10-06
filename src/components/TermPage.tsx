import { useState } from "react";
import TermSelector from "./TermSelector";
import CourseList from "./CourseList";
import CoursePlanModal from "./CoursePlanModal";
import type { Course } from "./CourseCard";

type Props = { courses: Record<string, Course> };
type Term = "Fall" | "Winter" | "Spring";

const toggleList = (id: string, lst: string[]) =>
  lst.includes(id) ? lst.filter((x) => x !== id) : [...lst, id];

export default function TermPage({ courses }: Props) {
  const [term, setTerm] = useState<Term>("Fall");
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [open, setOpen] = useState(false);

  const toggleSelected = (id: string) => setSelectedIds((prev) => toggleList(id, prev));

  return (
    <>
      {/* top bar: selector left, plan button right */}
      <div className="mx-4 my-4 flex items-center justify-between">
        <TermSelector selected={term} setSelected={setTerm} />
        <button
          type="button"
          className="rounded-md border px-3 py-1"
          onClick={() => setOpen(true)}
        >
          Course plan
        </button>
      </div>

      <CourseList
        courses={courses}
        term={term}
        selectedIds={selectedIds}
        toggleSelected={toggleSelected}
      />

      <CoursePlanModal
        isOpen={open}
        onClose={() => setOpen(false)}
        courses={courses}
        selectedIds={selectedIds}
      />
    </>
  );
}
