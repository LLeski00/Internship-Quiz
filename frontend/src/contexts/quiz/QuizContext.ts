import { QuizDetails } from "@/types";
import { Answer } from "@/types/answer";
import { Question } from "@/types/question";
import { createContext } from "react";

export interface QuizContextType {
    quiz: QuizDetails | null;
    setQuiz: React.Dispatch<React.SetStateAction<QuizDetails | null>>;
    questionCounter: number;
    setQuestionCounter: React.Dispatch<React.SetStateAction<number>>;
    isQuizDone: boolean;
    setIsQuizDone: React.Dispatch<React.SetStateAction<boolean>>;
    isQuizStarted: boolean;
    setIsQuizStarted: React.Dispatch<React.SetStateAction<boolean>>;
    points: number;
    setPoints: React.Dispatch<React.SetStateAction<number>>;
    userAnswer: string | null;
    setUserAnswer: React.Dispatch<React.SetStateAction<string | null>>;
    currentQuestion: Question | null;
    setCurrentQuestion: React.Dispatch<React.SetStateAction<Question | null>>;
    handleNextQuestion: () => void;
    handleAnswer: (answer: string) => {
        isCorrect: boolean;
        correctAnswer: string;
    };
    clearQuizData: () => void;
}

export const QuizContext = createContext<QuizContextType | undefined>(
    undefined
);
