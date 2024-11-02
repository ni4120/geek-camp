import RoomForm from "@/components/room-form";
// import { useRouter } from "next/navigation";

const UserIdPage = async ({ params }: { params: { userId: string } }) => {
  /** ホストユーザーのみアクセス可能にする処理が必要 */
  console.log(params);
  const { userId } = await params;
  console.log(`userId: ${userId}`);
  return (
    <main className="flex h-full justify-center items-center">
      <div className="flex flex-col items-center justify-center space-y-14">
        <h2 className="text-3xl font-bold text-center">
          大喜利部屋を作成しましょう
        </h2>
        <RoomForm userId={userId} />
      </div>
    </main>
  );
};

export default UserIdPage;
