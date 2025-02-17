import { IconBadge } from "@/components/global/Icon-bage";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { LayoutDashboard } from "lucide-react";
import { redirect } from "next/navigation";
import toast from "react-hot-toast";
import TitleForm from "./_components/TitleForm";
import DescriptionForm from "./_components/DescriptionFrom";
import ImageForm from "./_components/ImageForm";
import CategoryForm from "./_components/CategoryForm";

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

  const requiredFields = [
    course.title,
    course.description,
    course.imageUrl,
    course.price,
    course.categoryId,
  ];

  const totalFields = requiredFields.length;
  const completedFields = requiredFields.filter(Boolean).length;

  const completionText = `${completedFields}/${totalFields}`;

  return (
    <>
      <div className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-y-2">
            <h1 className="text-2xl font-medium">Course Setup</h1>
            <span className="text-sm text-slate-700 dark:text-gray-300">
              ({completionText}) fields completed
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16  ">
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
        </div>
      </div>
    </>
  );
};

export default Page;
