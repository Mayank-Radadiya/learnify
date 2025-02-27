import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function PUT(
  req: Request,
  { params }: { params: { courseId: string; chapterId: string } }
) {
  try {
    const { userId } = await auth(); // No need for await
    const { isCompleted } = await req.json();
    const { courseId, chapterId } = await params; // Directly destructure

    if (!userId) {
      return new NextResponse("You need to be logged in", { status: 401 });
    }

    const userProgress = await db.userProgress.upsert({
      where: {
        userId_chapterId: {
          userId,
          chapterId,
        },
      },
      update: { isCompleted },
      create: { userId, chapterId, isCompleted },
    });
    return NextResponse.json(userProgress, { status: 200 });
  } catch (error) {
    console.error("Error from progress route:", error);
    return new NextResponse("Something went wrong", { status: 500 });
  }
}
