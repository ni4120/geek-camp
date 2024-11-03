import { db } from "@/lib/db"

export enum SortOrder {
  ASC = "asc",
  DESC = "desc",
}

export const getRoomUsersByRoomId = async (roomId: string, orderBy?: SortOrder, limit?: number) => {
  try {
    const roomUsers = await db.roomUsers.findMany({
      where: {
        roomId: roomId,
      },
      ...(orderBy ? { orderBy: { created_at: orderBy } } : {}),
      ...(limit ? { take: limit } : {}),
      select: {
        userId: true,
        user: {
          select: {
            name: true,
          },
        },
      },
    });

    return roomUsers
  }
  catch {
    return null
  }
}
