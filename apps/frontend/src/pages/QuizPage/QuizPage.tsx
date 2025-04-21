import { useParams } from "react-router-dom";
import styles from "./QuizPage.module.css";
import { useEffect } from "react";
import { Button } from "@mui/material";
import { Quiz } from "@/components";
import { useQuiz } from "@/hooks/useQuiz";
import { useGetQuiz } from "@/api";
import LoadingSpinner from "@/components/LoadingSpinner/LoadingSpinner";

const QuizPage = () => {
    const { id } = useParams<{ id: string }>();
    const { quiz: fetchedQuiz, isLoading, error } = useGetQuiz(id);
    const { quiz, setQuiz, isQuizStarted, setIsQuizStarted } = useQuiz();

    useEffect(() => {
        return () => {
            setQuiz(null);
        };
    }, [id]);

    useEffect(() => {
        if (fetchedQuiz) setQuiz(fetchedQuiz);
    }, [fetchedQuiz]);

    return (
        <div className={styles.quizPage}>
            {error ? (
                <p>{error}</p>
            ) : (
                <>
                    {quiz &&
                        (isQuizStarted ? (
                            <Quiz />
                        ) : (
                            <div className={styles.quizInfo}>
                                <h1>{quiz.title}</h1>
                                <p>Category: {quiz.category.name}</p>
                                <p>
                                    Number of questions: {quiz.questions.length}
                                </p>
                                <Button
                                    variant="contained"
                                    onClick={() => setIsQuizStarted(true)}
                                >
                                    Start quiz
                                </Button>
                            </div>
                        ))}
                </>
            )}
            {isLoading && <LoadingSpinner />}
        </div>
    );
};

export default QuizPage;
