import { QuizFilter, QuizList } from "@/components";
import { Category, Quiz } from "@/types";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import styles from "./QuizzesPage.module.css";
import useQuizzes from "@/api/quiz/useQuizzes";

const QuizzesPage = () => {
    const [searchParams] = useSearchParams();
    const searchValue: string | null = searchParams.get("search");
    const { quizzes, isLoading, error } = useQuizzes(searchValue);
    const [filter, setFitler] = useState<Category | null>(null);

    return (
        <div className={styles.quizzesPage}>
            {error ? (
                <p>{error}</p>
            ) : (
                <>
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
                    {isLoading && <p>Loading...</p>}
                </>
            )}
        </div>
    );
};

export default QuizzesPage;
