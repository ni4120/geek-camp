import { db } from "@/lib/db";
import { NextResponse } from "next/server";

type RoomUser = {
  userId: string;
  roomId: string;
  id: string;
};

export async function POST(req: Request) {
  const { roomUsers, roomId, questionId } = await req.json();

  if (!roomUsers || !roomId || !questionId) {
    return new Response("Missing parameters", { status: 400 });
  }

  try {
    await db.answers.createMany({
      data: roomUsers.map((user: RoomUser) => ({
        userId: user.userId,
        roomId: roomId,
        questionId: questionId,
        content: "",
        isCompleted: false,
        isJudgment: false,
      })),
    });

    return new NextResponse(null, { status: 201 });
  } catch {
    return NextResponse.json({ error: "error not create answers" });
  }
}
