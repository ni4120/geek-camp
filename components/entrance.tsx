"use client";

import { SortOrder } from "@/app/api/roomUsers/route";
import { supabase } from "@/lib/supabaseClient";
import axios from "axios";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

interface EntranceProps {
  roomId: string;
  userId: string;
  room: Room;
}

interface RoomUsers {
  userId: string;
  roomId: string;
  user: {
    name: string;
  };
}

interface Room {
  id: string;
  hostId: string;
  name: string;
  sharedUrl: string;
  status: string;
}

const Entrance = ({ roomId, userId, room }: EntranceProps) => {
  const router = useRouter();
  const [participants, setParticipants] = useState<RoomUsers[]>([]);

  const handleEntrance = async () => {
    try {
      const questionResponse = await axios.post("/api/questions");
      await axios.post("/api/answers", {
        roomUsers: participants,
        roomId: roomId,
        questionId: questionResponse.data.id,
      });

      await axios.patch(`/api/rooms/${roomId}`, {
        status: "IN_PROGRESS",
      });
    } catch (error) {
      console.log("Error joining game room:", error);
    }
  };

  useEffect(() => {
    const fetchRoomUsers = async () => {
      try {
        const response = await axios.get("/api/roomUsers", {
          params: {
            roomId: roomId,
            orderBy: SortOrder.ASC,
            limit: 10,
          },
        });
        const roomUsers = response.data;
        setParticipants(roomUsers || []);
      } catch (error) {
        console.log(error);
      }
    };
    fetchRoomUsers();

    const roomUsersChannel = supabase
      .channel(`realtime: RoomUsers`)
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "RoomUsers" },
        (payload) => {
          console.log("Change received!", payload);
          if (payload.new.id === roomId) {
            fetchRoomUsers();
          }
        },
      )
      .subscribe();

    const roomsChannel = supabase
      .channel("realtime: Rooms")
      .on(
        "postgres_changes",
        { event: "UPDATE", schema: "public", table: "Rooms" },
        (payload) => {
          console.log("Change received!", payload);
          if (payload.new.id === roomId && payload.new.status === "IN_PROGRESS") {
            router.push(`/play/${roomId}/${userId}`);
          }
        },
      )
      .subscribe();

    return () => {
      supabase.removeChannel(roomUsersChannel);
      supabase.removeChannel(roomsChannel);
    };
  }, [supabase]);
  console.log(participants);

  const participantNum = participants.length;
  return (
    <div className="flex flex-col space-y-10">
      <h2 className="text-3xl font-bold">{`${room.name}部屋です`}</h2>
      <div className="w-full flex flex-col justify-center items-center">
        <h3 className="text-2xl font-semibold mb-4">参加者</h3>
        <div>{participantNum}/10</div>
      </div>
      {/* 参加者リストの表示 */}
      <div className="grid grid-cols-2 gap-4">
        {participants.map((participant) => (
          <div key={participant.userId} className="border p-2 text-center">
            {participant.user.name}
          </div>
        ))}
      </div>
      {room.hostId === userId && (
        <Button onClick={handleEntrance} variant="outline">
          開始
        </Button>
      )}
    </div>
  );
};

export default Entrance;
