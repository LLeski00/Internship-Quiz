import { FC, PropsWithChildren, useEffect, useState } from "react";
import { QuizContext } from "./QuizContext";
import { QuizDetails } from "@/types";
import { Question } from "@/types/question";
import { Answer, AnswerReq } from "@/types/answer";

export const QuizProvider: FC<PropsWithChildren> = ({ children }) => {
    const [quiz, setQuiz] = useState<QuizDetails | null>(null);
    const [questionCounter, setQuestionCounter] = useState<number>(1);
    const [isQuizDone, setIsQuizDone] = useState<boolean>(false);
    const [isQuizStarted, setIsQuizStarted] = useState<boolean>(false);
    const [points, setPoints] = useState<number>(0);
    const [userAnswer, setUserAnswer] = useState<string | null>(null);
    const [currentQuestion, setCurrentQuestion] = useState<Question | null>(
        null
    );

    useEffect(() => {
        if (quiz) clearQuizData();
    }, [quiz]);

    const handleNextQuestion = () => {
        if (quiz) {
            setCurrentQuestion(quiz?.questions[questionCounter]);
            setQuestionCounter((prev) => prev + 1);
            setUserAnswer(null);
        }
    };

    const handleAnswer = (answer: string) => {
        if (userAnswer) return;

        setUserAnswer(answer);
        const correctAnswer = currentQuestion?.answers.find((a) => a.isCorrect);

        if (answer === correctAnswer?.text)
            setPoints((prev: number) => prev + 1);
    };

    const clearQuizData = () => {
        if (!quiz) return;

        setQuestionCounter(1);
        setIsQuizDone(false);
        setIsQuizStarted(false);
        setPoints(0);
        setUserAnswer(null);
        setCurrentQuestion(quiz.questions[0]);
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
                isQuizStarted,
                setIsQuizStarted,
                points,
                setPoints,
                userAnswer,
                setUserAnswer,
                currentQuestion,
                setCurrentQuestion,
                handleNextQuestion,
                handleAnswer,
                clearQuizData,
            }}
        >
            {children}
        </QuizContext.Provider>
    );
};
