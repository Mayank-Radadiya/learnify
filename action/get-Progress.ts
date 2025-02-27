"use server";
import { db } from "@/lib/db";

export async function getProgress(userId: string, courseId: string) {
  try {
    // Get published course chapters
    const publishedChapters = await db.chapter.findMany({
      where: {
        courseId,
        isPublished: true,
      },
      select: {
        id: true,
      },
    });

    const publishedChapterIDs = publishedChapters.map((chapter) => chapter.id);

    if (publishedChapterIDs.length === 0) return 0;

    // Count completed chapters
    const validCompletedChapters = await db.userProgress.count({
      where: {
        userId, // Corrected from id: userId
        chapterId: {
          in: publishedChapterIDs,
        },
        isCompleted: true,
      },
    });

    const progressPercentage =
      (validCompletedChapters / publishedChapterIDs.length) * 100;

    return progressPercentage;
  } catch (error) {
    console.error("Error from getProgress:", error);
    return 0;
  }
}
