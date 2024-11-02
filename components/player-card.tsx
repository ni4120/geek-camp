"use client";

import { Card } from "@/components/ui/card";
import PlayerForm from "./player-form";

interface PlayerCardProps {
  isPlayer: boolean;
  name: string;
}

interface PlayerCardProps {
  isPlayer: boolean;
  userId: string;
  name: string;
}

const PlayerCard = ({
  isPlayer,
  userId,
  name,
}: PlayerCardProps) => {

  return (
    <>
      {isPlayer ? (
        <PlayerForm userId={userId}/>
      ) : (
        <Card className="w-[200px] h-[100px] flex justify-center items-center bg-slate-500">
          <span className="text-white text-xl font-bold">{name}</span>
        </Card>
      )}
    </>
  )
};

export default PlayerCard;
