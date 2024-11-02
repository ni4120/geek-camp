import UserForm from "@/components/user-form";

const GuestRoomIdPage = async ({ params }: { params: { roomId: string } }) => {
  /** TODO: roomIdから部屋の名前を取得する処理 */
  console.log(params);
  const { roomId } = await params;
  return (
    <main className="flex h-full justify-center items-center">
      <div className="flex flex-col items-center justify-center space-y-14">
        <h2 className="text-3xl font-bold text-center">
          <span>{"[部屋の名前]"}</span>部屋に招待されました
        </h2>
        <UserForm roomId={roomId} />
      </div>
    </main>
  );
};

export default GuestRoomIdPage;
