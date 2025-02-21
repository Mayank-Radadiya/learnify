import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const courses = await db.course.findMany({
      include: {
        _count: {
          select: { purchases: true }, // Counts purchases for each course
        },
      },
    });

    return NextResponse.json(courses, { status: 200 });
  } catch (error) {
    console.log("Error from teacher/course/route.ts GET", error);
    return new NextResponse("An error occurred", { status: 500 });
  }
}
