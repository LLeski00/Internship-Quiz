import { Quiz } from "@/types";
import { getData } from "@/utils/fetchUtils";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

const useQuizzes = (searchValue: string | null) => {
    const QUIZ_API_URL = "/quiz";

    const {
        data: quizzes,
        isLoading,
        error,
    } = useQuery<Quiz[], AxiosError>({
        queryKey: ["quizzes", searchValue],
        queryFn: () =>
            getData(
                searchValue
                    ? `${QUIZ_API_URL}?search=${searchValue}`
                    : QUIZ_API_URL
            ),
    });

    return { quizzes, isLoading, error };
};

export default useQuizzes;
