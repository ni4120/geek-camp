import { NextResponse } from "next/server";
import { db } from "@/lib/db";


export async function PATCH(
  request: Request,
  { params }: { params: { roomId: string } },
) {
  const body = await request.json();
  const roomId = params.roomId;
  try {
    const updatedRoom = await db.rooms.update({
      where: {
        id: roomId,
      },
      data: {
        status: body.status,
      },
    });
    return NextResponse.json(updatedRoom);
  } catch {
    console.error(Error);
    return NextResponse.json(
      { error: "Error updating room status" },
      { status: 500 },
    );
  }
}
