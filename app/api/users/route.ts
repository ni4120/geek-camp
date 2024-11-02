import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(request: NextRequest) {
  const { name, role } = await request.json();

  try {
    const user = await db.user.create({
      data: {
        name,
        role,
      },
    });
    return NextResponse.json(user);
  } catch {
    return NextResponse.json(
      { error: `error createing user` },
      { status: 500 },
    );
  }
}
