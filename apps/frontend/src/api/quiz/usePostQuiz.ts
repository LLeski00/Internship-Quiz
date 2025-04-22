import { QuizReq } from "@/types";
import { postData } from "@/utils/fetchUtils";
import { AxiosError } from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { extractAxiosError } from "@/utils/errorUtils";
import { useNavigate } from "react-router-dom";
import { routes } from "@/constants/routes";

const usePostQuiz = () => {
    const QUIZ_API_URL = "/quiz";
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    const { mutate, isPending } = useMutation<any, AxiosError, QuizReq>({
        mutationFn: (newQuiz: QuizReq) => postData(QUIZ_API_URL, newQuiz),
        onSuccess: () => {
            toast.success("Quiz successfully created");
            queryClient.invalidateQueries({ queryKey: ["quizzes"] });
            navigate(routes.QUIZZES.path);
        },
        onError: (error) => {
            toast.error(extractAxiosError(error));
        },
    });

    return { addQuiz: mutate, isPending };
};

export default usePostQuiz;
