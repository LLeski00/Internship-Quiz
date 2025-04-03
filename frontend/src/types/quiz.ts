import { Category } from "@/types";
import { Question } from "./question";

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
};

export { Quiz, QuizDetails };
