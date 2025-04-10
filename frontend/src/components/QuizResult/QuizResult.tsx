import { useQuiz } from "@/hooks/useQuiz";
import { useTimer } from "@/hooks/useTimer";
import { getScoresByQuizId, saveScore } from "@/services/scoreApi";
import { PointsReq } from "@/types/points";
import { getUserId, isAdmin } from "@/utils";
import { getRanking, sortUserScores } from "@/utils/scoreUtils";
import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import styles from "./QuizResult.module.css";
import { UserScore } from "@/types/score";

const QuizResult = () => {
    const { quiz, points, clearQuizData } = useQuiz();
    const numOfQuestions: number = quiz?.questions.length ?? 0;
    const { timer, resetTimer } = useTimer();
    const score = (points / numOfQuestions) * 100;
    const newScore: PointsReq = createNewScore();
    const ranking = getRanking(quiz?.scores, newScore);
    const [leaderboard, setLeaderboard] = useState<UserScore[] | null>(null);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    useEffect(() => {
        saveScore(newScore, localStorage.getItem("jwt"));
        if (isAdmin()) getUserScores();
    }, []);

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
        const scores: UserScore[] | null = await getScoresByQuizId(
            quiz?.id ?? ""
        );

        if (!scores) {
            setErrorMessage("There was an issue with fetching the leaderboard");
            return;
        }

        const sortedScores = sortUserScores(scores);
        setLeaderboard(sortedScores);
    }

    return (
        <>
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
            {leaderboard && (
                <div className={styles.leaderboard}>
                    <h3>Leaderboard</h3>
                    {leaderboard.map((s) => (
                        <p key={s.id}>
                            Points: {s.points} Time: {s.time}s - {s.user.email}
                        </p>
                    ))}
                </div>
            )}
        </>
    );
};

export default QuizResult;
