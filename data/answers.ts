import { db } from "@/lib/db";

export const getAnswersByRoomIdAndQuestionId = (
  roomId: string,
  questionId: string,
) => {
  try {
    const answers = db.answers.findMany({
      where: {
        roomId: roomId,
        questionId: questionId,
      },
      include: {
        user: true,
      },
    });

    return answers;
  } catch {
    return null;
  }
};
