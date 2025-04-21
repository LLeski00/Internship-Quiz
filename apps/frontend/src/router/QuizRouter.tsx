import { routes } from "@/constants/routes";
import { AdminLayout, PublicLayout, UserLayout } from "@/layouts";
import {
    HomePage,
    LoginPage,
    NotFoundPage,
    QuizCreationPage,
    QuizPage,
    QuizzesPage,
    RegisterPage,
    CategoryCreationPage,
    UserScoresPage,
} from "@/pages";
import { BrowserRouter, Route, Routes } from "react-router-dom";

const QuizRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<PublicLayout />}>
                    <Route path={routes.HOME.path} element={<HomePage />} />
                    <Route
                        path={routes.QUIZZES.path}
                        element={<QuizzesPage />}
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

                <Route element={<UserLayout />}>
                    <Route path={routes.QUIZ.path} element={<QuizPage />} />
                </Route>

                <Route path="/admin" element={<AdminLayout />}>
                    <Route
                        path={routes.QUIZ_CREATION.path}
                        element={<QuizCreationPage />}
                    />
                    <Route
                        path={routes.CATEGORY_CREATION.path}
                        element={<CategoryCreationPage />}
                    />
                    <Route
                        path={routes.USER_SCORES.path}
                        element={<UserScoresPage />}
                    />
                </Route>
            </Routes>
        </BrowserRouter>
    );
};

export default QuizRouter;
