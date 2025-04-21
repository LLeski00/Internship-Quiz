import { PointsReq } from "@/types/points";
import { Score, UserScore } from "@/types/score";

function getRanking(
    scores: Score[] | undefined,
    newScoreReq: PointsReq
): string {
    if (scores === undefined || scores === null) return "unknown";

    const newScore = { ...newScoreReq, id: "" };
    const newScores = [...scores];
    newScores.push(newScore);
    const orderedScores = sortScores(newScores);
    const index = orderedScores.findIndex(
        (score) =>
            score.points === newScore.points && score.time === newScore.time
    );
    return index === -1 ? "-1" : (index + 1).toString();
}

function sortScores(scores: Score[]): Score[] {
    return [...scores].sort((a, b) => {
        if (b.points === a.points) {
            return a.time - b.time;
        }
        return b.points - a.points;
    });
}

function sortUserScores(scores: UserScore[] | undefined): UserScore[] | null {
    if (scores === undefined || scores === null) return null;

    return [...scores].sort((a, b) => {
        if (b.points === a.points) {
            return a.time - b.time;
        }
        return b.points - a.points;
    });
}

export { getRanking, sortUserScores };
