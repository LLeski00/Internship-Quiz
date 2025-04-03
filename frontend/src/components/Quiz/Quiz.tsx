import { Question } from "@/components";
import { Button } from "@mui/material";
import QuizResult from "../QuizResult/QuizResult";
import { useQuiz } from "@/hooks/useQuiz";
import { useTimer } from "@/hooks/useTimer";
import { useEffect } from "react";

const Quiz = () => {
    const { quiz, isQuizDone, points, questionCounter, handleNextQuestion } =
        useQuiz();
    const { timer, startTimer } = useTimer();
    const numOfQuestions: number =
        quiz && quiz.questions ? quiz.questions.length : 0;

    useEffect(() => {
        startTimer();
    }, []);

    return (
        <>
            {isQuizDone ? (
                <QuizResult />
            ) : (
                <>
                    <div className="quizHeader">
                        <p>
                            {timer.minutes} : {timer.seconds}
                        </p>
                        <p>
                            {questionCounter} / {numOfQuestions}
                        </p>
                        <p>
                            {points} / {questionCounter}
                        </p>
                    </div>
                    <Question />
                    <Button variant="contained" onClick={handleNextQuestion}>
                        Next
                    </Button>
                </>
            )}
        </>
    );
};

export default Quiz;
