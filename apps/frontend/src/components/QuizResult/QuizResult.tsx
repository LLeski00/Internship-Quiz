import { useQuiz, useTimer } from "@/hooks";
import { ScoreReq } from "@/types";
import { getUserId, getRanking } from "@/utils";
import { Button } from "@mui/material";
import { useEffect } from "react";
import styles from "./QuizResult.module.css";
import { usePostScore } from "@/api";
import { LoadingSpinner } from "@/components";

const QuizResult = () => {
    const { quiz, points, clearQuizData } = useQuiz();
    const { timer, resetTimer } = useTimer();
    const numOfQuestions: number = quiz?.questions.length ?? 0;
    const score = (points / numOfQuestions) * 100;
    const newScore: ScoreReq = createNewScore();
    const { saveScore, isPending } = usePostScore();
    const ranking = getRanking(quiz?.scores, newScore);

    useEffect(() => {
        saveScore(newScore);
    }, []);

    function tryAgain() {
        clearQuizData();
        resetTimer();
    }

    function createNewScore() {
        const newScore: ScoreReq = {
            score,
            time: timer.minutes * 60 + timer.seconds,
            quizId: quiz?.id ?? "",
            userId: getUserId() ?? "",
        };
        return newScore;
    }

    return (
        <>
            {isPending && (
                <>
                    <p>Saving score...</p>
                    <LoadingSpinner />
                </>
            )}
            <div className={styles.quizResult}>
                <h2>Ranking: {ranking}</h2>
                <h3>Result: {score.toFixed(2)}%</h3>
                <p>
                    Time: {timer.minutes} : {timer.seconds}
                </p>
                <Button variant="contained" onClick={tryAgain}>
                    Try again
                </Button>
            </div>
        </>
    );
};

export default QuizResult;
