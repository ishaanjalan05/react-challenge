// src/components/CourseCard.tsx
export type Course = { term: string; number: string; meets: string; title: string };

type Props = {
  id: string;
  course: Course;
  selected: boolean;
  disabled: boolean;
  onToggle: (id: string) => void;
  onEdit: (id: string) => void;
  canEdit?: boolean; // NEW
};

export default function CourseCard({ id, course, selected, disabled, onToggle, onEdit, canEdit }: Props) {
  const canToggle = selected || !disabled;

  return (
    <div className="relative">
      {canEdit && ( // ← only show to signed-in users
        <button
          type="button"
          onClick={(e) => { e.stopPropagation(); onEdit(id); }}
          className="absolute right-2 top-2 rounded-md border bg-white/90 px-2 py-0.5 text-xs"
          aria-label="Edit course"
        >
          Edit
        </button>
      )}

      <button
        type="button"
        onClick={() => canToggle && onToggle(id)}
        aria-pressed={selected}
        aria-disabled={!canToggle}
        className={
          "flex h-full w-full flex-col rounded-xl border p-6 text-left shadow-sm transition " +
          (selected ? "ring-2 ring-blue-500 bg-blue-50 " : "hover:bg-gray-50 ") +
          (!canToggle ? "opacity-50 cursor-not-allowed " : "")
        }
      >
        <div className="w-full text-xl font-semibold">
          {course.term} CS {course.number}
          {!canToggle && !selected && <span className="ml-2 text-xs text-red-600">× conflict</span>}
        </div>

        <div className="mt-2 flex-1 w-full whitespace-pre-line">{course.title}</div>
        <hr className="my-3 -mx-6 w-auto border-t" />
        <div className="w-full text-sm">{course.meets}</div>
      </button>
    </div>
  );
}
