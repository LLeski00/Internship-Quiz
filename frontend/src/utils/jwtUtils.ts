import { jwtDecode } from "jwt-decode";

function getUserRole(): string | null {
    const token = localStorage.getItem("jwt");
    if (!token) return null;

    try {
        const decoded: { role: string } = jwtDecode(token);
        return decoded.role;
    } catch (error) {
        console.error("Invalid token");
        return null;
    }
}

function getUserId(): string | null {
    const token = localStorage.getItem("jwt");
    if (!token) return null;

    try {
        const decoded: { id: string } = jwtDecode(token);
        return decoded.id;
    } catch (error) {
        console.error("Invalid token");
        return null;
    }
}

function isTokenValid(): boolean {
    const token = localStorage.getItem("jwt");
    if (!token) return false;

    try {
        const decoded: { exp: number } = jwtDecode(token);
        const currentTime = Math.floor(Date.now() / 1000);
        return decoded.exp > currentTime;
    } catch (error) {
        console.error("Invalid token:", error);
        return false;
    }
}

export { getUserRole, isTokenValid, getUserId };
