import { Answer } from "./answer";

type Question = {
    id: string;
    quizId: string;
    text: string;
    type: QuestionType;
    answers: Answer[];
};

enum QuestionType {
    MULTIPLE_CHOICE = "MULTIPLE_CHOICE",
    FILL_IN_THE_BLANK = "FILL_IN_THE_BLANK",
    TRUE_FALSE = "TRUE_FALSE",
}

export { Question, QuestionType };
