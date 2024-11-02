import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(req: Request) {
  const { userId, roomId } = await req.json();

  try {
    await db.roomUsers.create({
      data: {
        userId,
        roomId,
      },
    });
    return new NextResponse(null, { status: 201 });
  } catch {
    return NextResponse.json({ error: 'error joining room' })
  }
}
