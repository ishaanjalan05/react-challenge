// src/components/CourseCard.tsx
export type Course = { term: string; number: string; meets: string; title: string };

type Props = {
  id: string;
  course: Course;
  selected: boolean;
  onToggle: (id: string) => void;
};

export default function CourseCard({ id, course, selected, onToggle }: Props) {
  return (
    <button
      type="button"
      onClick={() => onToggle(id)}
      className={
        "flex h-full w-full flex-col rounded-xl border p-6 text-left shadow-sm transition " +
        (selected ? "ring-2 ring-blue-500 bg-blue-50" : "hover:bg-gray-50")
      }
      aria-pressed={selected}
    >
      <div className="w-full text-xl font-semibold">
        {course.term} CS {course.number}
      </div>

      <div className="mt-2 flex-1 w-full whitespace-pre-line">
        {course.title}
      </div>

      <hr className="my-3 -mx-6 w-auto border-t" />

      <div className="w-full text-sm">{course.meets}</div>
    </button>
  );
}
