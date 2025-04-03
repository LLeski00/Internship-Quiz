import { Timer } from "@/types/timer";
import { FC } from "react";

interface QuizResultProps {
    points: number;
    numOfQuestions: number;
    timer: Timer;
}

const QuizResult: FC<QuizResultProps> = ({ points, numOfQuestions, timer }) => {
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
