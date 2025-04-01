import { routes } from "@/constants/routes";
import MainLayout from "@/layouts/MainLayout";
import HomePage from "@/pages/HomePage/HomePage";
import LoginPage from "@/pages/LoginPage/LoginPage";
import NotFoundPage from "@/pages/NotFoundPage/NotFoundPage";
import QuizCreationPage from "@/pages/QuizCreationPage/QuizCreationPage";
import QuizPage from "@/pages/QuizPage/QuizPage";
import QuizzesPage from "@/pages/QuizzesPage/QuizzesPage";
import RegisterPage from "@/pages/RegisterPage/RegisterPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";

const QuizRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<MainLayout />}>
                    <Route path={routes.HOME.path} element={<HomePage />} />
                    <Route
                        path={routes.QUIZZES.path}
                        element={<QuizzesPage />}
                    />
                    <Route path={routes.QUIZ.path} element={<QuizPage />} />
                    <Route
                        path={routes.QUIZ_CREATION.path}
                        element={<QuizCreationPage />}
                    />
                    <Route
                        path={routes.REGISTER.path}
                        element={<RegisterPage />}
                    />
                    <Route path={routes.LOGIN.path} element={<LoginPage />} />
                    <Route
                        path={routes.NOT_FOUND.path}
                        element={<NotFoundPage />}
                    />
                </Route>
            </Routes>
        </BrowserRouter>
    );
};

export default QuizRouter;
