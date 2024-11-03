import { getAnswersByRoomIdAndQuestionId } from "@/data/answers";
import { getQuestionById } from "@/data/questions";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import OpenAI from "openai";

export async function POST(req: Request) {
  const { roomId, questionId } = await req.json();
  const openai = new OpenAI({
    apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
  });

  const allAnswers = await getAnswersByRoomIdAndQuestionId(roomId, questionId);
  const answers = allAnswers?.filter((answer) => answer.isCompleted);

  const question = await getQuestionById(questionId);

  if (!answers || answers.length === 0) {
    return NextResponse.json({ error: "回答が見つかりませんでした" });
  }
  if (!question) {
    return NextResponse.json({ error: "質問が見つかりませんでした" });
  }

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: `あなたは、質問に対する最良の回答を選択するアシスタントです。質問と複数の回答が与えられた場合、最良の回答を選び、そのanswerIdを返してください。出力はanswerIdのみで、それ以外は何も出力しないでください。`,
        },
        {
          role: "user",
          content: `質問: ${question.content}\n\n回答:\n${answers
            .map(
              (answer) =>
                `- answerId: ${answer.id}, content: ${answer.content}`,
            )
            .join("\n")}`,
        },
      ],
    });

    const answerId = response.choices[0].message.content?.trim();

    await db.answers.update({
      where: { id: answerId },
      data: { isJudgment: true },
    });

    return NextResponse.json(null, { status: 201 });
  } catch {
    return NextResponse.json({ error: "error result content" });
  }
}
