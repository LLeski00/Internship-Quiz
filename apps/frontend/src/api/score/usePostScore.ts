import { ScoreReq } from "@/types";
import { postData, extractAxiosError } from "@/utils";
import { AxiosError } from "axios";
import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const usePostScore = () => {
    const SCORE_API_URL = "/score";
    const queryClient = useQueryClient();

    const { mutate, isPending } = useMutation<any, AxiosError, ScoreReq>({
        mutationFn: (newScore: ScoreReq) => postData(SCORE_API_URL, newScore),
        onSuccess: () => {
            toast.success("Score successfully saved");
            queryClient.invalidateQueries({ queryKey: ["scores"] });
        },
        onError: (error) => {
            toast.error(extractAxiosError(error));
        },
    });

    return { saveScore: mutate, isPending };
};

export default usePostScore;
