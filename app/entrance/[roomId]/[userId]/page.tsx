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
  const room = await getRoomByRoomId(roomId)
  return (
    <main className="flex h-full justify-center items-center">
      <Entrance roomId={roomId} userId={userId} room={room} />
    </main>
  );
};

export default EntranceRoomIdAndUserIdPage;
