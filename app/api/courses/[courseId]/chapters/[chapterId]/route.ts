import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
  req: NextRequest,
  params: { params: { chapterId: string; courseId: string } }
) {
  try {
    const { chapterId, courseId } = await params.params;
    const { isPublished, ...data } = await req.json();

    if (!data || !chapterId || !courseId) {
      return new NextResponse("Invalid request body", { status: 400 });
    }

    await db.chapter.update({
      where: {
        id: chapterId,
        courseId,
      },
      data: {
        ...data,
      },
    });

    return new NextResponse("Chapter Updated Successfully...", { status: 200 });
  } catch (error) {
    console.log("Error from Chapter/id Patch route", error);
    return new NextResponse("Error Failed to update Data...", { status: 500 });
  }
}
