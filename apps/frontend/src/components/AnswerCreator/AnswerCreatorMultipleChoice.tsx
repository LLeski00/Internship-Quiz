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

        if (
            currentAnswer.current.isCorrect &&
            answers.some((a) => a.isCorrect)
        ) {
            toast.error("There can only be one correct answer!");
            return;
        }

        setAnswers((prev: AnswerReq[]) => [
            ...prev,
            { ...currentAnswer.current },
        ]);
    }

    return (
        <div className={styles.answerCreator}>
            {answers?.length > 0 && (
                <>
                    <h3>Current question answers:</h3>
                    {answers.map((a) => (
                        <p key={a.text} className={styles.newAnswer}>
                            {a.text} {a.isCorrect && "✅"}
                        </p>
                    ))}
                </>
            )}
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
        </div>
    );
};

export default AnswerCreatorMultipleChoice;
