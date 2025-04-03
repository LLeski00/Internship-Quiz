import { useQuiz } from "@/hooks/useQuiz";
import { useTimer } from "@/hooks/useTimer";

const QuizResult = () => {
    const { quiz, points } = useQuiz();
    const numOfQuestions: number = quiz?.questions.length ?? 0;
    const { timer } = useTimer();

    const score = (points / numOfQuestions) * 100;

    return (
        <div className="quiz-results">
            <p>Result: {score}%</p>
            <p>
                Time: {timer.minutes} : {timer.seconds}
            </p>
        </div>
    );
};

export default QuizResult;
