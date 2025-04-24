import { Category } from "@/types";
import { getData } from "@/utils";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

const useCategories = () => {
    const CATEGORY_API_URL = "/category";

    const {
        data: categories,
        isLoading,
        error,
    } = useQuery<Category[], AxiosError>({
        queryKey: ["categories"],
        queryFn: () => getData(CATEGORY_API_URL),
    });

    return { categories, isLoading, error };
};

export default useCategories;
