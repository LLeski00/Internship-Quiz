import { Answers } from "@/components";
import { useQuiz } from "@/hooks";
import styles from "./Question.module.css";

const Question = () => {
    const { currentQuestion } = useQuiz();

    return (
        <>
            {currentQuestion && (
                <div className={styles.question}>
                    <h3>{currentQuestion.text}</h3>
                    <Answers />
                </div>
            )}
        </>
    );
};

export default Question;
