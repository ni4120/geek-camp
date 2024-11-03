"use client"

import axios from "axios";
import { Button } from "./ui/button";

interface ResultButtonProps {
    roomId: string
    questionId: string
}

const JudgmentButton = ({
    roomId,
    questionId
}: ResultButtonProps) => {

    const handleResult = async () => {
        try {
            await axios.post("/api/result", {
                roomId: roomId,
                questionId: questionId
            })
        } catch {

        }
    }

    return (
        <Button
            onClick={handleResult}
            variant="outline"
        >
            判定
        </Button>
    );
}
 
export default JudgmentButton;