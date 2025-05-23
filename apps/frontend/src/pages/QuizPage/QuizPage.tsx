import { useParams } from "react-router-dom";
import styles from "./QuizPage.module.css";
import { useEffect } from "react";
import { Button } from "@mui/material";
import { Quiz, LoadingSpinner } from "@/components";
import { useQuiz } from "@/hooks";
import { useGetQuiz } from "@/api";
import { QuizStatus } from "@/types";
import { extractAxiosError, getCategoryImage } from "@/utils";

const QuizPage = () => {
    const { id } = useParams<{ id: string }>();
    const { quiz: fetchedQuiz, isLoading, error } = useGetQuiz(id);
    const { quiz, setQuiz, quizStatus, setQuizStatus } = useQuiz();

    useEffect(() => {
        return () => {
            setQuiz(null);
        };
    }, [id]);

    useEffect(() => {
        if (fetchedQuiz) setQuiz(fetchedQuiz);
    }, [fetchedQuiz]);

    return (
        <div
            className={styles.quizPage}
            style={
                quiz?.category &&
                ({
                    "--bg-image": `url(${getCategoryImage(quiz.category)})`,
                } as React.CSSProperties)
            }
        >
            {error ? (
                <p>{extractAxiosError(error)}</p>
            ) : (
                <>
                    {quiz &&
                        (quizStatus === QuizStatus.READY ? (
                            <div className={styles.quizInfo}>
                                <h1>{quiz.title}</h1>
                                <p>Category: {quiz.category.name}</p>
                                <p>
                                    Number of questions: {quiz.questions.length}
                                </p>
                                <Button
                                    variant="contained"
                                    onClick={() =>
                                        setQuizStatus(QuizStatus.ONGOING)
                                    }
                                >
                                    Start quiz
                                </Button>
                            </div>
                        ) : (
                            <Quiz />
                        ))}
                </>
            )}
            {isLoading && <LoadingSpinner />}
        </div>
    );
};

export default QuizPage;
