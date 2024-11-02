"use client";

import { useRouter } from "next/navigation";

interface DisplayTopicProps {
  question: {
    id: string;
    content: string;
    createdAt: Date;
  } | null;
}

const DisplayTopic = ({ question }: DisplayTopicProps) => {
  const router = useRouter();
  if (!question) {
    router.push("/");
  } else {
    return (
      <div className="mr-4 text-3xl font-bold">
        お題
        <span className="ml-4 text-2xl">
          {question.content
            ? question.content
            : "お題を取得できませんでした..."}
        </span>
      </div>
    );
  }
};

export default DisplayTopic;
