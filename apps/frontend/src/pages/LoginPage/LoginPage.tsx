import { Button, TextField } from "@mui/material";
import { useRef } from "react";
import styles from "./LoginPage.module.css";
import { LoginData } from "@/types";
import { Link } from "react-router-dom";
import { routes } from "@/constants";
import { useAuth } from "@/api";
import { LoadingSpinner } from "@/components";

interface FormData {
    email: string;
    password: string;
}

const LoginPage = () => {
    const { loginUser, isLoginPending } = useAuth();
    const formData = useRef<FormData>({
        email: "",
        password: "",
    });

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
        <div className={styles.loginPage}>
            <form className={styles.loginForm} onSubmit={handleFormSubmit}>
                <h1 className={styles.loginTitle}>Login</h1>
                <TextField
                    className={styles.loginInput}
                    label="Email"
                    variant="outlined"
                    name="email"
                    onChange={handleInputChange}
                    placeholder="Email"
                    required
                />
                <TextField
                    className={styles.loginInput}
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
                {isLoginPending && <LoadingSpinner />}
            </form>
        </div>
    );
};

export default LoginPage;
