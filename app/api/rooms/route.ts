import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(req: Request) {
  const { name, hostId } = await req.json();

  try {
    const initialRoom = await db.rooms.create({
      data: {
        name,
        hostId,
        sharedUrl: "", // 初期値を空の文字列にする。
        status: "WAITING",
      },
    });

    const sharedUrl = `${process.env.BASE_URL || "http://localhost:3000"}/guest/${initialRoom.id}`;
    const room = await db.rooms.update({
      where: { id: initialRoom.id },
      data: { sharedUrl: sharedUrl },
    });
    return NextResponse.json(room);
  } catch {
    return NextResponse.json({ error: "Error creating room" }, { status: 500 });
  }
}
