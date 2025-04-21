import { useQuiz } from "@/hooks/useQuiz";
import { useTimer } from "@/hooks/useTimer";
import { PointsReq } from "@/types/points";
import { getUserId, isAdmin } from "@/utils";
import { getRanking, sortUserScores } from "@/utils/scoreUtils";
import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import styles from "./QuizResult.module.css";
import { UserScore } from "@/types/score";
import { useScores, usePostScore } from "@/api";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";

const QuizResult = () => {
    const { quiz, points, clearQuizData } = useQuiz();
    const { timer, resetTimer } = useTimer();
    const newScore: PointsReq = createNewScore();
    const {
        saveScore,
        isLoading: isPostLoading,
        error: postError,
    } = usePostScore();
    const scoresData = isAdmin() ? useScores(quiz?.id ?? "") : null;
    const numOfQuestions: number = quiz?.questions.length ?? 0;
    const score = (points / numOfQuestions) * 100;
    const ranking = getRanking(quiz?.scores, newScore);
    const [leaderboard, setLeaderboard] = useState<UserScore[] | null>(null);

    useEffect(() => {
        saveScore(newScore);
    }, []);

    useEffect(() => {
        getUserScores();
    }, [scoresData?.scores]);

    function tryAgain() {
        clearQuizData();
        resetTimer();
    }

    function createNewScore() {
        const newScore: PointsReq = {
            points,
            time: timer.minutes * 60 + timer.seconds,
            quizId: quiz?.id ?? "",
            userId: getUserId() ?? "",
        };
        return newScore;
    }

    async function getUserScores() {
        if (!scoresData?.scores) return;
        const sortedScores = sortUserScores(scoresData?.scores);
        setLeaderboard(sortedScores);
    }

    return (
        <>
            {isPostLoading && (
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
            {scoresData?.isLoading && (
                <>
                    <p>Loading leaderboard...</p>
                    <LoadingSpinner />
                </>
            )}
            {leaderboard && (
                <>
                    <div className={styles.leaderboard}>
                        <h3>Leaderboard</h3>
                        {leaderboard.map((s) => (
                            <p key={s.id}>
                                Points: {s.points} Time: {s.time}s -{" "}
                                {s.user.email}
                            </p>
                        ))}
                    </div>
                </>
            )}
            {scoresData && scoresData.error && <p>{scoresData.error}</p>}
            {postError && <p style={{ color: "red" }}>{postError}</p>}
        </>
    );
};

export default QuizResult;
