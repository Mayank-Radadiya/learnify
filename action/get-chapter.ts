import { db } from "@/lib/db";
import { Attachment, Chapter } from "@prisma/client";

interface chapterProps {
  userId: string;
  courseId: string;
  chapterId: string;
}

export async function getChapter({
  userId,
  courseId,
  chapterId,
}: chapterProps) {
  try {
    const purchase = await db.purchase.findUnique({
      where: {
        userId_courseId: {
          userId: userId,
          courseId: courseId,
        },
      },
    });

    const course = await db.course.findUnique({
      where: {
        id: courseId,
        isPublished: true,
      },
      select: {
        price: true,
      },
    });

    const chapter = await db.chapter.findUnique({
      where: {
        id: chapterId,
        isPublished: true,
      },
    });

    if (!chapter && !course) {
      throw new Error("Chapter or Course not found");
    }

    let muxData = null;
    let attachment: Attachment[] = [];
    let nextChapter: Chapter | null = null;

    if (purchase) {
      attachment = await db.attachment.findMany({
        where: {
          courseId: courseId,
        },
      });
    }

    if (chapter?.isFree || purchase) {
      muxData = await db.muxData.findFirst({
        where: {
          chapterId: chapterId,
        },
      });

      nextChapter = await db.chapter.findFirst({
        where: {
          courseId: courseId,
          isPublished: true,
          position: {
            gt: chapter?.position,
          },
        },
        orderBy: {
          position: "asc",
        },
      });
    }

    const userProgress = await db.userProgress.findFirst({
      where: {
        userId,
        chapter: {
          courseId, // Filter via relation
        },
      },
    });

    return {
      chapter,
      course,
      muxData,
      attachment,
      nextChapter,
      userProgress,
      purchase,
    };
  } catch (error) {
    console.log("error from getChapter", error);
    return {
      chapter: null,
      course: null,
      muxData: null,
      attachment: [],
      nextChapter: null,
      userProgress: null,
      purchase: null,
    };
  }
}
