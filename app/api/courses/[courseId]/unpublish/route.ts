import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
  req: NextRequest,
  params: { params: { courseId: string } }
) {
  try {
    const { courseId } = await params.params;

    // check user
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
    });

    if (!ownerOfCourse) {
      return new NextResponse("Unauthorized", { status: 403 });
    }

    // const course =
    await db.course.update({
      where: {
        id: courseId,
        userId,
      },
      data: {
        isPublished: false,
      },
    });

    // return NextResponse.json(course, { status: 200 });
    return new NextResponse("Course is unpublished Now 🥳🥳🥳", {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return new NextResponse("Failed to unpublished Course", { status: 500 });
  }
}
