import { QuizFilter, QuizList } from "@/components";
import { getQuizzes } from "@/services";
import { Category, Quiz } from "@/types";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

const QuizzesPage = () => {
    const [searchParams] = useSearchParams();
    const searchValue: string | null = searchParams.get("search");
    const [quizzes, setQuizzes] = useState<Quiz[] | null>(null);
    const [filter, setFitler] = useState<Category | null>(null);

    useEffect(() => {
        loadQuizzes(searchValue);
    }, []);

    async function loadQuizzes(searchValue: string | null) {
        const quizzes: Quiz[] | null = await getQuizzes(searchValue);

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
