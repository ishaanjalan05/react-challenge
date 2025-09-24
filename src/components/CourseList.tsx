
import CourseCard, { type Course } from "./CourseCard";

type Props = { courses: Record<string, Course> };

const CourseList = ({ courses }: Props) => (
    <div className="grid w-full grid-cols-[repeat(auto-fit,minmax(260px,1fr))] gap-6 px-4">
      {Object.entries(courses).map(([id, c]) => (
        <CourseCard key={id} id={id} course={c} />
      ))}
    </div>
);

export default CourseList;