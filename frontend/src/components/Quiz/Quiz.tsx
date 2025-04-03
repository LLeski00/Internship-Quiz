import { QuizDetails } from "@/types";
import { Question as QuestionInterface } from "@/types/question";
import { FC, useCallback, useEffect, useState } from "react";
import Timer from "../Timer/Timer";
import { Question } from "@/components";
import { Button } from "@mui/material";
import QuizResult from "../QuizResult/QuizResult";

interface QuizProps {
    quiz: QuizDetails;
}

const Quiz: FC<QuizProps> = ({ quiz }) => {
    const numOfQuestions = quiz.questions.length;
    const [currentQuestion, setCurrentQuestion] = useState<QuestionInterface>(
        quiz.questions[0]
    );
    const [points, setPoints] = useState<number>(0);
    const [questionCounter, setQuestionCounter] = useState<number>(1);
    const [timer, setTimer] = useState({
        minutes: 0,
        seconds: 0,
    });
    const [isQuizDone, setIsQuizDone] = useState<boolean>(false);

    const getNextQuestion = useCallback(() => {
        if (questionCounter + 1 >= numOfQuestions) {
            setIsQuizDone(true);
            return;
        }

        setCurrentQuestion(quiz.questions[questionCounter]);
        setQuestionCounter((prev) => prev + 1);
    }, []);

    return (
        <>
            {isQuizDone ? (
                <QuizResult
                    points={points}
                    numOfQuestions={numOfQuestions}
                    timer={timer}
                />
            ) : (
                <>
                    <div className="quizHeader">
                        <Timer timer={timer} setTimer={setTimer} />
                        <p>
                            {questionCounter} / {numOfQuestions}
                        </p>
                        <p>
                            {points} / {questionCounter}
                        </p>
                    </div>
                    <Question
                        question={currentQuestion}
                        setPoints={setPoints}
                    />
                    <Button variant="contained" onClick={getNextQuestion}>
                        Next
                    </Button>
                </>
            )}
        </>
    );
};

export default Quiz;
