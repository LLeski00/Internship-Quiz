import { QuizFilter, QuizList } from "@/components";
import { Category } from "@/types";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import styles from "./QuizzesPage.module.css";
import { useCategories, useQuizzes } from "@/api";
import LoadingSpinner from "@/components/LoadingSpinner/LoadingSpinner";

const QuizzesPage = () => {
    const [searchParams] = useSearchParams();
    const searchValue: string | null = searchParams.get("search");
    const {
        quizzes,
        isLoading: areQuizzesLoading,
        error: quizzesError,
    } = useQuizzes(searchValue);
    const {
        categories,
        isLoading: areCategoriesLoading,
        error: categoriesError,
    } = useCategories();
    const [filter, setFitler] = useState<Category | null>(null);

    return (
        <div className={styles.quizzesPage}>
            {quizzesError || categoriesError ? (
                <>
                    {quizzesError && <p>{quizzesError}</p>}
                    {categoriesError && <p>{categoriesError}</p>}
                </>
            ) : (
                <>
                    {quizzes && categories && (
                        <>
                            <QuizFilter
                                filter={filter}
                                setFilter={setFitler}
                                categories={categories}
                            />
                            <QuizList quizzes={quizzes} filter={filter} />
                        </>
                    )}
                </>
            )}
            {(areQuizzesLoading || areCategoriesLoading) && <LoadingSpinner />}
        </div>
    );
};

export default QuizzesPage;
