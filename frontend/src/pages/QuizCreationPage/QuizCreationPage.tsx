import QuestionCreator from "@/components/QuestionCreator/QuestionCreator";
import { routes } from "@/constants/routes";
import { createQuiz } from "@/services";
import { getCategories } from "@/services/categoryApi";
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

const QuizCreationPage = () => {
    const navigate = useNavigate();
    const [categories, setCategories] = useState<Category[] | null>(null);
    const [newQuestion, setNewQuestion] = useState<QuestionReq | null>(null);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
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
        loadCategories();
    }, []);

    useEffect(() => {
        if (newQuestion)
            setNewQuiz((prev) => ({
                ...prev,
                questions: [...prev.questions, newQuestion],
            }));
    }, [newQuestion]);

    async function loadCategories() {
        const fetchedCategories = await getCategories();
        setCategories(fetchedCategories);
    }

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
            setErrorMessage("The quiz does not meet the requirements");
            return;
        }

        const res = await createQuiz(newQuiz);

        if (!res) {
            setErrorMessage("Something went wrong with creating the quiz");
            return;
        }

        navigate(routes.QUIZZES.path);
    }

    return (
        <div className={styles.quizCreationPage}>
            <h1>Quiz Creation</h1>
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
                            <MenuItem value="">Choose a category</MenuItem>
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
                    {errorMessage && (
                        <p style={{ color: "red" }}>{errorMessage}</p>
                    )}
                </>
            )}
        </div>
    );
};

export default QuizCreationPage;
