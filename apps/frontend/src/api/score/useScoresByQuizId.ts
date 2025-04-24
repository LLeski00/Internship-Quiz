import { UserScore } from "@/types";
import { getData } from "@/utils";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

const useScoresByQuizId = (quizId: string) => {
    const SCORE_API_URL = "/score";

    const {
        data: scores,
        isLoading,
        error,
    } = useQuery<UserScore[], AxiosError>({
        queryKey: ["scores"],
        queryFn: () => getData(SCORE_API_URL + "?quizId=" + quizId),
    });

    return { scores, isLoading, error };
};

export default useScoresByQuizId;
