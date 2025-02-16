import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { userId } = await auth();
    const { title } = await req.json();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const course = await db.course.create({
      data: {
        userId,
        title,
      },
    });

    return new NextResponse(JSON.stringify(course), {
      status: 201,
    });
  } catch (error) {
    console.log("Api/courses Api", error);
    return new NextResponse("Failed to create course", { status: 500 });
  }
}
