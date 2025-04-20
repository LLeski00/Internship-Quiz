import { useState, useEffect } from "react";
import axios, { AxiosError } from "axios";

const useFetch = <T = any>(url: string) => {
    const [data, setData] = useState<T | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get<T>(url);
                setData(response.data);
            } catch (err) {
                const error = err as AxiosError;

                if (error.response) {
                    setError(
                        `Error ${error.response.status}: ${error.response.statusText}`
                    );
                } else if (error.request) {
                    setError("No response received from server.");
                } else {
                    setError("Request error: " + error.message);
                }
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [url]);

    return { data, isLoading, error };
};

export default useFetch;
