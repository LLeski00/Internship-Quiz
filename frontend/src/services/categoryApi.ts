import { Category, CategoryReq } from "@/types";

const CATEGORY_API_URL = import.meta.env.VITE_QUIZ_API_URL + "/category";

async function fetchCategories(apiUrl: string): Promise<Category[] | null> {
    try {
        const response = await fetch(apiUrl, {
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!response.ok)
            throw new Error(`Response status: ${response.status}`);

        const fetchedCategories: Category[] = await response.json();
        return fetchedCategories;
    } catch (error) {
        console.error((error as Error).message);
        return null;
    }
}

async function postCategory(
    apiUrl: string,
    jwt: string | null,
    newCategory: CategoryReq
) {
    try {
        const response = await fetch(apiUrl, {
            headers: {
                Authorization: `Bearer ${jwt}`,
                "Content-Type": "application/json",
            },
            method: "POST",
            body: JSON.stringify(newCategory),
        });

        if (!response.ok)
            throw new Error(`Response status: ${response.status}`);

        const res = await response.json();
        return res;
    } catch (error) {
        console.error((error as Error).message);
        return null;
    }
}

async function getCategories(): Promise<Category[] | null> {
    const apiUrl = CATEGORY_API_URL;
    const categories: Category[] | null = await fetchCategories(apiUrl);
    return categories;
}

async function createCategory(newCategory: CategoryReq, jwt: string | null) {
    const apiUrl = CATEGORY_API_URL;
    const res = await postCategory(apiUrl, jwt, newCategory);
    return res;
}

export { getCategories, createCategory };
