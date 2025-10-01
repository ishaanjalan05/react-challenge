import { useState } from "react";
import CourseList from "./CourseList";
import type { Course } from "./CourseCard";
import TermSelector from "./TermSelector";

type Props = { courses: Record<string, Course> };

export default function TermPage({ courses }: Props) {
  const [term, setTerm] = useState<"Fall" | "Winter" | "Spring"> ("Fall");

  return (
    <>
      <TermSelector selected={term} setSelected={setTerm} />
      <CourseList courses={courses} term={term} />
    </>
  );
}
