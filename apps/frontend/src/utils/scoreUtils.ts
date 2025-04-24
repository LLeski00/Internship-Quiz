import { ScoreReq, Score, UserScore } from "@/types/score";

function getRanking(
    scores: Score[] | undefined,
    newScoreReq: ScoreReq
): string {
    if (scores === undefined || scores === null) return "unknown";

    const newScore = { ...newScoreReq, id: "" };
    const newScores = [...scores];
    newScores.push(newScore);
    const orderedScores = sortScores(newScores);
    const index = orderedScores.findIndex(
        (score) =>
            score.score === newScore.score && score.time === newScore.time
    );
    return index === -1 ? "-1" : (index + 1).toString();
}

function sortScores(scores: Score[]): Score[] {
    return [...scores].sort((a, b) => {
        if (b.score === a.score) {
            return a.time - b.time;
        }
        return b.score - a.score;
    });
}

function sortUserScores(scores: UserScore[] | undefined): UserScore[] | null {
    if (scores === undefined || scores === null) return null;

    return [...scores].sort((a, b) => {
        if (b.score === a.score) {
            return a.time - b.time;
        }
        return b.score - a.score;
    });
}

export { getRanking, sortUserScores };
