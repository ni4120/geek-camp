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
}

const PlayerCard = ({ isPlayer, userId, answer }: PlayerCardProps) => {
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
};

export default PlayerCard;
