import { PointsReq } from "@/types/points";
import { postData } from "@/utils/fetchUtils";
import { AxiosError } from "axios";
import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { extractAxiosError } from "@/utils/errorUtils";

const usePostScore = () => {
    const SCORE_API_URL = "/score";
    const queryClient = useQueryClient();

    const { mutate, isPending } = useMutation<any, AxiosError, PointsReq>({
        mutationFn: (newScore: PointsReq) => postData(SCORE_API_URL, newScore),
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
