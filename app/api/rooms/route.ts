import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { v4 as uuidv4 } from "uuid";

export async function POST(req: Request) {
  const { name, hostId } = await req.json();
  const sharedUrl = `${process.env.BASE_URL || "http://localhost:3000"}/room/${uuidv4()}`;

  try {
    const room = await db.rooms.create({
      data: {
        name,
        hostId,
        sharedUrl,
        status: "WAITING",
      },
    });
    return NextResponse.json(room);
  } catch {
    return NextResponse.json({ error: "Error creating room" }, { status: 500 });
  }
}
