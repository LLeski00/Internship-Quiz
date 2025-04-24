import { useQuiz } from "@/hooks";
import { Button, TextField } from "@mui/material";
import { useState } from "react";
import styles from "./AnswersFillInTheBlank.module.css";

const AnswersFillInTheBlank = () => {
    const { handleAnswer, userAnswer, feedbackMessage, correctAnswerMessage } =
        useQuiz();
    const [answer, setAnswer] = useState<string>("");

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setAnswer(e.target.value);
    };

    function checkAnswer() {
        handleAnswer(answer);
    }

    return (
        <div className={styles.answer}>
            <TextField
                onChange={handleChange}
                value={answer}
                placeholder="Answer..."
                className={styles.answerInput}
            />
            {userAnswer === null && (
                <Button variant="contained" onClick={checkAnswer}>
                    Confirm answer
                </Button>
            )}
            {feedbackMessage && (
                <p
                    style={{
                        color: feedbackMessage === "Correct" ? "green" : "red",
                    }}
                >
                    {feedbackMessage}
                </p>
            )}
            {correctAnswerMessage && <p>{correctAnswerMessage}</p>}
        </div>
    );
};

export default AnswersFillInTheBlank;
