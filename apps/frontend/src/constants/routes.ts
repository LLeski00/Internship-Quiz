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
        path: "/admin/quiz-creation",
        name: "Quiz creation page",
    },
    CATEGORY_CREATION: {
        path: "/admin/category-creation",
        name: "Quiz category creation page",
    },
    ADMIN_DASHBOARD: {
        path: "/admin/dashboard",
        name: "User scores page",
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
