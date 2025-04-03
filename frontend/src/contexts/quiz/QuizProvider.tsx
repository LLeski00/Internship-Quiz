import { FC, PropsWithChildren, useEffect, useState } from "react";
import { QuizContext } from "./QuizContext";
import { QuizDetails } from "@/types";
import { Question } from "@/types/question";
import { Answer } from "@/types/answer";

export const QuizProvider: FC<PropsWithChildren> = ({ children }) => {
    const [quiz, setQuiz] = useState<QuizDetails | null>(null);
    const [questionCounter, setQuestionCounter] = useState<number>(1);
    const [isQuizDone, setIsQuizDone] = useState<boolean>(false);
    const [points, setPoints] = useState<number>(0);
    const [userAnswer, setUserAnswer] = useState<Answer | null>(null);
    const [currentQuestion, setCurrentQuestion] = useState<Question | null>(
        null
    );

    useEffect(() => {
        if (quiz && quiz.questions) setCurrentQuestion(quiz.questions[0]);
    }, [quiz]);

    const handleNextQuestion = () => {
        if (quiz) {
            setCurrentQuestion(quiz?.questions[questionCounter]);
            setQuestionCounter((prev) => prev + 1);
        }
    };

    return (
        <QuizContext.Provider
            value={{
                quiz,
                setQuiz,
                questionCounter,
                setQuestionCounter,
                isQuizDone,
                setIsQuizDone,
                points,
                setPoints,
                userAnswer,
                setUserAnswer,
                currentQuestion,
                setCurrentQuestion,
                handleNextQuestion,
            }}
        >
            {children}
        </QuizContext.Provider>
    );
};
