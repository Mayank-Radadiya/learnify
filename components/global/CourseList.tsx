import { Category, Course } from "@prisma/client";
import CourseCard from "./CourseCard";
import { Loader } from "lucide-react";

type CourseWithProgressWithCategory = Course & {
  category: Category | null;
  chapters: { id: string }[];
  progress: number | null;
};

interface CourseListProps {
  items: CourseWithProgressWithCategory[];
}

const CourseList = ({ items }: CourseListProps) => {
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
        {items === null ? ( // Show loader while data is null (loading state)
          <div className="flex justify-center items-center h-32 col-span-full">
            <Loader className="w-6 h-6 text-blue-500 animate-spin" />
          </div>
        ) : items.length > 0 ? ( // Show courses if items exist
          items.map((item) => (
            <CourseCard
              key={item.id}
              id={item.id}
              title={item.title}
              description={item.description || ""}
              imageUrl={item.imageUrl || ""}
              price={item.price || 0}
              progress={item.progress}
              category={item.category?.name || ""}
              chapterLength={item.chapters.length}
            />
          ))
        ) : (
          // Show message if items is an empty array
          <div className="p-6 text-center text-lg text-gray-500 col-span-full">
            No courses found
          </div>
        )}
      </div>
    </>
  );
};

export default CourseList;
