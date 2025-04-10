import { useQuiz } from "@/hooks/useQuiz";
import { Button, TextField } from "@mui/material";
import { useRef, useState } from "react";
import styles from "./AnswersFillInTheBlank.module.css";

const AnswersFillInTheBlank = () => {
    const { handleAnswer, userAnswer } = useQuiz();
    const answer = useRef<string>("");
    const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null);
    const [correctAnswerMessage, setCorrectAnswerMessage] = useState<
        string | null
    >(null);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        answer.current = e.target.value;
    };

    function checkAnswer() {
        const res: { isCorrect: boolean; correctAnswer: string } = handleAnswer(
            answer.current
        );
        if (res.isCorrect) setFeedbackMessage("Correct");
        else {
            setFeedbackMessage("Incorrect");
            setCorrectAnswerMessage(
                "The correct answer was " + res.correctAnswer
            );
        }
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
