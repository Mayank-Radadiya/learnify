import { db } from "@/lib/db";
import { NextRequest } from "next/server";

export async function PATCH(
  req: NextRequest,
  params: { params: { chapterId: string; courseId: string } }
) {
  try {
    const { chapterId, courseId } = await params.params;

    const chapter = await db.chapter.findUnique({
      where: {
        id: chapterId,
        courseId,
      },
    });

    if (!chapter || !chapter.videoUrl || !chapter.title || !chapter.title) {
      return new Response("Missing required fields.", { status: 400 });
    }

    const isPublishChapter = await db.chapter.update({
      where: {
        id: chapterId,
      },
      data: {
        isPublished: true,
      },
    });

    return Response.json(isPublishChapter, { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response("Internal server error", { status: 500 });
  }
}
