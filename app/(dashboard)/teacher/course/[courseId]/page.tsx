import { IconBadge } from "@/components/global/Icon-bage";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import {
  CircleDollarSign,
  LayoutDashboard,
  ListCheck,
  Paperclip,
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { redirect } from "next/navigation";
import toast from "react-hot-toast";

import TitleForm from "./_components/TitleForm";
import DescriptionForm from "./_components/DescriptionFrom";
import ImageForm from "./_components/ImageForm";
import CategoryForm from "./_components/CategoryForm";
import PriceForm from "./_components/PriceFrom";
import AttachmentForm from "./_components/AttachmentForm";
import ChapterFrom from "./_components/ChapterFrom";
import { cn } from "@/lib/utils";
import CourseAction from "./_components/CourseAction";
import Banner from "@/components/global/Banner";

const Page = async ({ params }: { params: { courseId: string } }) => {
  const { userId } = await auth();
  const { courseId } = await params;

  if (!userId) {
    toast.error("You must be logged in to view this page");
    return redirect("/");
  }

  const course = await db.course.findUnique({
    where: {
      id: courseId,
      userId,
    },
    include: {
      chapters: {
        orderBy: {
          position: "asc",
        },
      },
      attachments: {
        orderBy: {
          createdAt: "desc",
        },
      },
    },
  });

  const category = await db.category.findMany({
    orderBy: {
      name: "asc",
    },
  });

  if (!course) {
    toast.error("Course not found");
    return redirect("/");
  }

  const isPublishCourseMissingFields = await db.course.findUnique({
    where: {
      id: courseId,
    },
    select: {
      title: true,
      description: true,
      imageUrl: true,
      price: true,
      categoryId: true,
      chapters: {
        select: {
          isPublished: true,
        },
      },
    },
  });

  if (isPublishCourseMissingFields) {
    if (
      !isPublishCourseMissingFields.title ||
      !isPublishCourseMissingFields.description ||
      !isPublishCourseMissingFields.imageUrl ||
      !isPublishCourseMissingFields.price ||
      !isPublishCourseMissingFields.categoryId ||
      !isPublishCourseMissingFields.chapters.some((chap) => chap.isPublished)
    ) {
      await db.course.update({
        where: {
          id: courseId,
        },
        data: {
          isPublished: false,
        },
      });
    }
  }

  const requiredFields = [
    { key: "title", value: course.title },
    { key: "description", value: course.description },
    { key: "imageUrl", value: course.imageUrl },
    { key: "price", value: course.price },
    { key: "categoryId", value: course.categoryId },
    {
      key: "chapters",
      value: course.chapters.some((chap) => chap.isPublished),
    },
  ];

  const totalFields = requiredFields.length;
  const completedFields = requiredFields.filter((field) => field.value).length;

  const completionText = `${completedFields}/${totalFields}`;

  const isCompleted = completedFields === totalFields;

  return (
    <>
      {!course.isPublished ? (
        <Banner label="This course unpublish. It will not visible to student." />
      ) : (
        <Banner
          variant="success"
          label="This course is published.Now,you can sell it."
        />
      )}
      <div className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-y-2 w-full">
            <div className="flex items-center gap-x-2 w-full justify-between">
              <h1 className="text-2xl font-medium">Course Setup</h1>
              <CourseAction
                isPublished={course.isPublished}
                disabled={!isCompleted}
                courseId={courseId}
              />
            </div>
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
                {completedFields !== totalFields && (
                  <TooltipContent>
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
                )}
              </Tooltip>
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
          <div>
            <div className="flex items-center gap-x-2">
              <IconBadge variant="default" shadow="md" icon={LayoutDashboard} />
              <h2 className="text-xl">Customize your course</h2>
            </div>

            <TitleForm data={course} courseId={courseId} />
            <DescriptionForm data={course} courseId={courseId} />
            <ImageForm data={course} courseId={courseId} />
            <CategoryForm
              data={course}
              courseId={courseId}
              option={category.map((category) => ({
                label: category.name,
                value: category.id,
              }))}
            />
          </div>
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-x-2">
                <IconBadge icon={ListCheck} shadow="sm" />
                <h2 className="text-xl">Course Chapter</h2>
              </div>
              <p className="text-sm mt-4 text-slate-700 dark:text-gray-300">
                Add chapters to your course to make it easier for students to
                navigate your content.
              </p>
              <div>
                <ChapterFrom data={course} courseId={courseId} />
              </div>
            </div>

            <div>
              <div className="flex items-center gap-x-2">
                <IconBadge
                  icon={CircleDollarSign}
                  variant="success"
                  shadow="md"
                />
                <h2 className="text-xl">Sell Your Course</h2>
              </div>
              <PriceForm data={course} courseId={courseId} />
            </div>
            <div>
              <div className="flex items-center gap-x-2">
                <IconBadge icon={Paperclip} shadow="xl" />
                <h2 className="text-xl">Resources & Attachments</h2>
              </div>
              <AttachmentForm data={course} courseId={courseId} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
