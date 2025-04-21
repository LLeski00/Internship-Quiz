import { CategoryReq } from "@/types";
import { ResponseError } from "@/types/error";
import { postData } from "@/utils/fetchUtils";
import { AxiosError } from "axios";
import { useState } from "react";

const usePostCategory = () => {
    const CATEGORY_API_URL = import.meta.env.VITE_QUIZ_API_URL + "/category";
    const [response, setResponse] = useState<any | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    async function createCategory(newCategory: CategoryReq) {
        setIsLoading(true);
        const apiUrl = CATEGORY_API_URL;
        const res = await postData(apiUrl, newCategory);

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

    return { createCategory, response, isLoading, error };
};

export default usePostCategory;
