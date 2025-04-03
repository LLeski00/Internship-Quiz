import { PointsReq } from "@/types/points";

const SCORE_API_URL = import.meta.env.VITE_QUIZ_API_URL + "/score";

async function postScore(apiUrl: string, pointsReq: PointsReq) {
    try {
        const response = await fetch(apiUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(pointsReq),
        });

        if (!response.ok)
            throw new Error(`Response status: ${response.status}`);

        const res = await response.json();
        return res;
    } catch (error) {
        console.error((error as Error).message);
        return null;
    }
}

async function saveScore(pointsReq: PointsReq) {
    const apiUrl = SCORE_API_URL;
    const res = await postScore(apiUrl, pointsReq);
    return res;
}

export { saveScore };
