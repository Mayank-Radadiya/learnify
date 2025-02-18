import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(
  req: NextRequest,
  params: { params: { courseId: string } }
) {
  try {
    const { userId } = await auth();
    const { url } = await req.json();
    const { courseId } = await params.params;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const owner = await db.course.findUnique({
      where: {
        id: courseId,
        userId: userId,
      },
    });

    if (!owner) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const attachment = await db.attachment.create({
      data: {
        url,
        name: url.split("/").pop(),
        courseId: courseId,
      },
    });

    return NextResponse.json(attachment);
  } catch (error) {
    console.log("Error from Attachment/route.ts", error);
    return new NextResponse("Failed to update course Attachments", {
      status: 500,
    });
  }
}
