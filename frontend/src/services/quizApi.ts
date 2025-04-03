import { Quiz, QuizDetails } from "@/types";

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

async function fetchQuiz(
    apiUrl: string,
    jwt: string | null
): Promise<QuizDetails | null> {
    try {
        const response = await fetch(apiUrl, {
            headers: {
                Authorization: `Bearer ${jwt}`,
                "Content-Type": "application/json",
            },
        });

        if (!response.ok)
            throw new Error(`Response status: ${response.status}`);

        const fetchedQuiz: QuizDetails = await response.json();
        return fetchedQuiz;
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
        ? `${QUIZ_API_URL}?search=${searchValue}`
        : QUIZ_API_URL;
    const quizzes: Quiz[] | null = await fetchQuizzes(apiUrl, jwt);
    return quizzes;
}

async function getQuiz(
    quizId: string | undefined,
    jwt: string | null
): Promise<QuizDetails | null> {
    const apiUrl = QUIZ_API_URL + "/" + quizId;
    const quiz: QuizDetails | null = await fetchQuiz(apiUrl, jwt);
    return quiz;
}

export { getQuizzes, getQuiz };
