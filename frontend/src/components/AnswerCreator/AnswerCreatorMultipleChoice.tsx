import { AnswerReq } from "@/types/answer";
import { Button, Checkbox, TextField } from "@mui/material";
import { FC, useRef } from "react";

interface AnswerCreatorMultipleChoiceProps {
    answers: AnswerReq[];
    setAnswers: Function;
}

const AnswerCreatorMultipleChoice: FC<AnswerCreatorMultipleChoiceProps> = ({
    answers,
    setAnswers,
}) => {
    const currentAnswer = useRef<AnswerReq>({
        text: "",
        isCorrect: false,
    });

    function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
        currentAnswer.current.text = e.target.value;
    }

    function handleCorrectChange(e: React.ChangeEvent<HTMLInputElement>) {
        currentAnswer.current.isCorrect = e.target.checked;
    }

    function addAnswer() {
        setAnswers((prev: AnswerReq[]) => [
            ...prev,
            { ...currentAnswer.current },
        ]);
    }

    return (
        <>
            {answers &&
                answers.map((a) => (
                    <p key={a.text}>
                        {a.text} Is correct : {a.isCorrect.toString()}
                    </p>
                ))}
            <TextField
                label="Answer"
                placeholder="Answer"
                onChange={handleInputChange}
            />
            <label>
                Is correct?
                <Checkbox onChange={handleCorrectChange} />
            </label>
            <Button onClick={addAnswer} variant="contained" color="success">
                Add answer
            </Button>
        </>
    );
};

export default AnswerCreatorMultipleChoice;
