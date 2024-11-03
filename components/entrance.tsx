"use client";

import { SortOrder } from "@/app/api/roomUsers/route";
import { supabase } from "@/lib/supabaseClient";
import axios from "axios";
import { useEffect, useState } from "react";

interface EntranceProps {
  roomId: string;
}

interface roomUsers {
  userId: string;
  user: {
    name: string;
  };
}

const Entrance = ({ roomId }: EntranceProps) => {
  const [participants, setParticipants] = useState<roomUsers[]>([]);

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

    const channel = supabase
      .channel(`realtime: RoomUsers`)
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "RoomUsers" },
        (payload) => {
          console.log("Change received!", payload);

          fetchRoomUsers();
        },
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [supabase]);

  const participantNum = participants.length;
  return (
    <div className="flex flex-col space-y-10">
      <h2 className="text-3xl font-bold">{"[大喜利部屋名]"}部屋です</h2>
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
    </div>
  );
};

export default Entrance;
