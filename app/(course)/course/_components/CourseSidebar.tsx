"use client";
import { Chapter, Course, UserProgress } from "@prisma/client";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import CourseSidebarItem from "./CourseSidebarItem";

interface CourseSidebarProps {
  course: Course & {
    chapters: (Chapter & {
      userProgress: UserProgress[] | null;
    })[];
  };
  progressCount: number;
}

const CourseSidebar = ({ course, progressCount }: CourseSidebarProps) => {
  const { open } = useSidebar();
  const pathname = usePathname();

  return (
    <>
      <Sidebar collapsible="icon" variant="floating">
        <SidebarHeader>
          <div
            className={cn("flex items-center justify-between gap-2", {
              "flex-col-reverse": !open,
            })}
          >
            <Link href="/">
              <Image src="/logo.svg" width={40} height={40} alt="logo" />
            </Link>
            {open && <h1 className="text-xl font-bold">Learnify</h1>}
            <SidebarTrigger />
          </div>
        </SidebarHeader>

        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel> Chapter List</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {course.chapters.map((chapter) => {
                  return (
                    <CourseSidebarItem
                      key={chapter.id}
                      label={chapter.title}
                      id={chapter.id}
                      isCompleted={
                        chapter.userProgress?.[0]?.isCompleted || false
                      }
                      isFree={chapter.isFree}
                      courseId={course.id}
                    />
                  );
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
    </>
  );
};

export default CourseSidebar;
