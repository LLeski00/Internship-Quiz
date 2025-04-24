import { QuizDetails, QuizStatus, Answer, Question } from "@/types";
import { createContext } from "react";

export interface QuizContextType {
    quiz: QuizDetails | null;
    setQuiz: React.Dispatch<React.SetStateAction<QuizDetails | null>>;
    questionCounter: number;
    setQuestionCounter: React.Dispatch<React.SetStateAction<number>>;
    quizStatus: QuizStatus | null;
    setQuizStatus: React.Dispatch<React.SetStateAction<QuizStatus | null>>;
    points: number;
    setPoints: React.Dispatch<React.SetStateAction<number>>;
    userAnswer: string | null;
    setUserAnswer: React.Dispatch<React.SetStateAction<string | null>>;
    currentQuestion: Question | null;
    setCurrentQuestion: React.Dispatch<React.SetStateAction<Question | null>>;
    handleNextQuestion: () => void;
    handleAnswer: (answer: string) => void;
    clearQuizData: () => void;
    feedbackMessage: string | null;
    setFeedbackMessage: React.Dispatch<React.SetStateAction<string | null>>;
    correctAnswer: Answer | null;
    correctAnswerMessage: string | null;
    setCorrectAnswerMessage: React.Dispatch<
        React.SetStateAction<string | null>
    >;
}

export const QuizContext = createContext<QuizContextType | undefined>(
    undefined
);
