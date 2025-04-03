import { Category } from "@/types";

const CATEGORY_API_URL = import.meta.env.VITE_QUIZ_API_URL + "/category";

async function fetchCategories(apiUrl: string): Promise<Category[] | null> {
    try {
        const response = await fetch(apiUrl);

        if (!response.ok)
            throw new Error(`Response status: ${response.status}`);

        const fetchedCategories: Category[] = await response.json();
        return fetchedCategories;
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

export { getCategories };
