import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import Mux from "@mux/mux-node";

const { video } = new Mux({
  tokenId: process.env.MUX_TOKEN_ID!,
  tokenSecret: process.env.MUX_TOKEN_SECRET!,
});

export async function PATCH(
  req: NextRequest,
  params: { params: { chapterId: string; courseId: string } }
) {
  try {
    const { chapterId, courseId } = await params.params;
    const { isPublished, ...data } = await req.json();

    if (!data || !chapterId || !courseId) {
      return new NextResponse("Invalid request body", { status: 400 });
    }

    await db.chapter.update({
      where: {
        id: chapterId,
        courseId,
      },
      data: {
        ...data,
      },
    });

    if (data.videoUrl) {
      const existingMuxData = await db.muxData.findFirst({
        where: {
          chapterId,
        },
      });

      if (existingMuxData) {
        await video.assets.delete(existingMuxData.assetId);
        await db.muxData.delete({
          where: {
            id: existingMuxData.id,
          },
        });
      }

      const asset = await video.assets.create({
        input: data.videoUrl,
        playback_policy: ["public"],
        test: false,
      });

      await db.muxData.create({
        data: {
          chapterId,
          assetId: asset.id,
          playbackId: asset.playback_ids?.[0]?.id,
        },
      });
    }
    return new NextResponse("Chapter Updated Successfully...", { status: 200 });
  } catch (error) {
    console.log("Error from Chapter/id Patch route", error);
    return new NextResponse("Error Failed to update Data...", { status: 500 });
  }
}


