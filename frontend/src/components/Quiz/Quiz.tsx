import { Question } from "@/components";
import { Button } from "@mui/material";
import QuizResult from "../QuizResult/QuizResult";
import { useQuiz } from "@/hooks/useQuiz";
import { useTimer } from "@/hooks/useTimer";
import { useEffect } from "react";

const Quiz = () => {
    const {
        quiz,
        clearQuizData,
        isQuizDone,
        setIsQuizDone,
        points,
        questionCounter,
        handleNextQuestion,
        userAnswer,
    } = useQuiz();
    const { timer, startTimer, stopTimer, resetTimer } = useTimer();
    const numOfQuestions: number =
        quiz && quiz.questions ? quiz.questions.length : 0;
    const isLastQuestion = questionCounter === numOfQuestions;

    useEffect(() => {
        startTimer();
        return () => quizCleanup();
    }, []);

    function endQuiz() {
        stopTimer();
        setIsQuizDone(true);
    }

    function quizCleanup() {
        clearQuizData();
        resetTimer();
    }

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
                    {userAnswer &&
                        (isLastQuestion ? (
                            <Button variant="contained" onClick={endQuiz}>
                                Finish
                            </Button>
                        ) : (
                            <Button
                                variant="contained"
                                onClick={handleNextQuestion}
                            >
                                Next
                            </Button>
                        ))}
                </>
            )}
        </>
    );
};

export default Quiz;
