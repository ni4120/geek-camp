import { db } from "@/lib/db";

export const getLatestQuestion = async () => {
  try {
    const question = await db.questions.findFirst({
      orderBy: {
        createdAt: "desc",
      },
    });
    return question;
  } catch {
    return null;
  }
};

export const getQuestionById = async (questionId: string) => {
  try {
    const question = await db.questions.findUnique({
      where: { id: questionId },
    });

    return question;
  } catch {
    return null;
  }
};
