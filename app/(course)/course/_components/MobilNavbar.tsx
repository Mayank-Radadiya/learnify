import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Chapter, Course, UserProgress } from "@prisma/client";
import { Menu } from "lucide-react";
import CourseSidebarItem from "./CourseSidebarItem";

interface MobilNavbarProps {
  course: Course & {
    chapters: (Chapter & {
      userProgress: UserProgress[] | null;
    })[];
  };
  progressCount: number;
}

const MobilNavbar = ({ course, progressCount }: MobilNavbarProps) => {
  return (
    <Sheet>
      <SheetTrigger className="md:hidden pr-4 hover:opacity-75 transition">
        <Menu />
      </SheetTrigger>
      <SheetContent  className=" p-0 pt-4 w-72 items-center" side="left">
        
        <SheetHeader>
          <SheetTitle>Course Chapters</SheetTitle>
        </SheetHeader>
        {course.chapters.map((chapter) => (
          <CourseSidebarItem
            key={chapter.id}
            label={chapter.title}
            id={chapter.id}
            isCompleted={chapter.userProgress?.[0]?.isCompleted || false}
            isFree={chapter.isFree}
            courseId={course.id}
          />
        ))}
      </SheetContent>
    </Sheet>
  );
};

export default MobilNavbar;
