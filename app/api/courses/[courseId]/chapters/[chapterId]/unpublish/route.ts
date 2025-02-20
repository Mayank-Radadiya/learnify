import { db } from "@/lib/db";
import { NextRequest } from "next/server";

export async function PATCH(
  req: NextRequest,
  params: { params: { chapterId: string; courseId: string } }
) {
  try {
    const { chapterId, courseId } = await params.params;


    const isUnPublishChapter = await db.chapter.update({
      where: {
        id: chapterId,
      },
      data: {
        isPublished: false,
      },
    });

    return Response.json(isUnPublishChapter, { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response("Internal server error", { status: 500 });
  }
}
