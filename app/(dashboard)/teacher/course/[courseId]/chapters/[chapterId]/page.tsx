import { IconBadge } from "@/components/global/Icon-bage";
import { Button } from "@/components/ui/button";
import { db } from "@/lib/db";
import { cn } from "@/lib/utils";
import { auth } from "@clerk/nextjs/server";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@radix-ui/react-tooltip";
import { ChevronLeft, LayoutDashboard, Pencil, X } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import ChapterTitleForm from "./_components/ChapterTitleForm";
import ChapterDescriptionForm from "./_components/ChapterDecriptionForm";

const Page = async ({
  params,
}: {
  params: { courseId: string; chapterId: string };
}) => {
  const { chapterId, courseId } = await params;

  const { userId } = await auth();
  if (!userId) {
    return redirect("/");
  }

  const chapter = await db.chapter.findUnique({
    where: {
      id: chapterId,
    },
    include: {
      muxData: true,
    },
  });

  if (!chapter) {
    return redirect(`/`);
  }
  const requiredFields = [
    { key: "title", value: chapter.title },
    { key: "description", value: chapter.description },
    { key: "videoUrl", value: chapter.videoUrl },
  ];

  const totalFields = requiredFields.length;
  const completedFields = requiredFields.filter((field) => field.value).length;

  const completionText = `${completedFields}/${totalFields}`;

  return (
    <div className="p-6">
      <div className="flex items-center justify-between">
        <div className="w-full items-center">
          <Link href={`/teacher/course/${courseId}`}>
            <button className="flex items-center bg-primary text-white gap-1 px-2 py-2 font-semibold tracking-widest rounded-md hover:bg-blue-300 duration-300 hover:gap-2 hover:-translate-x-4">
              <ChevronLeft /> Back to course
            </button>
          </Link>
          <div className="flex items-center justify-between w-full">
            <div className="flex flex-col gap-y-2">
              <h1 className="text-2xl font-medium mt-4">Chapter Creation</h1>
              <span className="text-sm text-slate-700 dark:text-gray-300">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <span
                      className={cn(
                        "text-sm text-slate-700 dark:text-gray-300",
                        completedFields === totalFields
                          ? "text-green-500"
                          : "text-red-500"
                      )}
                    >
                      ({completionText}) fields completed
                    </span>
                  </TooltipTrigger>
                  <TooltipContent
                    align="center"
                    className="p-2 rounded-md bg-background shadow-md mb-2"
                  >
                    <p>Required fields:</p>
                    {requiredFields.map(({ key, value }) => {
                      if (!value) {
                        return (
                          <p key={key} className="text-red-500">
                            {key.toUpperCase()}
                          </p>
                        );
                      }
                      return null;
                    })}
                  </TooltipContent>
                </Tooltip>
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
        <div className="space-y-4">
          <div>
            <div className="flex items-center gap-x-2">
              <IconBadge variant="default" shadow="md" icon={LayoutDashboard} />
              <h2 className="text-xl">Customize your Chapter</h2>
            </div>
            <ChapterTitleForm
              chapterId={chapterId}
              courseId={courseId}
              data={chapter}
            />
            <ChapterDescriptionForm
              chapterId={chapterId}
              courseId={courseId}
              data={chapter}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
