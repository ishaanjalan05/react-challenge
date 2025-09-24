type Course = { term: string; number: string; meets: string; title: string };
type CourseProps = {id: string; course: Course };

const CourseCard = ({ course }: CourseProps) => (
   <div className="flex h-full flex-col rounded-xl border shadow-sm">
      <div className="px-6 pt-6 text-xl font-semibold">
        {course.term} CS {course.number}
      </div>

      <div className="px-6 mt-2 flex-1 whitespace-pre-line">
        {course.title}
      </div>

      <hr className="my-3" />

      <div className="px-6 pb-6 text-sm">
        {course.meets}
      </div>
    </div>
);

export default CourseCard;
export type { Course };
