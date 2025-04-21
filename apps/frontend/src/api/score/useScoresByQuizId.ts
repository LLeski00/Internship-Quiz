import { ResponseError } from "@/types/error";
import { UserScore } from "@/types/score";
import { getData } from "@/utils/fetchUtils";
import { AxiosError } from "axios";
import { useEffect, useState } from "react";

const useScoresByQuizId = (quizId: string) => {
    const SCORE_API_URL = import.meta.env.VITE_QUIZ_API_URL + "/score";
    const [scores, setScores] = useState<UserScore[] | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        getScoresByQuizId();
    }, [quizId]);

    async function getScoresByQuizId() {
        const apiUrl = SCORE_API_URL + "?quizId=" + quizId;
        const res: UserScore[] | AxiosError = await getData(apiUrl);

        if (res instanceof AxiosError)
            if (res.response?.data) {
                const responseData = res.response?.data as ResponseError;
                setError(`Error: ${res.status} - ${responseData.message}`);
            } else setError(`Error: ${res.status} - ${res.message}`);
        else {
            setScores(res);
            setError(null);
        }

        setIsLoading(false);
    }

    return { scores, isLoading, error };
};

export default useScoresByQuizId;
