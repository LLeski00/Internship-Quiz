import { useQuiz } from "@/hooks/useQuiz";
import { Answer } from "@/types/answer";
import { FC, useRef, useState } from "react";
import styles from "./AnswersMultipleChoice.module.css";

interface AnswersMultipleChoiceProps {
    answers: Answer[];
}

const AnswersMultipleChoice: FC<AnswersMultipleChoiceProps> = ({ answers }) => {
    const { handleAnswer } = useQuiz();
    const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null);
    const correctAnswerRef = useRef<HTMLParagraphElement | null>(null);

    function checkAnswer(
        answer: string,
        e: React.MouseEvent<HTMLParagraphElement, MouseEvent>
    ) {
        const res = handleAnswer(answer);

        if (correctAnswerRef.current)
            correctAnswerRef.current.style.borderColor = "green";

        if (res.isCorrect) setFeedbackMessage("Correct");
        else {
            setFeedbackMessage("Incorrect");
            e.currentTarget.style.borderColor = "red";
        }
    }

    return (
        <div className={styles.answers}>
            {answers.map((a) => (
                <p
                    key={a.id}
                    onClick={(e) => checkAnswer(a.text, e)}
                    className={styles.answer}
                    ref={a.isCorrect ? correctAnswerRef : null}
                >
                    {a.text}
                </p>
            ))}
            {feedbackMessage && (
                <p
                    style={{
                        color: feedbackMessage === "Correct" ? "green" : "red",
                    }}
                >
                    {feedbackMessage}
                </p>
            )}
        </div>
    );
};

export default AnswersMultipleChoice;
