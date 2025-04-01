import { Quiz } from "@/types";

const QUIZ_API_URL = import.meta.env.VITE_QUIZ_API_URL + "/quiz";

async function fetchQuizzes(apiUrl: string): Promise<Quiz[] | null> {
    try {
        const response = await fetch(apiUrl);

        if (!response.ok)
            throw new Error(`Response status: ${response.status}`);

        const fetchedQuizzes: Quiz[] = await response.json();
        return fetchedQuizzes;
    } catch (error) {
        console.error((error as Error).message);
        return null;
    }
}

async function getQuizzes(searchValue: string | null): Promise<Quiz[] | null> {
    const apiUrl = searchValue
        ? `${QUIZ_API_URL}/search=${searchValue}`
        : QUIZ_API_URL;
    const quizzes: Quiz[] | null = await fetchQuizzes(apiUrl);
    return quizzes;
}

export { getQuizzes };
