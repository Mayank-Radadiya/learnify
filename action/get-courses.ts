"use server";
import { db } from "@/lib/db";
import { Category, Course } from "@prisma/client";
import { getProgress } from "./get-Progress";

type CourseWithProgressWithCategory = Course & {
  category: Category | null;
  progress: number | null;
  chapters: { id: string }[];
};

type GetCourses = {
  userId: string;
  title?: string;
  categoryId?: string;
};

export async function getCourses({
  userId,
  title,
  categoryId,
}: GetCourses): Promise<CourseWithProgressWithCategory[]> {
  try {
    if (!title && !categoryId) {
      // retrieve all courses
      const allCourses = await db.course.findMany({
        where: {
          isPublished: true,
        },
        include: {
          category: true,
          chapters: {
            where: {
              isPublished: true,
            },
            select: { id: true },
          },
          purchases: {
            where: {
              userId,
            },
          },
        },
        orderBy: {
          createdAt: "desc",
        },
      });

      return await Promise.all(
        allCourses.map(async (course) => {
          const progress = course.purchases.length
            ? await getProgress(userId, course.id)
            : null;

          return { ...course, progress };
        })
      );
    }

    // Fix title search by making it case-insensitive
    const courses = await db.course.findMany({
      where: {
        isPublished: true,
        title: title
          ? { contains: title, mode: "insensitive" } // Case-insensitive search
          : undefined,
        categoryId: categoryId || undefined, // Ignore if undefined
      },
      include: {
        category: true,
        chapters: {
          where: {
            isPublished: true,
          },
          select: { id: true },
        },
        purchases: {
          where: {
            userId,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    console.log("courses", courses);

    return await Promise.all(
      courses.map(async (course) => {
        const progress = course.purchases.length
          ? await getProgress(userId, course.id)
          : null;

        return { ...course, progress };
      })
    );
  } catch (error) {
    console.error("error from getCourses", error);
    return [];
  }
}
