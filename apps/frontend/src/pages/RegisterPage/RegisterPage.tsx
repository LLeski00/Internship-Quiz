import { Button, TextField } from "@mui/material";
import { useRef, useState } from "react";
import styles from "./RegisterPage.module.css";
import { isEmailValid, isPasswordValid } from "@/utils/registerUtils";
import { RegisterData } from "@/types/auth";
import { useAuth } from "@/api";
import LoadingSpinner from "@/components/LoadingSpinner/LoadingSpinner";
import toast from "react-hot-toast";

interface FormData {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    repeatedPassword: string;
}

const RegisterPage = () => {
    const { registerUser, isRegisterPending } = useAuth();
    const formData = useRef<FormData>({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        repeatedPassword: "",
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
        if (!isEmailValid(formData.current.email)) {
            toast.error("The email is invalid");
            return;
        }
        if (!isPasswordValid(formData.current.password)) {
            toast.error("The password is invalid");
            return;
        }
        if (formData.current.password !== formData.current.repeatedPassword) {
            toast.error("The passwords do not match");
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
        <form className={styles.registerForm} onSubmit={handleFormSubmit}>
            <h1 className={styles.registerTitle}>Register</h1>

            <TextField
                className={styles.registerInput}
                label="First name"
                variant="outlined"
                name="firstName"
                onChange={handleInputChange}
                placeholder="First name"
                required
            />
            <TextField
                className={styles.registerInput}
                label="Last name"
                variant="outlined"
                name="lastName"
                onChange={handleInputChange}
                placeholder="Last name"
                required
            />
            <TextField
                className={styles.registerInput}
                label="Email"
                variant="outlined"
                name="email"
                onChange={handleInputChange}
                placeholder="Email"
                required
            />
            <TextField
                className={styles.registerInput}
                type="password"
                label="Password"
                variant="outlined"
                name="password"
                onChange={handleInputChange}
                placeholder="Password"
                required
            />
            <TextField
                className={styles.registerInput}
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
            {isRegisterPending && <LoadingSpinner />}
        </form>
    );
};

export default RegisterPage;
