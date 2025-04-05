import { useQuiz } from "@/hooks/useQuiz";
import { useTimer } from "@/hooks/useTimer";
import { saveScore } from "@/services/scoreApi";
import { PointsReq } from "@/types/points";
import { getUserId } from "@/utils";
import { getRanking } from "@/utils/scoreUtils";
import { Button } from "@mui/material";
import { useEffect } from "react";

const QuizResult = () => {
    const { quiz, points, clearQuizData } = useQuiz();
    const numOfQuestions: number = quiz?.questions.length ?? 0;
    const { timer, resetTimer } = useTimer();
    const score = (points / numOfQuestions) * 100;
    const newScore: PointsReq = createNewScore();
    const ranking = getRanking(quiz?.scores, newScore);

    useEffect(() => {
        saveScore(newScore, localStorage.getItem("jwt"));
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

    return (
        <div className="quiz-results">
            <h2>Result: {score}%</h2>
            <h3>Ranking: {ranking}</h3>
            <p>
                Time: {timer.minutes} : {timer.seconds}
            </p>
            <Button variant="contained" onClick={() => tryAgain()}>
                Try again
            </Button>
        </div>
    );
};

export default QuizResult;
