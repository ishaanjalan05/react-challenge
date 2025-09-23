type Course = { term: string; number: string; meets: string; title: string };
type CourseProps = { courses: Record<string, Course> };

const CourseList = ({ courses }: CourseProps) =>(
    <ul>
      {Object.entries(courses).map(([id, c]) => (
        <li key={id}>
          {c.term} CS {c.number}: {c.title}
        </li>
      ))}
    </ul>
);

export default CourseList;

