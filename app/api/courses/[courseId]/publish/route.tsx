import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
  req: NextRequest,
  params: { params: { courseId: string } }
) {
  try {
    const { courseId } = params.params;

    const { userId } = await auth();
    if (!userId) {
      return new NextResponse("You must be logged in to view this page", {
        status: 401,
      });
    }
    const ownerOfCourse = await db.course.findUnique({
      where: {
        id: courseId,
        userId,
      },
      include: {
        chapters: true,
      },
    });

    if (!ownerOfCourse) {
      return new NextResponse("Unauthorized", { status: 403 });
    }

    const isPublishChapter = ownerOfCourse.chapters.some(
      (chapter) => chapter.isPublished
    );

    if (
      !ownerOfCourse.title ||
      !ownerOfCourse.description ||
      !isPublishChapter ||
      !ownerOfCourse.price ||
      !ownerOfCourse.imageUrl
    ) {
      return new NextResponse(
        "Please fill all the details and publish  any one the chapters",
        { status: 400 }
      );
    }
    // const course =
    await db.course.update({
      where: {
        id: courseId,
        userId,
      },
      data: {
        isPublished: true,
      },
    });

    // return NextResponse.json(course, { status: 200 });
    return new NextResponse("Course is published Now 🥳🥳🥳", { status: 200 });
  } catch (error) {
    console.log(error);
    return new NextResponse("Failed to published Course", { status: 500 });
  }
}
