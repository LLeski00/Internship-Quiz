import { Button, TextField } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import styles from "./RegisterPage.module.css";
import { isEmailValid, isPasswordValid } from "@/utils/registerUtils";
import { RegisterData } from "@/types/auth";
import { routes } from "@/constants/routes";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/api";
import LoadingSpinner from "@/components/LoadingSpinner/LoadingSpinner";

interface FormData {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    repeatedPassword: string;
}

const RegisterPage = () => {
    const { registerUser, jwt, isLoading, error } = useAuth();
    const formData = useRef<FormData>({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        repeatedPassword: "",
    });
    const [formError, setFormError] = useState<string | null>();
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
        if (!isEmailValid(formData.current.email)) {
            setFormError("The email is invalid!");
            return;
        }
        if (!isPasswordValid(formData.current.password)) {
            setFormError("The password is invalid!");
            return;
        }
        if (formData.current.password !== formData.current.repeatedPassword) {
            setFormError("The passwords do not match!");
            return;
        }

        const registerData: RegisterData = {
            firstName: formData.current.firstName,
            lastName: formData.current.lastName,
            email: formData.current.email,
            password: formData.current.password,
        };

        registerUser(registerData);
    }

    return (
        <div>
            <h1 className={styles.registerTitle}>Register</h1>
            <form className={styles.registerForm} onSubmit={handleFormSubmit}>
                <TextField
                    label="First name"
                    variant="outlined"
                    name="firstName"
                    onChange={handleInputChange}
                    placeholder="First name"
                    required
                />
                <TextField
                    label="Last name"
                    variant="outlined"
                    name="lastName"
                    onChange={handleInputChange}
                    placeholder="Last name"
                    required
                />
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
                <TextField
                    type="password"
                    label="Repeated password"
                    variant="outlined"
                    name="repeatedPassword"
                    onChange={handleInputChange}
                    placeholder="Repeated password"
                    required
                />
                <Button variant="contained" type="submit">
                    Register
                </Button>
                {isLoading && (
                    <>
                        <p>Loading...</p>
                        <LoadingSpinner />
                    </>
                )}
                {formError && <p>{formError}</p>}
                {error && <p>{error}</p>}
            </form>
        </div>
    );
};

export default RegisterPage;
