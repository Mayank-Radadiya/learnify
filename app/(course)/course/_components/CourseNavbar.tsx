"use client";
import { UserButton } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import { LogOut } from "lucide-react";
import Link from "next/link";
import { Course, Chapter, UserProgress } from "@prisma/client";
import { Button } from "@/components/ui/button";
import ThemeToggle from "@/components/global/ThemeToggle";
import MobilNavbar from "./MobilNavbar";

interface CourseNavbarProps {
  course: Course & {
    chapters: (Chapter & {
      userProgress: UserProgress[] | null;
    })[];
  };
  progressCount: number;
}

const CourseNavbar = ({ course, progressCount }: CourseNavbarProps) => {
  const pathname = usePathname();

  const isTeacherPage = pathname?.startsWith("/teacher");
  const isCoursePage = pathname?.includes("/course");
  return (
    <>
      <div>
        <MobilNavbar course={course} progressCount={progressCount} />
         <div className="relative flex  items-center justify-center overflow-hidden">
        <span className="pointer-events-none  bg-gradient-to-b from-black to-gray-300/80 bg-clip-text text-center font-semibold leading-none text-transparent dark:from-white dark:to-slate-900/10 text-4xl">
          {course.title}
        </span>
      </div>
      </div>
      <div className="ml-auto gap-5 items-center flex">
        {isTeacherPage || isCoursePage ? (
          <Link href="/">
            <Button size="sm" variant="ghost">
              {" "}
              <LogOut className="h-4 w-4 mr-2" />
              Exit{" "}
            </Button>
          </Link>
        ) : (
          <Link href="/teacher/course">
            <Button size="sm" variant="ghost">
              Teacher Mode
            </Button>
          </Link>
        )}
        <ThemeToggle />
        <UserButton />
      </div>
    </>
  );
};

export default CourseNavbar;
