import { IconBadge } from "@/components/global/Icon-bage";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { CircleDollarSign, LayoutDashboard, ListCheck } from "lucide-react";
import { redirect } from "next/navigation";
import toast from "react-hot-toast";
import TitleForm from "./_components/TitleForm";
import DescriptionForm from "./_components/DescriptionFrom";
import ImageForm from "./_components/ImageForm";
import CategoryForm from "./_components/CategoryForm";
import PriceForm from "./_components/PriceFrom";


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
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-x-2">
                <IconBadge icon={ListCheck} />
                <h2 className="text-xl">Course Chapter</h2>
              </div>
              <p className="text-sm mt-4 text-slate-700 dark:text-gray-300">
                Add chapters to your course to make it easier for students to
                navigate your content.
              </p>
            </div>

            <div>
              <div className="flex items-center gap-x-2">
                <IconBadge icon={CircleDollarSign} variant="success" />
                <h2 className="text-xl">Sell Your Course</h2>
              </div>
              <PriceForm data={course} courseId={courseId} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
