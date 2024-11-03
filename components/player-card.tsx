"use client";

import { Card } from "@/components/ui/card";
import PlayerForm from "./player-form";
import { Prisma } from "@prisma/client";

type AnswerWithUser = Prisma.AnswersGetPayload<{
  include: { user: true };
}>;

interface PlayerCardProps {
  isPlayer: boolean;
  userId: string;
  answer: AnswerWithUser;
  isAIJudgment: boolean;
}

const PlayerCard = ({ isPlayer, userId, answer, isAIJudgment }: PlayerCardProps) => {
  if (isAIJudgment) {
    const backgroundColor = answer.isJudgment ? "bg-yellow-100" : "bg-white";
    return (
      <Card className={`w-[200px] h-[150px] flex flex-col justify-center items-center bg-white ${backgroundColor} p-4`}>
        <span className="text-black text-xl font-bold">
          {answer.user.name}
        </span>
        <p className="text-black mt-2">
          {answer.content ? answer.content : "回答なし"}
        </p>
      </Card>
    );
  } else {
    return (
      <>
        {isPlayer ? (
          <PlayerForm userId={userId} answerId={answer.id} />
        ) : (
          <Card className="w-[200px] h-[100px] flex justify-center items-center bg-slate-500">
            <span className="text-white text-xl font-bold">
              {answer.user.name}
            </span>
          </Card>
        )}
      </>
    );
  }
};

export default PlayerCard;
