import { useQuiz } from "@/hooks/useQuiz";
import { Answer } from "@/types/answer";
import { FC } from "react";
import styles from "./AnswersMultipleChoice.module.css";

interface AnswersMultipleChoiceProps {
    answers: Answer[];
}

const AnswersMultipleChoice: FC<AnswersMultipleChoiceProps> = ({ answers }) => {
    const { handleAnswer } = useQuiz();

    return (
        <>
            <div className={styles.answers}>
                {answers.map((a) => (
                    <p
                        key={a.id}
                        onClick={() => handleAnswer(a.text)}
                        className={styles.answer}
                    >
                        {a.text}
                    </p>
                ))}
            </div>
        </>
    );
};

export default AnswersMultipleChoice;
