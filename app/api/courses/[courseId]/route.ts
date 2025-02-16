import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
  req: NextRequest,
  { params }: { params: { courseId: string } }
) {
  try {
    const value = await req.json();
    const { courseId } = await params;
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json("Unauthorized", { status: 401 });
    }

    const course = await db.course.update({
      where: {
        id: courseId,
        userId,
      },
      data: {
        ...value,
      },
    });

    return NextResponse.json(course);
  } catch (error) {
    console.error("Course Title error", error);
    return NextResponse.json("Failed to update course Title", { status: 500 });
  }
}
