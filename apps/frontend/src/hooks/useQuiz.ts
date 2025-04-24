import { useContext } from "react";
import { QuizContext, QuizContextType } from "@/contexts";

export const useQuiz = (): QuizContextType => {
    const context = useContext(QuizContext);

    if (!context) {
        throw new Error("useQuiz must be used within a QuizProvider");
    }

    return context;
};
