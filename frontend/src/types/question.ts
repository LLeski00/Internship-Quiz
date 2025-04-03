import { Answer } from "./answer";

type Question = {
    id: string;
    quizId: string;
    text: string;
    type: QuestionType;
    answers: Answer[];
};

enum QuestionType {
    MULTIPLE_CHOICE = "Multiple choice",
    FILL_IN_THE_BLANK = "Fill in the blank",
    MATCHING = "Matching",
    ORDERING = "Ordering",
    SLIDER = "Slider",
}

export { Question, QuestionType };
