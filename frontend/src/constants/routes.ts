import { Routes } from "@/types/route";

const routes: Routes = {
    HOME: {
        path: "/",
        name: "Home page",
    },
    QUIZZES: {
        path: "/quizzes",
        name: "Quizzes page",
    },
    QUIZ: {
        path: "/quiz/:id",
        name: "Quiz page",
    },
    QUIZ_CREATION: {
        path: "/quiz-creation",
        name: "Quiz creation page",
    },
    REGISTER: {
        path: "/register",
        name: "Register page",
    },
    LOGIN: {
        path: "/login",
        name: "Login page",
    },
    NOT_FOUND: {
        path: "*",
        name: "Not found page",
    },
};

export { routes };
