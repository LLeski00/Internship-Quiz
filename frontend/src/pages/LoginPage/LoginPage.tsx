import { Button, TextField } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import styles from "./LoginPage.module.css";
import { LoginData } from "@/types/auth";
import { Link, useNavigate } from "react-router-dom";
import { routes } from "@/constants/routes";
import useAuth from "@/api/auth/useAuth";

interface FormData {
    email: string;
    password: string;
}

const LoginPage = () => {
    const { loginUser, jwt, isLoading, error } = useAuth();
    const formData = useRef<FormData>({
        email: "",
        password: "",
    });
    const navigate = useNavigate();

    useEffect(() => {
        if (jwt) {
            localStorage.setItem("jwt", jwt);
            navigate(routes.HOME.path);
        }
    }, [jwt]);

    function handleInputChange(
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) {
        formData.current = {
            ...formData.current,
            [e.target.name]: e.target.value,
        };
    }

    async function handleFormSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const loginData: LoginData = {
            email: formData.current.email,
            password: formData.current.password,
        };
        loginUser(loginData);
    }

    return (
        <div>
            <h1 className={styles.loginTitle}>Login</h1>
            <form className={styles.loginForm} onSubmit={handleFormSubmit}>
                <TextField
                    label="Email"
                    variant="outlined"
                    name="email"
                    onChange={handleInputChange}
                    placeholder="Email"
                    required
                />
                <TextField
                    type="password"
                    label="Password"
                    variant="outlined"
                    name="password"
                    onChange={handleInputChange}
                    placeholder="Password"
                    required
                />
                <Button variant="contained" type="submit">
                    Login
                </Button>
                <p>
                    Don't have an account?{" "}
                    <Link to={routes.REGISTER.path}>Register here!</Link>
                </p>
                {error && <p style={{ color: "red" }}>{error}</p>}
                {isLoading && <p>Loading...</p>}
            </form>
        </div>
    );
};

export default LoginPage;
