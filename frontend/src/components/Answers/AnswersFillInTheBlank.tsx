import { Answer } from "@/types/answer";
import { TextField } from "@mui/material";
import { FC } from "react";

interface AnswersFillInTheBlankProps {
    answers: Answer[];
}

const AnswersFillInTheBlank: FC<AnswersFillInTheBlankProps> = ({ answers }) => {
    return (
        <>
            <div className="answersFillInTheBlank">
                <TextField />
            </div>
        </>
    );
};

export default AnswersFillInTheBlank;
