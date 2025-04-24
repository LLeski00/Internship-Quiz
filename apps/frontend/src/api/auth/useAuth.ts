import { useMutation, useQueryClient } from "@tanstack/react-query";
import { JwtResponse, LoginData, RegisterData } from "@/types";
import { postData, extractAxiosError } from "@/utils";
import { AxiosError } from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { routes } from "@/constants";

export const useAuth = () => {
    const AUTH_API_URL = "/auth";
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const { mutate: loginUser, isPending: isLoginPending } = useMutation<
        JwtResponse,
        AxiosError,
        LoginData
    >({
        mutationFn: (loginData: LoginData) =>
            postData<LoginData, JwtResponse>(
                `${AUTH_API_URL}/login`,
                loginData
            ),
        onSuccess: (data) => {
            localStorage.setItem("jwt", data.token);
            navigate(routes.HOME.path);
            toast.success("Successfully logged in");
            queryClient.invalidateQueries({ queryKey: ["users"] });
        },
        onError: (error) => {
            toast.error(extractAxiosError(error));
        },
    });

    const { mutate: registerUser, isPending: isRegisterPending } = useMutation<
        JwtResponse,
        AxiosError,
        RegisterData
    >({
        mutationFn: (registerData: RegisterData) =>
            postData<RegisterData, JwtResponse>(
                `${AUTH_API_URL}/register`,
                registerData
            ),
        onSuccess: (data) => {
            localStorage.setItem("jwt", data.token);
            navigate(routes.HOME.path);
            toast.success("Successfully registered");
        },
        onError: (error) => {
            toast.error(extractAxiosError(error));
        },
    });

    return {
        loginUser,
        isLoginPending,
        registerUser,
        isRegisterPending,
    };
};

export default useAuth;
