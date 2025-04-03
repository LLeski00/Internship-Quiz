import { QuizFilter, QuizList } from "@/components";
import { routes } from "@/constants/routes";
import { getQuizzes } from "@/services";
import { Category, Quiz } from "@/types";
import { isTokenValid } from "@/utils/jwtUtils";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const QuizzesPage = () => {
    const [searchParams] = useSearchParams();
    const searchValue: string | null = searchParams.get("search");
    const [quizzes, setQuizzes] = useState<Quiz[] | null>(null);
    const [filter, setFitler] = useState<Category | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        loadQuizzes(searchValue);
    }, [searchParams]);

    async function loadQuizzes(searchValue: string | null) {
        if (!isTokenValid()) {
            navigate(routes.LOGIN.path);
            return;
        }

        const quizzes: Quiz[] | null = await getQuizzes(
            searchValue,
            localStorage.getItem("jwt")
        );

        if (!quizzes) {
            console.error("There was an issue with fetching the quizzes.");
            return;
        }

        setQuizzes(quizzes);
    }

    return (
        <div className="quizzesPage">
            {quizzes && (
                <>
                    <QuizFilter
                        quizzes={quizzes}
                        filter={filter}
                        setFilter={setFitler}
                    />
                    <QuizList quizzes={quizzes} filter={filter} />
                </>
            )}
        </div>
    );
};

export default QuizzesPage;
