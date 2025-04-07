import QuestionCreator from "@/components/QuestionCreator/QuestionCreator";
import { routes } from "@/constants/routes";
import { getCategories } from "@/services/categoryApi";
import { Category, QuizReq } from "@/types";
import { Question } from "@/types/question";
import { isAdmin } from "@/utils";
import { isQuizValid } from "@/utils/quizUtils";
import {
    Button,
    MenuItem,
    Select,
    SelectChangeEvent,
    TextField,
} from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const QuizCreationPage = () => {
    const navigate = useNavigate();
    const [categories, setCategories] = useState<Category[] | null>(null);
    const [newQuestion, setNewQuestion] = useState<Question | null>(null);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const formData = useRef<QuizReq>({
        title: "",
        categoryId: "",
        questions: [],
    });

    useEffect(() => {
        if (!isAdmin()) navigate(routes.NOT_FOUND.path);
        loadCategories();
    }, []);

    useEffect(() => {
        if (newQuestion) formData.current.questions.push(newQuestion);
    }, [newQuestion]);

    async function loadCategories() {
        const fetchedCategories = await getCategories(
            localStorage.getItem("jwt")
        );
        setCategories(fetchedCategories);
    }

    const handleChange = (
        e:
            | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
            | SelectChangeEvent<string>
    ) => {
        formData.current = {
            ...formData.current,
            [e.target.name]: e.target.value,
        };
    };

    function handleFormSubmit() {
        if (!isQuizValid()) {
            setErrorMessage("The quiz does not meet the requirements");
            return;
        }
    }

    return (
        <div>
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
                    {formData.current.questions.map((q, i) => (
                        <div key={q.text}>
                            {i}. {q.text}
                        </div>
                    ))}
                    <QuestionCreator setNewQuestion={setNewQuestion} />
                    {errorMessage && <p>{errorMessage}</p>}
                </>
            )}
        </div>
    );
};

export default QuizCreationPage;
