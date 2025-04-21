import { TextField } from "@mui/material";
import { FC } from "react";

interface AnswerCreatorFillInTheBlankProps {
    setAnswers: Function;
}

const AnswerCreatorFillInTheBlank: FC<AnswerCreatorFillInTheBlankProps> = ({
    setAnswers,
}) => {
    function handleFillInTheBlankAnswer(
        e: React.ChangeEvent<HTMLInputElement>
    ) {
        setAnswers([{ isCorrect: true, text: e.target.value }]);
    }

    return (
        <TextField
            label="Answer"
            placeholder="Answer"
            onChange={handleFillInTheBlankAnswer}
            required
        />
    );
};

export default AnswerCreatorFillInTheBlank;
