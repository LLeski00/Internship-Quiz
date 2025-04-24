import { CategoryReq } from "@/types";
import { extractAxiosError, postData } from "@/utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import toast from "react-hot-toast";

const usePostCategory = () => {
    const CATEGORY_API_URL = "/category";
    const queryClient = useQueryClient();

    const { mutate, isPending } = useMutation<any, AxiosError, CategoryReq>({
        mutationFn: (newCategory: CategoryReq) =>
            postData(CATEGORY_API_URL, newCategory),
        onSuccess: () => {
            toast.success("Category successfully created");
            queryClient.invalidateQueries({ queryKey: ["categories"] });
        },
        onError: (error) => {
            toast.error(extractAxiosError(error));
        },
    });

    return { addCategory: mutate, isPending };
};

export default usePostCategory;
