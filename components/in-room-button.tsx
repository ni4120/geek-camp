"use client";

import { useRouter } from "next/navigation";
import { Button } from "./ui/button";

const InRoomButton = () => {
  const router = useRouter();
  const handleInRoom = () => {
    router.push("http://localhost:3000/entrance/{room_id}?u_id={user_id}");
  };
  return (
    <Button variant="outline" onClick={handleInRoom} className="px-10">
      入室
    </Button>
  );
};

export default InRoomButton;
