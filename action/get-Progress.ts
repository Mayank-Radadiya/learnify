"use server"
import { db } from "@/lib/db";

export async function getProgress(userId: string, courseId: string) {
  try {
    // get all courses that are published
    const publishedCourses = await db.course.findMany({
      where: {
        id: courseId,
        isPublished: true,
      },
      select: {
        id: true,
      },
    });

    // get all chapters id
    const publishedChapterID = publishedCourses.map((chapter) => chapter.id);

    const validCompletedChapters = await db.userProgress.count({
      where: {
        id: userId,
        chapterId: {
          in: publishedChapterID,
        },
        isCompleted: true,
      },
    });
    const progressPercentage =
      (validCompletedChapters / publishedChapterID.length) * 100;

    return progressPercentage;
  } catch (error) {
    console.error("error from getProgress", error);
    return 0;
  }
}
