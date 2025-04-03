import { Answer } from "@/types/answer";
import { TextField } from "@mui/material";
import { FC } from "react";

interface AnswersFillInTheBlankProps {
    answers: Answer[];
    setPoints: React.Dispatch<React.SetStateAction<number>>;
}

const AnswersFillInTheBlank: FC<AnswersFillInTheBlankProps> = ({
    answers,
    setPoints,
}) => {
    return (
        <>
            <div className="answersFillInTheBlank">
                <TextField />
            </div>
        </>
    );
};

export default AnswersFillInTheBlank;
