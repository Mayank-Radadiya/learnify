import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
  req: NextRequest,
  { params }: { params: { courseId: string } }
) {
  try {
    const value = await req.json();
    // Ensure value is an object
    if (!value || typeof value !== "object") {
      return NextResponse.json(
        { error: "Invalid request body" },
        { status: 400 }
      );
    }
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
    console.error("Course  error", error);
    return NextResponse.json("Failed to update course ", { status: 500 });
  }
}
