import { useNavigate, useParams } from "react-router-dom";
import styles from "./QuizPage.module.css";
import { useEffect, useState } from "react";
import { QuizDetails } from "@/types";
import { isTokenValid } from "@/utils";
import { routes } from "@/constants/routes";
import { getQuiz } from "@/services";
import { Button } from "@mui/material";
import { Quiz } from "@/components";
import { useQuiz } from "@/hooks/useQuiz";

const QuizPage = () => {
    const { id } = useParams<{ id: string }>();
    const { quiz, setQuiz, isQuizStarted, setIsQuizStarted } = useQuiz();
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        loadQuiz();
        return setQuiz(null);
    }, [id]);

    async function loadQuiz() {
        if (!isTokenValid()) {
            navigate(routes.LOGIN.path);
            return;
        }

        const quiz: QuizDetails | null = await getQuiz(
            id,
            localStorage.getItem("jwt")
        );

        if (!quiz) {
            setErrorMessage("There was an issue with fetching the quiz.");
            return;
        }

        setQuiz(quiz);
    }

    return (
        <div className={styles.quizPage}>
            {errorMessage && <p>{errorMessage}</p>}
            {quiz &&
                (isQuizStarted ? (
                    <Quiz />
                ) : (
                    <div className={styles.quizInfo}>
                        <h1>{quiz.title}</h1>
                        <p>Category: {quiz.category.name}</p>
                        <p>Number of questions: {quiz.questions.length}</p>
                        <Button
                            variant="contained"
                            onClick={() => setIsQuizStarted(true)}
                        >
                            Start quiz
                        </Button>
                    </div>
                ))}
        </div>
    );
};

export default QuizPage;
