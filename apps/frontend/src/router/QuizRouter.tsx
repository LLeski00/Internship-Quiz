import { routes } from "@/constants/routes";
import MainLayout from "@/layouts/MainLayout";
import {
    HomePage,
    LoginPage,
    NotFoundPage,
    QuizCreationPage,
    QuizPage,
    QuizzesPage,
    RegisterPage,
} from "@/pages";
import CategoryCreationPage from "@/pages/CategoryCreationPage/CategoryCreationPage";

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
                        path={routes.CATEGORY_CREATION.path}
                        element={<CategoryCreationPage />}
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
