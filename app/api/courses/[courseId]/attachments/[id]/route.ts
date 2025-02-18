import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string; courseId: string } }
) {
  try {
    const { id, courseId } = await params;

    console.log("Delete Attachment Id", id, courseId);
    if (!id) {
      return new NextResponse("Failed to delete Attachment Id is required", {
        status: 400,
      });
    }

    // Delete Attachment
    await db.attachment.delete({
      where: {
        id: id,
        courseId: courseId,
      },
    });

    return new NextResponse("Attachment deleted successfully", { status: 200 });
  } catch (error) {
    console.log("Error from Delete Attachment", error);
    return new NextResponse("Failed to delete attachment", { status: 500 });
  }
}
