import { useState } from "react";
import CourseCard, { type Course } from "./CourseCard";
import { conflictsWithAny } from "../utilities/conflicts";
import Modal from "./Modal";
import CourseForm from "./CourseForm";

type Term = "Fall" | "Winter" | "Spring";

type Props = {
  courses: Record<string, Course>;
  term: Term;
  selectedIds: string[];
  toggleSelected: (id: string) => void;
};

export default function CourseList({ courses, term, selectedIds, toggleSelected }: Props) {
  const [editingId, setEditingId] = useState<string | null>(null);

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
              onEdit={setEditingId}       // pass setter directly
            />
          );
        })}
      </div>

      {/* Edit form in a modal */}
      <Modal isOpen={!!editingId} onClose={closeForm}>
        {editingCourse && (
          <CourseForm
            initialTitle={editingCourse.title}
            initialMeets={editingCourse.meets}
            onCancel={closeForm}
            // onSubmit is intentionally a no-op; provided for future use
          />
        )}
      </Modal>
    </>
  );
}
