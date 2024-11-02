import { db } from "@/lib/db";

export const getRoomByRoomId = (roomId: string) => {
  try {
    const room = db.rooms.findFirst({
      where: {
        id: roomId,
      },
    });
    return room;
  } catch {
    return null;
  }
};
