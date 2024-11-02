"use client";

import { useRouter } from "next/navigation";
import { Button } from "./ui/button";

interface InRoomButtonProps {
  userId: string;
  roomId: string;
}
const InRoomButton = ({ userId, roomId }: InRoomButtonProps) => {
  const router = useRouter();
  const handleInRoom = () => {
    router.push(`/entrance/${roomId}/${userId}`);
  };
  return (
    <Button variant="outline" onClick={handleInRoom} className="px-10">
      入室
    </Button>
  );
};

export default InRoomButton;
