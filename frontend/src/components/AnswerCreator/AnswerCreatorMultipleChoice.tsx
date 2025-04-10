import { AnswerReq } from "@/types/answer";
import { Button, Checkbox, TextField } from "@mui/material";
import { FC, useRef, useState } from "react";
import styles from "./AnswerCreatorMultipleChoice.module.css";

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
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
        currentAnswer.current.text = e.target.value;
    }

    function handleCorrectChange(e: React.ChangeEvent<HTMLInputElement>) {
        currentAnswer.current.isCorrect = e.target.checked;
    }

    function addAnswer() {
        if (currentAnswer.current.text === "") {
            setErrorMessage("The answer is empty!");
            return;
        }

        setAnswers((prev: AnswerReq[]) => [
            ...prev,
            { ...currentAnswer.current },
        ]);
        if (errorMessage) setErrorMessage(null);
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
                {errorMessage && (
                    <p style={{ color: "red" }} className={styles.errorMessage}>
                        {errorMessage}
                    </p>
                )}
            </div>
        </>
    );
};

export default AnswerCreatorMultipleChoice;
