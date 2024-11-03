"use client";

import { useRouter } from "next/navigation";

interface DisplayTopicProps {
  content: string;
}

const DisplayTopic = ({ content }: DisplayTopicProps) => {
  const router = useRouter();

  return (
    <div className="mr-4 text-3xl font-bold">
      お題
      <span className="ml-4 text-2xl">{content}</span>
    </div>
  );
};

export default DisplayTopic;
