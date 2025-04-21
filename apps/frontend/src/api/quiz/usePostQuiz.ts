import { QuizReq } from "@/types";
import { postData } from "@/utils/fetchUtils";
import { useState } from "react";
import { AxiosError } from "axios";
import { ResponseError } from "@/types/error";

const usePostQuiz = () => {
    const QUIZ_API_URL = "/quiz";
    const [response, setResponse] = useState<any | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    async function createQuiz(newQuiz: QuizReq) {
        const apiUrl = QUIZ_API_URL;
        const res = await postData(apiUrl, newQuiz);

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

    return { createQuiz, response, isLoading, error };
};

export default usePostQuiz;
