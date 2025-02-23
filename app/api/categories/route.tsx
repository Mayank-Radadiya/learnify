import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const categories = await db.category.findMany();

    return NextResponse.json(categories);
  } catch (error) {
    console.log("error from Categories route", error);
    return new NextResponse("Error fetching categories", { status: 500 });
  }
}
