import QuestionCreator from "@/components/QuestionCreator/QuestionCreator";
import { QuizReq } from "@/types";
import { QuestionReq } from "@/types/question";
import { isQuizValid } from "@/utils/quizUtils";
import {
    Button,
    MenuItem,
    Select,
    SelectChangeEvent,
    TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import styles from "./QuizCreationPage.module.css";
import { usePostQuiz, useCategories } from "@/api";
import LoadingSpinner from "@/components/LoadingSpinner/LoadingSpinner";
import toast from "react-hot-toast";
import { extractAxiosError } from "@/utils/errorUtils";

const QuizCreationPage = () => {
    const { addQuiz, isPending } = usePostQuiz();
    const { categories, isLoading, error } = useCategories();
    const [newQuestion, setNewQuestion] = useState<QuestionReq | null>(null);
    const [newQuiz, setNewQuiz] = useState<QuizReq>({
        title: "",
        categoryId: "",
        questions: [],
    });

    useEffect(() => {
        if (newQuestion)
            setNewQuiz((prev) => ({
                ...prev,
                questions: [...prev.questions, newQuestion],
            }));
    }, [newQuestion]);

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
            toast.error(
                "The quiz does not meet the requirements (At least 5 questions with 2 different question types)"
            );
            return;
        }

        addQuiz(newQuiz);
    }

    return (
        <div className={styles.quizCreationPage}>
            <h1>Quiz Creation</h1>
            {error ? (
                <p>{extractAxiosError(error)}</p>
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
                                {isPending && (
                                    <>
                                        <p>Adding quiz...</p>
                                        <LoadingSpinner />
                                    </>
                                )}
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
                        </>
                    )}
                    {isLoading && <LoadingSpinner />}
                </>
            )}
        </div>
    );
};

export default QuizCreationPage;
