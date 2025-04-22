import { ResponseError } from "@/types/error";
import { AxiosError } from "axios";

const extractAxiosError = (error: unknown): string => {
    if (error instanceof AxiosError) {
        const resError = error.response?.data as ResponseError | undefined;
        return (
            resError?.message || error.message || "An unknown error occurred."
        );
    }
    return "An unknown error occurred";
};

export { extractAxiosError };
