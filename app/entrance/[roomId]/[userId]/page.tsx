import Entrance from "@/components/entrance";
import { getRoomByRoomId } from "@/data/rooms";

interface EntranceRoomIdPageProps {
  params: {
    userId: string;
    roomId: string;
  };
}

const EntranceRoomIdAndUserIdPage = async ({
  params,
}: EntranceRoomIdPageProps) => {
  /** paramsから`roomId`と`userId`を取得 */
  const { roomId, userId } = await params;
  const room = await getRoomByRoomId(roomId);

  if (!room) {
    return (
      <main className="flex flex-col h-full justify-center items-center gap-y-10">
        <h2 className="text-3xl font-bold">部屋の情報が見つかりません</h2>
      </main>
    );
  }
  return (
    <main className="flex h-full justify-center items-center">
      <Entrance roomId={roomId} userId={userId} room={room} />
    </main>
  );
};

export default EntranceRoomIdAndUserIdPage;
