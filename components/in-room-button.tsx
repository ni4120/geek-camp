"use client";

import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import axios from "axios";

interface InRoomButtonProps {
  userId: string;
  roomId: string;
}
const InRoomButton = ({ userId, roomId }: InRoomButtonProps) => {
  const router = useRouter();
  const handleInRoom = async () => {
    try {
      await axios.post("/api/roomUsers", {
        userId: userId,
        roomId: roomId,
      });
      router.push(`/entrance/${roomId}/${userId}`);
    } catch (error) {
      console.error("Error joining room:", error)
    }
  };
  return (
    <Button variant="outline" onClick={handleInRoom} className="px-10">
      入室
    </Button>
  );
};

export default InRoomButton;
