import { useQuiz } from "@/hooks/useQuiz";
import { useTimer } from "@/hooks/useTimer";
import { ScoreReq } from "@/types/score";
import { getUserId } from "@/utils";
import { getRanking } from "@/utils/scoreUtils";
import { Button } from "@mui/material";
import { useEffect } from "react";
import styles from "./QuizResult.module.css";
import { usePostScore } from "@/api";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";

const QuizResult = () => {
    const { quiz, points, clearQuizData } = useQuiz();
    const { timer, resetTimer } = useTimer();
    const newScore: ScoreReq = createNewScore();
    const { saveScore, isPending } = usePostScore();
    const numOfQuestions: number = quiz?.questions.length ?? 0;
    const score = (points / numOfQuestions) * 100;
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
                <h2>Result: {score.toFixed(2)}%</h2>
                <h3>Ranking: {ranking}</h3>
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
