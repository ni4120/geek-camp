import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: { answerId: string } },
) {
  const { answerId } = params;
  const { content } = await req.json();

  if (!answerId || content === undefined) {
    return new Response("Missing parameters", { status: 400 });
  }

  try {
    const updatedAnswer = await db.answers.update({
      where: { id: answerId },
      data: {
        content,
        isCompleted: true,
      },
    });

    return NextResponse.json(updatedAnswer, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update answer" },
      { status: 500 },
    );
  }
}
