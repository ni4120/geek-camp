import InRoomButton from "@/components/in-room-button";
import ShareUrlForm from "@/components/share-url-form";
import { getRoomByRoomId } from "@/data/rooms";

interface ShareUrlPageProps {
  params: {
    roomId: string;
  }
}

const ShareUrlPage = async ({
  params
}: ShareUrlPageProps) => {
  const { roomId } = await params
  const room = await getRoomByRoomId(roomId)
  return (
    <main className="flex flex-col h-full justify-center items-center gap-y-10">
      <h2 className="text-3xl font-bold">部屋のURLを共有しましょう</h2>
      <ShareUrlForm url={room?.sharedUrl!} />
      <InRoomButton />
    </main>
  );
};

export default ShareUrlPage;
