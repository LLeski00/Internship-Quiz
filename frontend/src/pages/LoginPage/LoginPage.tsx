import { Button, TextField } from "@mui/material";
import { useRef, useState } from "react";
import styles from "./LoginPage.module.css";
import { LoginData } from "@/types/auth";
import { loginUser } from "@/api/authApi";
import { Link, useNavigate } from "react-router-dom";
import { routes } from "@/constants/routes";

interface FormData {
    email: string;
    password: string;
}

const LoginPage = () => {
    const formData = useRef<FormData>({
        email: "",
        password: "",
    });
    const [errorMessage, setErrorMessage] = useState<string | null>();
    const navigate = useNavigate();

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

        const jwt = await loginUser(loginData);
        if (!jwt) {
            setErrorMessage("Invalid credentials");
            return;
        }
        localStorage.setItem("jwt", jwt);
        navigate(routes.HOME.path);
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
                {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
            </form>
        </div>
    );
};

export default LoginPage;
