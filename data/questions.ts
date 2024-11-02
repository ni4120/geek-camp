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
