import InRoomButton from "@/components/in-room-button";
import ShareUrlForm from "@/components/share-url-form";
import { getRoomByRoomId } from "@/data/rooms";

interface ShareUrlPageProps {
  params: {
    userId: string;
    roomId: string;
  };
}

const ShareUrlPage = async ({ params }: ShareUrlPageProps) => {
  const { userId, roomId } = await params;
  const room = await getRoomByRoomId(roomId);

  if (!room || !room.sharedUrl) {
    return (
      <main className="flex flex-col h-full justify-center items-center gap-y-10">
        <h2 className="text-3xl font-bold">部屋の情報が見つかりません</h2>
      </main>
    );
  }

  return (
    <main className="flex flex-col h-full justify-center items-center gap-y-10">
      <h2 className="text-3xl font-bold">部屋のURLを共有しましょう</h2>
      <ShareUrlForm url={room.sharedUrl} />
      <InRoomButton userId={userId} roomId={roomId} />
    </main>
  );
};

export default ShareUrlPage;
