import { useQuiz } from "@/hooks/useQuiz";
import { Answer } from "@/types/answer";
import { Button, TextField } from "@mui/material";
import { useRef } from "react";

const AnswersFillInTheBlank = () => {
    const { handleAnswer } = useQuiz();
    const answer = useRef<string>("");

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        answer.current = e.target.value;
    };

    return (
        <>
            <div className="answersFillInTheBlank">
                <TextField onChange={handleChange} placeholder="Answer..." />
                <Button onClick={() => handleAnswer(answer.current)}>
                    Confirm answer
                </Button>
            </div>
        </>
    );
};

export default AnswersFillInTheBlank;
