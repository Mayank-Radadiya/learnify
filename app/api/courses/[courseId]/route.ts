import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
// import Mux from "@mux/mux-node";

// const { video } = new Mux({
//   tokenId: process.env.MUX_TOKEN_ID!,
//   tokenSecret: process.env.MUX_TOKEN_SECRET!,
// });

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

export async function DELETE(
  req: NextRequest,
  { params }: { params: { courseId: string } }
) {
  try {
    const { courseId } = await params;
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json("Unauthorized", { status: 401 });
    }
    const course = await db.course.findUnique({
      where: {
        id: courseId,
        userId,
      },
      // include: {
      //   chapters: {
      //     include: {
      //       muxData: true,
      //     },
      //   },
      // },
    });
    if (!course) {
      return NextResponse.json("Course not found", { status: 404 });
    }
    // // Delete mux video
    // //  because my mux account is not verified.It will not work.Video automatically deleted after 1 days.
    // for (const chapter of course.chapters) {
    //   if (chapter.muxData) {
    //     await video.assets.delete(chapter.muxData.assetId);
    //   }
    // }

    await db.course.delete({
      where: {
        id: courseId,
        userId,
      },
    });

    return new NextResponse("Course deleted successfully", { status: 200 });
  } catch (error) {
    console.error("Course  error", error);
    return NextResponse.json("Failed to delete course ", { status: 500 });
  }
}
