import { Category } from "@/types";
import { Question } from "./question";
import { Score } from "./score";

type Quiz = {
    id: string;
    title: string;
    category: Category;
};

type QuizDetails = {
    id: string;
    title: string;
    category: Category;
    questions: Question[];
    scores: Score[];
};

export { Quiz, QuizDetails };
