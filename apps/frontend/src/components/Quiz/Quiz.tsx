import { Question, QuizResult } from "@/components";
import { Button } from "@mui/material";
import { useQuiz, useTimer } from "@/hooks";
import { useEffect } from "react";
import styles from "./Quiz.module.css";
import { QuizStatus } from "@/types";

const Quiz = () => {
    const {
        quiz,
        clearQuizData,
        quizStatus,
        setQuizStatus,
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
        setQuizStatus(QuizStatus.DONE);
    }

    function quizCleanup() {
        clearQuizData();
        resetTimer();
    }

    return (
        <>
            {quizStatus === QuizStatus.DONE ? (
                <QuizResult />
            ) : (
                <div className={styles.quiz}>
                    <div className={styles.quizHeader}>
                        <p>Timer</p>
                        <p>Question</p>
                        <p>Score</p>
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
                    {userAnswer !== null &&
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
                </div>
            )}
        </>
    );
};

export default Quiz;
