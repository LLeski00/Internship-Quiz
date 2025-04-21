import { Category } from "@/types";
import { ResponseError } from "@/types/error";
import { getData } from "@/utils/fetchUtils";
import { AxiosError } from "axios";
import { useEffect, useState } from "react";

const useCategories = () => {
    const CATEGORY_API_URL = "/category";
    const [categories, setCategories] = useState<Category[] | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        getCategories();
    }, []);

    async function getCategories() {
        const res: Category[] | AxiosError = await getData<Category[]>(
            CATEGORY_API_URL
        );

        if (res instanceof AxiosError)
            if (res.response?.data) {
                const responseData = res.response?.data as ResponseError;
                setError(`Error: ${res.status} - ${responseData.message}`);
            } else setError(`Error: ${res.status} - ${res.message}`);
        else {
            setCategories(res);
            setError(null);
        }

        setIsLoading(false);
    }

    return { categories, isLoading, error };
};

export default useCategories;
