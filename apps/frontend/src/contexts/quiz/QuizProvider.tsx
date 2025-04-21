import { FC, PropsWithChildren, useEffect, useState } from "react";
import { QuizContext } from "./QuizContext";
import { QuizDetails, QuizStatus } from "@/types";
import { Question } from "@/types/question";
import { Answer } from "@/types/answer";

export const QuizProvider: FC<PropsWithChildren> = ({ children }) => {
    const [quiz, setQuiz] = useState<QuizDetails | null>(null);
    const [questionCounter, setQuestionCounter] = useState<number>(1);
    const [quizStatus, setQuizStatus] = useState<QuizStatus | null>(null);
    const [points, setPoints] = useState<number>(0);
    const [userAnswer, setUserAnswer] = useState<string | null>(null);
    const [currentQuestion, setCurrentQuestion] = useState<Question | null>(
        null
    );
    const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null);
    const [correctAnswerMessage, setCorrectAnswerMessage] = useState<
        string | null
    >(null);
    const [correctAnswer, setCorrectAnswer] = useState<Answer | null>(null);

    useEffect(() => {
        if (quiz) clearQuizData();
    }, [quiz]);

    useEffect(() => {
        if (currentQuestion)
            setCorrectAnswer(
                currentQuestion.answers.find((q) => q.isCorrect) ?? null
            );
    }, [currentQuestion]);

    const handleNextQuestion = () => {
        if (quiz) {
            setCurrentQuestion(quiz.questions[questionCounter]);
            setQuestionCounter((prev) => prev + 1);
            setUserAnswer(null);
            setFeedbackMessage(null);
            setCorrectAnswerMessage(null);
        }
    };

    const handleAnswer = (answer: string) => {
        if (userAnswer) return;

        setUserAnswer(answer);
        const correctAnswer = currentQuestion?.answers.find((a) => a.isCorrect);

        if (answer === correctAnswer?.text) {
            setPoints((prev: number) => prev + 1);
            setFeedbackMessage("Correct");
            return;
        }

        setFeedbackMessage("Incorrect");
        setCorrectAnswerMessage(
            "The correct answer was: " + correctAnswer?.text
        );
    };

    const clearQuizData = () => {
        if (!quiz) return;

        setQuestionCounter(1);
        setQuizStatus(QuizStatus.READY);
        setPoints(0);
        setUserAnswer(null);
        setCurrentQuestion(quiz.questions[0]);
        setCorrectAnswer(null);
        setFeedbackMessage(null);
        setCorrectAnswerMessage(null);
    };

    return (
        <QuizContext.Provider
            value={{
                quiz,
                setQuiz,
                questionCounter,
                setQuestionCounter,
                quizStatus,
                setQuizStatus,
                points,
                setPoints,
                userAnswer,
                setUserAnswer,
                currentQuestion,
                setCurrentQuestion,
                handleNextQuestion,
                handleAnswer,
                clearQuizData,
                feedbackMessage,
                setFeedbackMessage,
                correctAnswer,
                correctAnswerMessage,
                setCorrectAnswerMessage,
            }}
        >
            {children}
        </QuizContext.Provider>
    );
};
