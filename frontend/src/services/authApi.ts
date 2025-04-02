import { JwtResponse, RegisterData } from "@/types";

const AUTH_API_URL = import.meta.env.VITE_QUIZ_API_URL + "/auth";

async function register(
    apiUrl: string,
    registerData: RegisterData
): Promise<JwtResponse | null> {
    try {
        const response = await fetch(apiUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(registerData),
        });

        if (!response.ok)
            throw new Error(`Response status: ${response.status}`);

        const jwtResponse: JwtResponse = await response.json();
        return jwtResponse;
    } catch (error) {
        console.error((error as Error).message);
        return null;
    }
}

async function registerUser(
    registerData: RegisterData
): Promise<string | null> {
    const apiUrl = AUTH_API_URL + "/register";
    const jwtResponse: JwtResponse | null = await register(
        apiUrl,
        registerData
    );
    return jwtResponse ? jwtResponse.token : null;
}

export { registerUser };
