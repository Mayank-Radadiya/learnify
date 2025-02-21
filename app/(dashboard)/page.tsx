import { db } from "@/lib/db";
import Link from "next/link";

export default async function Home() {
  const course = await db.course.findMany();

  return (
    <>
      {course.map((course) => (
        <Link
          key={course.id}
          href={`/teacher/course/${course.id}`}
          className="cursor-pointer border bg-sky-200 p-4 rounded-md flex flex-col"
        >
          <h1>{course.title}</h1>
        </Link>
      ))}
    </>
  );
}
