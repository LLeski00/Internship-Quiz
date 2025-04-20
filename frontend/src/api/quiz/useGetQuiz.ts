import { QuizDetails } from "@/types";
import { ResponseError } from "@/types/error";
import { getData } from "@/utils/fetchUtils";
import { AxiosError } from "axios";
import { useEffect, useState } from "react";

const useGetQuiz = (quizId: string | undefined) => {
    const QUIZ_API_URL = import.meta.env.VITE_QUIZ_API_URL + "/quiz";
    const [quiz, setQuiz] = useState<QuizDetails | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (quizId) getQuiz();
    }, [quizId]);

    async function getQuiz() {
        setIsLoading(true);
        const apiUrl = QUIZ_API_URL + "/" + quizId;
        const res: QuizDetails | AxiosError = await getData(apiUrl);

        if (res instanceof AxiosError)
            if (res.response?.data) {
                const responseData = res.response?.data as ResponseError;
                setError(`Error: ${res.status} - ${responseData.message}`);
            } else setError(`Error: ${res.status} - ${res.message}`);
        else {
            setQuiz(res);
            setError(null);
        }
        setIsLoading(false);
    }

    return { quiz, isLoading, error };
};

export default useGetQuiz;
