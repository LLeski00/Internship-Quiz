import { Category } from "@/types";
import { Question, QuestionReq } from "./question";
import { Score } from "./score";

type Quiz = {
    title: string;
    category: Category;
};

type QuizReq = {
    title: string;
    categoryId: string;
    questions: QuestionReq[];
};

type QuizDetails = {
    id: string;
    title: string;
    category: Category;
    questions: Question[];
    scores: Score[];
};

enum QuizStatus {
    READY = "READY",
    ONGOING = "ONGOING",
    DONE = "DONE",
}

export { Quiz, QuizDetails, QuizReq, QuizStatus };
