import QuestionCreator from "@/components/QuestionCreator/QuestionCreator";
import { routes } from "@/constants/routes";
import { Category, QuizReq } from "@/types";
import { QuestionReq } from "@/types/question";
import { isAdmin } from "@/utils";
import { isQuizValid } from "@/utils/quizUtils";
import {
    Button,
    MenuItem,
    Select,
    SelectChangeEvent,
    TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./QuizCreationPage.module.css";
import useCategories from "@/api/category/useCategories";
import usePostQuiz from "@/api/quiz/usePostQuiz";

const QuizCreationPage = () => {
    const navigate = useNavigate();
    const {
        createQuiz,
        response,
        isLoading: isPostLoading,
        error: postError,
    } = usePostQuiz();
    const { categories: fetchedCategories, isLoading, error } = useCategories();
    const [categories, setCategories] = useState<Category[] | null>(null);
    const [newQuestion, setNewQuestion] = useState<QuestionReq | null>(null);
    const [formError, setFormError] = useState<string | null>(null);
    const [newQuiz, setNewQuiz] = useState<QuizReq>({
        title: "",
        categoryId: "",
        questions: [],
    });

    useEffect(() => {
        if (!isAdmin()) {
            navigate(routes.NOT_FOUND.path);
            return;
        }
    }, []);

    useEffect(() => {
        if (newQuestion)
            setNewQuiz((prev) => ({
                ...prev,
                questions: [...prev.questions, newQuestion],
            }));
    }, [newQuestion]);

    useEffect(() => {
        if (fetchedCategories) setCategories(fetchedCategories);
    }, [fetchedCategories]);

    useEffect(() => {
        if (response) navigate(routes.QUIZZES.path);
    }, [response]);

    const handleChange = (
        e:
            | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
            | SelectChangeEvent<string>
    ) => {
        setNewQuiz((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    async function handleFormSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        if (!isQuizValid(newQuiz)) {
            setFormError("The quiz does not meet the requirements");
            return;
        }

        createQuiz(newQuiz);
    }

    return (
        <div className={styles.quizCreationPage}>
            <h1>Quiz Creation</h1>
            {error ? (
                <p>{error}</p>
            ) : (
                <>
                    {categories && (
                        <>
                            <form onSubmit={handleFormSubmit}>
                                <TextField
                                    label="Title"
                                    variant="outlined"
                                    name="title"
                                    onChange={handleChange}
                                    placeholder="Title"
                                    required
                                />
                                <Select
                                    defaultValue=""
                                    name="categoryId"
                                    onChange={handleChange}
                                    displayEmpty
                                    required
                                >
                                    <MenuItem value="">
                                        Choose a category
                                    </MenuItem>
                                    {categories.map((c) => (
                                        <MenuItem key={c.id} value={c.id}>
                                            {c.name}
                                        </MenuItem>
                                    ))}
                                </Select>
                                <Button
                                    variant="contained"
                                    color="success"
                                    type="submit"
                                >
                                    Add quiz
                                </Button>
                                {isPostLoading && <p>Adding quiz...</p>}
                                {postError && <p>{postError}</p>}
                            </form>
                            {newQuiz.questions.length > 0 && (
                                <>
                                    <h3>Current questions:</h3>
                                    {newQuiz.questions.map((q, i) => (
                                        <div key={q.text}>
                                            {i + 1}. {q.text} Type: {q.type}
                                        </div>
                                    ))}
                                </>
                            )}
                            <QuestionCreator setNewQuestion={setNewQuestion} />
                            {formError && (
                                <p style={{ color: "red" }}>{formError}</p>
                            )}
                        </>
                    )}
                    {isLoading && <p>Loading...</p>}
                </>
            )}
        </div>
    );
};

export default QuizCreationPage;
