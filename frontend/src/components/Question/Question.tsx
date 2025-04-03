import { Answers } from "@/components";
import { useQuiz } from "@/hooks/useQuiz";

const Question = () => {
    const { currentQuestion } = useQuiz();

    return (
        <>
            {currentQuestion && (
                <div className="question">
                    <h3>{currentQuestion.text}</h3>
                    <Answers />
                </div>
            )}
        </>
    );
};

export default Question;
