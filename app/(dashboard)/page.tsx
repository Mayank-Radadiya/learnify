import CourseList from "@/components/global/CourseList";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function PurchasedCourses() {
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }
  
  const purchasedCourses = await db.course.findMany({
    where: {
      purchases: {
        some: {
          userId,
        },
      },
      isPublished: true,
    },
    include: {
      category: true,
      chapters: {
        where: {
          isPublished: true,
        },
        select: {
          id: true,
        },
      },
      purchases: {
        where: {
          userId,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  // Calculate progress for each purchased course
  const purchasedCoursesWithProgress = await Promise.all(
    purchasedCourses.map(async (course) => {
      const progressCount = await db.userProgress.count({
        where: {
          userId,
          chapter: {
            courseId: course.id,
          },
          isCompleted: true,
        },
      });

      const totalChapters = course.chapters.length;
      const progress =
        totalChapters > 0 ? (progressCount / totalChapters) * 100 : 0;

      return {
        ...course,
        progress,
      };
    })
  );

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Your Purchased Courses</h1>
      {purchasedCoursesWithProgress.length === 0 ? (
        <div className="text-center p-6 bg-slate-100 rounded-lg">
          <p>You haven't purchased any courses yet.</p>
        </div>
      ) : (
        <CourseList items={purchasedCoursesWithProgress} />
      )}
    </div>
  );
}
