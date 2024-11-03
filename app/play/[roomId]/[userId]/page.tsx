import DisplayTopic from "@/components/display-topic";
import PlayerCard from "@/components/player-card";
import { getAnswersByRoomIdAndQuestionId } from "@/data/answers";
import { getLatestQuestion } from "@/data/questions";
import JudgmentButton from "@/components/judgment-button";
import { getRoomByRoomId } from "@/data/rooms";

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
  const room = await getRoomByRoomId(roomId)

  /** ChatGPTにお題を生成してもらうAPIを叩くいてQuestinoテーブルからお題を取得する */
  const question = await getLatestQuestion();
  if (question) {
    const answers = await getAnswersByRoomIdAndQuestionId(roomId, question.id);

    console.log(`initialAnswers: ${answers}`);

    return (
      <main className="flex flex-col w-full h-full justify-center items-center">
        <DisplayTopic content={question.content} />
        <div className="grid grid-rows-2 grid-cols-5 gap-x-8 gap-y-10 mt-8">
          {answers ? (
            answers.map((answers) => {
              const isPlayer = answers.userId === userId;

              return (
                <PlayerCard
                  key={answers.id}
                  isPlayer={isPlayer}
                  userId={userId}
                  answer={answers}
                />
              );
            })
          ) : (
            <div>情報を取得できませんでした</div>
          )}
        </div>
        {/** ホストユーザーのみアクセス可能にする */}
        {userId === room?.hostId && (
          <JudgmentButton roomId={roomId} questionId={question.id} />
        )}
      </main>
    );
  } else {
    <main className="flex flex-col w-full h-full justify-center items-center">
      エラーが発生しました！
    </main>;
  }
};

export default PlayRoomIdAndUserIdPage;
