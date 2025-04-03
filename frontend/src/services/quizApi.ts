import { Quiz } from "@/types";

const QUIZ_API_URL = import.meta.env.VITE_QUIZ_API_URL + "/quiz";

async function fetchQuizzes(
    apiUrl: string,
    jwt: string | null
): Promise<Quiz[] | null> {
    try {
        const response = await fetch(apiUrl, {
            headers: {
                Authorization: `Bearer ${jwt}`,
                "Content-Type": "application/json",
            },
        });

        if (!response.ok)
            throw new Error(`Response status: ${response.status}`);

        const fetchedQuizzes: Quiz[] = await response.json();
        return fetchedQuizzes;
    } catch (error) {
        console.error((error as Error).message);
        return null;
    }
}

async function getQuizzes(
    searchValue: string | null,
    jwt: string | null
): Promise<Quiz[] | null> {
    const apiUrl = searchValue
        ? `${QUIZ_API_URL}/search=${searchValue}`
        : QUIZ_API_URL;
    const quizzes: Quiz[] | null = await fetchQuizzes(apiUrl, jwt);
    return quizzes;
}

export { getQuizzes };
