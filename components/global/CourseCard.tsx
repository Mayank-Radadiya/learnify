import Link from "next/link";
import Image from "next/image";
import { BookOpen, Loader } from "lucide-react";
import { FormatPrice } from "@/lib/FormatPrice";
import { IconBadge } from "./Icon-bage";

interface CourseCardProps {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  price: number;
  progress: number | null;
  category: string;
  chapterLength: number;
}

const CourseCard = ({
  id,
  title,
  description,
  imageUrl,
  price,
  progress,
  category,
  chapterLength,
}: CourseCardProps) => {
  return (
    <>
      <Link
        href={`/course/${id}`}
        prefetch={false}
        className="group hover:no-underline flex w-[375px]"
      >
        <div className="bg-card rounded-xl overflow-hidden shadow-lg transition-all duration-300 ease-in-out hover:shadow-xl hover:translate-y-[-4px] border border-border flex flex-col flex-1">
          <div className="relative h-52 w-full overflow-hidden">
            {imageUrl ? (
              <Image
                src={imageUrl}
                alt={title}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-110"
              />
            ) : (
              <div className="h-full w-full flex items-center justify-center bg-muted">
                <Loader className="w-6 h-6 text-blue-500 animate-spin" />
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />
            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
              <span className="text-sm font-medium px-3 py-1 bg-black/50 text-white rounded-full backdrop-blur-sm">
                {category}
              </span>

              <span className="text-white font-bold px-3 py-1 bg-black/50 dark:bg-white/20 rounded-full backdrop-blur-sm">
                {FormatPrice(price)}
              </span>
            </div>
          </div>
          <div className="p-6 flex flex-col flex-1">
            <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors duration-300">
              {title}
            </h3>
            <p className="text-muted-foreground mb-4 line-clamp-2 flex-1">
              {description}
            </p>
            <div className="space-y-4 mt-auto">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground flex items-center gap-x-2">
                  <IconBadge icon={BookOpen} variant="success" shadow="sm" />
                  {chapterLength} chapters
                </span>
                <span className="text-sm text-muted-foreground">
                  {progress}% completed
                </span>
              </div>

              {/* Course Progressbar */}
            </div>
          </div>
        </div>
      </Link>
    </>
  );
};

export default CourseCard;
