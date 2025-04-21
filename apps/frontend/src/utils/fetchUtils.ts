import api from "@/api/base";
import { AxiosError } from "axios";

async function getData<T = any>(url: string): Promise<T | AxiosError> {
    try {
        const response = await api.get<T>(url);
        return response.data;
    } catch (err) {
        return err as AxiosError;
    }
}

async function postData<Req = any, Res = any>(
    url: string,
    data: Req
): Promise<Res | AxiosError> {
    try {
        const response = await api.post<Res>(url, data);
        return response.data;
    } catch (err) {
        return err as AxiosError;
    }
}

export { getData, postData };
