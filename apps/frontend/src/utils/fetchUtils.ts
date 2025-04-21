import axios, { AxiosError } from "axios";

async function getData<T = any>(url: string): Promise<T | AxiosError> {
    const token = localStorage.getItem("jwt");

    try {
        const response = await axios.get<T>(url, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (err) {
        return err as AxiosError;
    }
}

async function postData<Req = any, Res = any>(
    url: string,
    data: Req
): Promise<Res | AxiosError> {
    const token = localStorage.getItem("jwt");

    try {
        const response = await axios.post<Res>(url, data, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (err) {
        return err as AxiosError;
    }
}

export { getData, postData };
