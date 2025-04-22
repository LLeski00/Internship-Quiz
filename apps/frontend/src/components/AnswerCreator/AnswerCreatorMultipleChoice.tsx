import { AnswerReq } from "@/types/answer";
import { Button, Checkbox, TextField } from "@mui/material";
import { FC, useRef } from "react";
import styles from "./AnswerCreatorMultipleChoice.module.css";
import toast from "react-hot-toast";

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
        if (currentAnswer.current.text === "") {
            toast.error("The answer is empty!");
            return;
        }

        if (answers.some((a) => a.text === currentAnswer.current.text)) {
            toast.error("The answer already exists!");
            return;
        }

        setAnswers((prev: AnswerReq[]) => [
            ...prev,
            { ...currentAnswer.current },
        ]);
    }

    return (
        <>
            {answers &&
                answers.map((a) => (
                    <p key={a.text} className={styles.newAnswer}>
                        {a.text} Is correct : {a.isCorrect.toString()}
                    </p>
                ))}
            <div className={styles.multipleChoice}>
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
            </div>
        </>
    );
};

export default AnswerCreatorMultipleChoice;
