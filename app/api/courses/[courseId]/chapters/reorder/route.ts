import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest) {
  try {
    const { list } = await req.json();

    for (let item of list) {
      await db.chapter.update({
        where: {
          id: item.id,
        },
        data: {
          position: item.position,
        },
      });
    }

    return new NextResponse("Chapter Reordered Successfully", {
      status: 200,
    });
  } catch (error) {
    console.log("error from chapter reorder route", error);
    return new NextResponse(
      "Internal Server Error from Chapter Reorder Route",
      {
        status: 500,
      }
    );
  }
}
