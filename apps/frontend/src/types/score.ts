import { Quiz } from "./quiz";
import { User } from "./user";

type Score = {
    id: string;
    userId: string;
    quizId: string;
    time: number;
    points: number;
};

type UserScore = {
    id: string;
    user: User;
    quiz: Quiz;
    time: number;
    points: number;
};

export { Score, UserScore };
