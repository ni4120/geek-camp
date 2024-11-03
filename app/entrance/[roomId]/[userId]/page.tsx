import Entrance from "@/components/entrance";

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
  /** TODO: 部屋に参加しているusers情報をリアルタイムで取得 */
  return (
    <main className="flex h-full justify-center items-center">
      <Entrance roomId={roomId} userId={userId} />
    </main>
  );
};

export default EntranceRoomIdAndUserIdPage;
