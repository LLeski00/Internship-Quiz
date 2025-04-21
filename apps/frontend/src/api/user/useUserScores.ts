import { ResponseError } from "@/types/error";
import { UserDetails } from "@/types/user";
import { getData } from "@/utils/fetchUtils";
import { AxiosError } from "axios";
import { useEffect, useState } from "react";

const useUserScores = () => {
    const USER_SCORES_API_URL = "/user/scores";
    const [userScores, setUserScores] = useState<UserDetails[] | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        getCategories();
    }, []);

    async function getCategories() {
        const res: UserDetails[] | AxiosError = await getData<UserDetails[]>(
            USER_SCORES_API_URL
        );

        if (res instanceof AxiosError)
            if (res.response?.data) {
                const responseData = res.response?.data as ResponseError;
                setError(`Error: ${res.status} - ${responseData.message}`);
            } else setError(`Error: ${res.status} - ${res.message}`);
        else {
            setUserScores(res);
            setError(null);
        }

        setIsLoading(false);
    }

    return { userScores, isLoading, error };
};

export default useUserScores;
