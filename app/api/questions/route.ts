import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import OpenAI from "openai";

export async function POST() {
    const openai = new OpenAI({
        apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY
    });

    try {
        const response = await openai.chat.completions.create({
            model: "gpt-4",
            messages: [
                {
                    role: "user",
                    content: "大喜利のお題を考えてください。お題の内容のみで「」などもなしで出力してください。"
                }
            ]
        });

        const content = response.choices[0].message.content;

        if (!content) {
            return NextResponse.json({ error: "error question content"})
        }

        const question = await db.questions.create({
            data: {
                content: content
            }
        })

        return NextResponse.json(question)
    } catch {
        return NextResponse.json({ error: "error question content"})
    }
}
