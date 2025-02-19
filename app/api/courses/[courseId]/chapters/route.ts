import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(
  req: NextRequest,
  { params }: { params: { courseId: string } }
) {
  try {
    const { courseId } = await params;
    const { title } = await req.json();
    const { userId } = await auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const lastChapter = await db.chapter.findFirst({
      where: {
        courseId,
      },
      orderBy: {
        position: "desc",
      },
    });

    const newPosition = lastChapter ? lastChapter.position + 1 : 1;

    const chapter = await db.chapter.create({
      data: {
        title,
        position: newPosition,
        courseId,
      },
    });

    return NextResponse.json(chapter);
  } catch (error) {
    console.log("error from chapter route", error);
    return new NextResponse("Internal Server Error from Chapter Route", {
      status: 500,
    });
  }
}
