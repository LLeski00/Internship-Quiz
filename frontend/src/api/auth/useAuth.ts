import { JwtResponse, LoginData, RegisterData } from "@/types";
import { ResponseError } from "@/types/error";
import { postData } from "@/utils/fetchUtils";
import { AxiosError } from "axios";
import { useState } from "react";

const useAuth = () => {
    const AUTH_API_URL = import.meta.env.VITE_QUIZ_API_URL + "/auth";
    const [jwt, setJwt] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    async function registerUser(registerData: RegisterData) {
        setIsLoading(true);
        const apiUrl = AUTH_API_URL + "/register";
        const res: JwtResponse | AxiosError = await postData<
            RegisterData,
            JwtResponse
        >(apiUrl, registerData);

        if (res instanceof AxiosError)
            if (res.response?.data) {
                const responseData = res.response?.data as ResponseError;
                setError(`Error: ${res.status} - ${responseData.message}`);
            } else setError(`Error: ${res.status} - ${res.message}`);
        else {
            setJwt(res.token);
            setError(null);
        }

        setIsLoading(false);
    }

    async function loginUser(loginData: LoginData) {
        setIsLoading(true);
        const apiUrl = AUTH_API_URL + "/login";
        const res: JwtResponse | AxiosError = await postData<
            LoginData,
            JwtResponse
        >(apiUrl, loginData);
        if (res instanceof AxiosError) {
            if (res.response?.data) {
                const responseData = res.response?.data as ResponseError;
                setError(`Error: ${res.status} - ${responseData.message}`);
            } else setError(`Error: ${res.status} - ${res.message}`);
        } else {
            setJwt(res.token);
            setError(null);
        }

        setIsLoading(false);
    }

    return { registerUser, loginUser, jwt, isLoading, error };
};

export default useAuth;
