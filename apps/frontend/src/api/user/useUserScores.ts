import { UserDetails } from "@/types/user";
import { getData } from "@/utils/fetchUtils";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

const useUserScores = () => {
    const USER_SCORES_API_URL = "/user/scores";

    const {
        data: userScores,
        isLoading,
        error,
    } = useQuery<UserDetails[], AxiosError>({
        queryKey: ["userScores"],
        queryFn: () => getData(USER_SCORES_API_URL),
    });

    return { userScores, isLoading, error };
};

export default useUserScores;
