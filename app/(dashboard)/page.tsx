import { getCourses } from "@/action/get-courses";
import CourseList from "@/components/global/CourseList";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function Home() {
  const { userId } = await auth();
  if (!userId) {
    redirect("/sign-in");
  }

  const courses = await getCourses({ userId });

  return (
    <>
      <CourseList items={courses} />
    </>
  );
}
