import { Quiz } from "@/types";
import { ResponseError } from "@/types/error";
import { getData } from "@/utils/fetchUtils";
import { AxiosError } from "axios";
import { useEffect, useState } from "react";

const useQuizzes = (searchValue: string | null) => {
    const QUIZ_API_URL = import.meta.env.VITE_QUIZ_API_URL + "/quiz";
    const [quizzes, setQuizzes] = useState<Quiz[] | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        getQuizzes(searchValue);
    }, [searchValue]);

    async function getQuizzes(searchValue: string | null) {
        setIsLoading(true);
        const apiUrl = searchValue
            ? `${QUIZ_API_URL}?search=${searchValue}`
            : QUIZ_API_URL;
        const res: Quiz[] | AxiosError = await getData(apiUrl);

        if (res instanceof AxiosError)
            if (res.response?.data) {
                const responseData = res.response?.data as ResponseError;
                setError(`Error: ${res.status} - ${responseData.message}`);
            } else setError(`Error: ${res.status} - ${res.message}`);
        else {
            setQuizzes(res);
            setError(null);
        }

        setIsLoading(false);
    }

    return { quizzes, isLoading, error };
};

export default useQuizzes;
