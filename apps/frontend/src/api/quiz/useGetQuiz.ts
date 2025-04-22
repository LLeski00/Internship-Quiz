import { QuizDetails } from "@/types";
import { getData } from "@/utils/fetchUtils";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

const useGetQuiz = (quizId: string | undefined) => {
    const QUIZ_API_URL = "/quiz";

    const {
        data: quiz,
        isLoading,
        error,
    } = useQuery<QuizDetails, AxiosError>({
        queryKey: ["quiz", quizId],
        queryFn: () => getData(QUIZ_API_URL + "/" + quizId),
    });

    return { quiz, isLoading, error };
};

export default useGetQuiz;
