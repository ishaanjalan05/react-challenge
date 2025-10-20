// src/components/CourseList.tsx
import { useState } from "react";
import CourseCard, { type Course } from "./CourseCard";
import { conflictsWithAny } from "../utilities/conflicts";
import Modal from "./Modal";
import CourseForm from "./CourseForm";
import { useIsAdmin } from "../utilities/profile"; // ← change

type Term = "Fall" | "Winter" | "Spring";

type Props = {
  courses: Record<string, Course>;
  term: Term;
  selectedIds: string[];
  toggleSelected: (id: string) => void;
};

export default function CourseList({ courses, term, selectedIds, toggleSelected }: Props) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const { isAdmin } = useIsAdmin(); // ← admin only

  const entries = Object.entries(courses).filter(([, c]) => c.term === term);
  const closeForm = () => setEditingId(null);
  const editingCourse = editingId ? courses[editingId] : null;

  return (
    <>
      <div className="grid w-full grid-cols-[repeat(auto-fit,minmax(260px,1fr))] gap-6 px-4">
        {entries.map(([id, c]) => {
          const selected = selectedIds.includes(id);
          const disabled = !selected && conflictsWithAny(id, selectedIds, courses);

          return (
            <CourseCard
              key={id}
              id={id}
              course={c}
              selected={selected}
              disabled={disabled}
              onToggle={toggleSelected}
              onEdit={setEditingId}
              canEdit={isAdmin} // ← only admins see the button
            />
          );
        })}
      </div>

      <Modal isOpen={!!editingId} onClose={closeForm}>
        {editingCourse && (
          <CourseForm
            id={editingId!}
            initial={{
              title: editingCourse.title,
              term: editingCourse.term as "Fall" | "Winter" | "Spring" | "Summer",
              number: editingCourse.number,
              meets: editingCourse.meets,
            }}
            onCancel={closeForm}
            onSaved={closeForm}
          />
        )}
      </Modal>
    </>
  );
}
