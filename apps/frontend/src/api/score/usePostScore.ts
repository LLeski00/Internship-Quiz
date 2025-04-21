import { PointsReq } from "@/types/points";
import { postData } from "@/utils/fetchUtils";
import { useState } from "react";
import { AxiosError } from "axios";
import { ResponseError } from "@/types/error";

const usePostScore = () => {
    const SCORE_API_URL = import.meta.env.VITE_QUIZ_API_URL + "/score";
    const [response, setResponse] = useState<any | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    async function saveScore(pointsReq: PointsReq) {
        const apiUrl = SCORE_API_URL;
        const res = await postData(apiUrl, pointsReq);

        if (res instanceof AxiosError)
            if (res.response?.data) {
                const responseData = res.response?.data as ResponseError;
                setError(`Error: ${res.status} - ${responseData.message}`);
            } else setError(`Error: ${res.status} - ${res.message}`);
        else {
            setResponse(res);
            setError(null);
        }

        setIsLoading(false);
    }

    return { saveScore, response, isLoading, error };
};

export default usePostScore;
