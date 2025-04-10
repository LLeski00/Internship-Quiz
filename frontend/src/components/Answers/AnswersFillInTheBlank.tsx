import { useQuiz } from "@/hooks/useQuiz";
import { Button, TextField } from "@mui/material";
import { useRef, useState } from "react";
import styles from "./AnswersFillInTheBlank.module.css";

const AnswersFillInTheBlank = () => {
    const { handleAnswer, userAnswer, feedbackMessage, correctAnswer } =
        useQuiz();
    const answer = useRef<string>("");
    const [correctAnswerMessage, setCorrectAnswerMessage] = useState<
        string | null
    >(null);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        answer.current = e.target.value;
    };

    function checkAnswer() {
        handleAnswer(answer.current);
        if (answer.current !== correctAnswer?.text)
            setCorrectAnswerMessage(
                "The correct answer was " + correctAnswer?.text
            );
    }

    return (
        <div className={styles.answer}>
            <TextField
                onChange={handleChange}
                placeholder="Answer..."
                className={styles.answerInput}
            />
            {!userAnswer && (
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
