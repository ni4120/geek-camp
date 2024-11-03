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
    return NextResponse.json({ error: "error joining room" });
  }
}

export enum SortOrder {
  ASC = "asc",
  DESC = "desc",
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const roomId = searchParams.get('roomId');
  if (!roomId) {
    return NextResponse.json({ error: "roomId is required" }, { status: 400 });
  }
  const orderBy = searchParams.get('orderBy') as SortOrder;
  const limitParam = searchParams.get('limit')
  const limit = limitParam !== null ? parseInt(limitParam) : undefined
  try {
    const roomUsers = await db.roomUsers.findMany({
      where: {
        roomId: roomId,
      },
      ...(orderBy ? { orderBy: { created_at: orderBy } } : {}),
      ...(limit ? { take: limit } : {}),
      select: {
        userId: true,
        user: {
          select: {
            name: true,
          },
        },
      },
    });
    return NextResponse.json(roomUsers, { status: 200 });
  }
  catch {
    return NextResponse.json({ error: "Error fetching room users" })
  }
}

