import Modal from "./Modal";
import type { Course } from "./CourseCard";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  courses: Record<string, Course>;
  selectedIds: string[];
};

export default function CoursePlanModal({ isOpen, onClose, courses, selectedIds }: Props) {
  const selected = selectedIds
    .map((id) => ({ id, c: courses[id] }))
    .filter((x) => x.c);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h2 className="mb-3 text-lg font-semibold">Your course plan</h2>

      {selected.length === 0 ? (
        <div className="text-sm">
          <p>No courses selected.</p>
          <p className="mt-2">Click any course card to add it to your plan. Click again to remove.</p>
        </div>
      ) : (
        <ul className="list-disc pl-5">
          {selected.map(({ id, c }) => (
            <li key={id} className="mb-2">
              <div className="font-medium">
                {c.term} CS {c.number}
              </div>
              <div>{c.title}</div>
              <div className="text-sm text-gray-600">{c.meets}</div>
            </li>
          ))}
        </ul>
      )}

      <div className="mt-4">
        <button
          type="button"
          className="rounded-md border px-3 py-1"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </Modal>
  );
}
