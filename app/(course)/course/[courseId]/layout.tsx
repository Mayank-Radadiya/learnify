import { getProgress } from "@/action/get-Progress";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import CourseSidebar from "../_components/CourseSidebar";
import { auth } from "@clerk/nextjs/server";
import { SidebarProvider } from "@/components/ui/sidebar";
import CourseNavbar from "../_components/CourseNavbar";

interface layoutProps {
  children: React.ReactNode;
  params: {
    courseId: string;
  };
}

const CourseLayout = async ({ children, params }: layoutProps) => {
  const { userId } = await auth();
  const { courseId } = await params;
  if (!userId) {
    redirect("/");
  }
  const course = await db.course.findUnique({
    where: {
      id: courseId,
    }, // get a course
    include: {
      // get all chapters of the course which is published
      chapters: {
        where: {
          isPublished: true,
        }, // get progress of the user.
        include: {
          userProgress: {
            where: {
              userId: userId,
            },
          },
        },
        orderBy: {
          position: "asc",
        },
      },
    },
  });

  if (!course) {
    redirect("/");
  }

  const progressCount = await getProgress(userId, courseId);

  const purchase = await db.purchase.findUnique({
    where: {
      userId_courseId: {
        userId,
        courseId: courseId,
      },
    },
  });

  return (
    <SidebarProvider>
      <CourseSidebar
        course={course}
        progressCount={progressCount}
        purchase={purchase}
      />

      <main className="m-2 w-full">
        <div className="flex items-center gap-2 rounded-md bg-sidebar p-2 px-4 shadow">
          <CourseNavbar course={course} progressCount={progressCount} />
        </div>

        <div className="h-4"></div>
        {/* main Content */}
        <div className="h-[calc(100vh-6rem)] overflow-y-scroll rounded-md bg-sidebar p-4 shadow">
          {children}
        </div>
      </main>
    </SidebarProvider>
  );
};

export default CourseLayout;
