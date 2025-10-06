import CourseCard, { type Course } from "./CourseCard";
import { conflictsWithAny } from "../utilities/conflicts";

type Term = "Fall" | "Winter" | "Spring";

type Props = {
  courses: Record<string, Course>;
  term: Term;
  selectedIds: string[];
  toggleSelected: (id: string) => void;
};

export default function CourseList({ courses, term, selectedIds, toggleSelected }: Props) {
  const entries = Object.entries(courses).filter(([, c]) => c.term === term);

  return (
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
          />
        );
      })}
    </div>
  );
}
