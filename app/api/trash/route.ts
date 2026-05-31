import { prisma } from "@/app/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const trash = await prisma.bookmark.findMany({
      where: {
        deleted: true,
      },
      include: {
        tags: true,
      },
      orderBy: {
        bid: "desc",
      },
    });

    return NextResponse.json({
      data: trash,
    });
  } catch (err) {
    return NextResponse.json(
      {
        error: "Failed to fetch trash",
      },
      { status: 500 }
    );
  }
}
export async function PUT(req: Request) {
  try {
    const { id } = await req.json();

    await prisma.bookmark.update({
      where: {
        bid:id,
      },
      data: {
        deleted: false,
      },
    });

    return NextResponse.json({
      message: "Bookmark restored",
    });
  } catch (err) {
    return NextResponse.json(
      {
        error: "Restore failed",
      },
      { status: 500 }
    );
  }
}
export async function DELETE(req: Request) {
  try {
    const { id } = await req.json();

    await prisma.bookmark.delete({
      where: {
        bid:id,
      },
    });

    return NextResponse.json({
      message: "Deleted permanently",
    });
  } catch (err) {
    return NextResponse.json(
      {
        error: "Permanent delete failed",
      },
      { status: 500 }
    );
  }
}