import { Quiz } from "./quiz";
import { User } from "./user";

type Score = {
    id: string;
    userId: string;
    quizId: string;
    time: number;
    score: number;
};

type UserScore = {
    id: string;
    user: User;
    quiz: Quiz;
    time: number;
    score: number;
};

type ScoreReq = {
    userId: string;
    quizId: string;
    time: number;
    score: number;
};

export { Score, UserScore, ScoreReq };
