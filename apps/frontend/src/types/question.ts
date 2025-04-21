import { Answer, AnswerReq } from "./answer";

type Question = {
    id: string;
    quizId: string;
    text: string;
    type: QuestionType;
    answers: Answer[];
};

type QuestionReq = {
    text: string;
    type: QuestionType;
    answers: AnswerReq[];
};

enum QuestionType {
    MULTIPLE_CHOICE = "MULTIPLE_CHOICE",
    FILL_IN_THE_BLANK = "FILL_IN_THE_BLANK",
    TRUE_FALSE = "TRUE_FALSE",
}

export { Question, QuestionType, QuestionReq };
