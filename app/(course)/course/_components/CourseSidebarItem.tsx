"use client";
import { SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Lock, PlayCircle } from "lucide-react";

interface CourseSidebarItemProps {
  label: string;
  id: string;
  isCompleted: boolean;
  isFree: boolean;
  courseId: string;
}

const CourseSidebarItem = ({
  label,
  id,
  isCompleted,
  isFree,
  courseId,
}: CourseSidebarItemProps) => {
  const pathname = usePathname();

  const Icon = !isFree ? Lock : isCompleted ? PlayCircle : PlayCircle;
  const isActive = pathname?.includes(id);

  return (
    <>
      <SidebarMenuItem key={id}>
        <SidebarMenuButton asChild>
          <Link
            href={`/course/${courseId}/chapter/${id}`}
            className={cn(
              "flex items-center gap-2 p-2 rounded-md text-slate-500 transition-all pl-6 hover:text-zinc-700 hover:bg-slate-500/30",
              {
                "bg-slate-600/20": isActive,
                "text-emerald-700 ": isCompleted,
                "bg-emerald-200/20": isActive && isCompleted,
              }
            )}
          >
            <Icon
              className={cn("w-6 h-6", {
                "text-emerald-700": isCompleted,
                "text-slate-500": !isCompleted,
              })}
            />
            <span className="text-sm font-semibold">{label}</span>
          </Link>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </>
  );
};

export default CourseSidebarItem;
