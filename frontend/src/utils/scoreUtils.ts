import { PointsReq } from "@/types/points";
import { Score } from "@/types/score";

function getRanking(
    scores: Score[] | undefined,
    newScoreReq: PointsReq
): string {
    if (scores === undefined || scores === null) return "unknown";

    const newScore = { ...newScoreReq, id: "" };
    const newScores = [...scores];
    newScores.push(newScore);
    const orderedScores = [...newScores].sort((a, b) => {
        if (b.points === a.points) {
            return a.time - b.time;
        }
        return b.points - a.points;
    });
    const index = orderedScores.findIndex(
        (score) =>
            score.points === newScore.points && score.time === newScore.time
    );
    return index === -1 ? "-1" : (index + 1).toString();
}

export { getRanking };
