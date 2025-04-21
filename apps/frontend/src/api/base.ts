import axios from "axios";

const token = localStorage.getItem("jwt");

const api = axios.create({
    baseURL: import.meta.env.VITE_QUIZ_API_URL,
    headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
    },
});

export default api;
