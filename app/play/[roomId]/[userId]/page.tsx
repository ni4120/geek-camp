import DisplayTopic from "@/components/display-topic";
import PlayerCard from "@/components/player-card";
import { getLatestQuestion } from "@/data/questions";

interface PlayRoomAndUserIdPageProps {
  params: {
    roomId: string;
    userId: string;
  };
}

const PlayRoomIdAndUserIdPage = async ({
  params,
}: PlayRoomAndUserIdPageProps) => {
  const { userId, roomId } = await params;
  console.log(`userId: ${userId}`);
  console.log(`roomId: ${roomId}`);

  /** RoomUsersテーブルからRoomに参加しているユーザ情報を取得 */
  const participants = [
    { id: "nskdfnkashdofhiaoodf", name: "Alice" },
    { id: "nosdbfjahsdfia", name: "Bob" },
    { id: "hdfhaosdhifhaosjdfiohd", name: "Charlie" },
    { id: "nodfnokashdofhsoadhfj", name: "David" },
    { id: "jodhfgjhsdojfbjsbodf", name: "Eve" },
    { id: "njdnfjosdnjofhdo", name: "Frank" },
    { id: "kdhfokshdikfhdohfkdsj", name: "Grace" },
    { id: "dofhjoshdfjhdsoifjodh", name: "Hannah" },
    { id: "jdfhgjdhighsjdfhgijshd", name: "Ivy" },
  ];

  /** ChatGPTにお題を生成してもらうAPIを叩くいてQuestinoテーブルからお題を取得する */
  const question = await getLatestQuestion();

  /** Ansersテーブルから、Roomにいるユーザの回答情報を取得する */

  return (
    <main className="flex flex-col w-full h-full justify-center items-center">
      <DisplayTopic question={question} />
      <div className="grid grid-rows-2 grid-cols-5 gap-x-8 gap-y-10 mt-8">
        {participants.map((participant) => {
          const isPlayer = participant.id === userId;

          return (
            <PlayerCard
              key={participant.id}
              isPlayer={isPlayer}
              userId={userId}
              name={participant.name}
            />
          );
        })}
      </div>
    </main>
  );
};

export default PlayRoomIdAndUserIdPage;
