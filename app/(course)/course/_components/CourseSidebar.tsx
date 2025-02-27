"use client";
import { Chapter, Course, Purchase, UserProgress } from "@prisma/client";
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
import Image from "next/image";
import CourseSidebarItem from "./CourseSidebarItem";
import ProgressBar from "@/components/global/ProgressBar";

interface CourseSidebarProps {
  course: Course & {
    chapters: (Chapter & {
      userProgress: UserProgress[] | null;
    })[];
  };
  purchase: Purchase | null;
  progressCount: number;
}

const CourseSidebar = ({
  course,
  progressCount,
  purchase,
}: CourseSidebarProps) => {
  const { open } = useSidebar();

  return (
    <>
      <Sidebar collapsible="icon" variant="floating">
        <SidebarHeader>
          <div className="p-1 gap-y-5 flex flex-col">
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

            <div>
              {purchase && (
                <>
                  <ProgressBar variant="success" value={progressCount} />
                </>
              )}
            </div>
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
                      isFree={!chapter.isFree && !purchase}
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
