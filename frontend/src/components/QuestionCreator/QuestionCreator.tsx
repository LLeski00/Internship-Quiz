import { QuestionReq, QuestionType } from "@/types/question";
import {
    Button,
    MenuItem,
    Select,
    SelectChangeEvent,
    TextField,
} from "@mui/material";
import { FC, useEffect, useState } from "react";
import AnswerCreator from "../AnswerCreator/AnswerCreator";
import { AnswerReq } from "@/types/answer";
import { isQuestionValid } from "@/utils/quizUtils";

interface QuestionCreatorProps {
    setNewQuestion: Function;
}

const QuestionCreator: FC<QuestionCreatorProps> = ({ setNewQuestion }) => {
    const [question, setQuestion] = useState<QuestionReq>({
        text: "",
        type: QuestionType.MULTIPLE_CHOICE,
        answers: [],
    });
    const [newAnswers, setNewAnswers] = useState<AnswerReq[]>([]);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    useEffect(() => {
        saveAnswers();
    }, [newAnswers]);

    useEffect(() => {
        setNewAnswers([]);
        setQuestion((prev) => ({ ...prev, answers: [] }));
    }, [question.type]);

    function saveAnswers() {
        setQuestion((prev) => ({ ...prev, answers: newAnswers }));
    }

    const handleChange = (
        e:
            | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
            | SelectChangeEvent<string>
    ) => {
        setQuestion((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    function handleFormSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        if (!isQuestionValid(question)) {
            setErrorMessage("The question is not valid!");
            return;
        }

        setNewQuestion(question);
        setQuestion({
            text: "",
            type: QuestionType.MULTIPLE_CHOICE,
            answers: [],
        });
        if (errorMessage) setErrorMessage(null);
    }

    return (
        <>
            <form onSubmit={handleFormSubmit}>
                <TextField
                    label="Question"
                    name="text"
                    onChange={handleChange}
                    value={question.text}
                    placeholder="Question"
                    required
                />
                <Select
                    name="type"
                    value={question.type}
                    onChange={handleChange}
                    displayEmpty
                    required
                >
                    {Object.values(QuestionType).map((q) => (
                        <MenuItem key={q} value={q}>
                            {q}
                        </MenuItem>
                    ))}
                </Select>
                <Button type="submit" variant="contained">
                    Add question
                </Button>
            </form>
            {question.answers.length > 0 ? (
                <>
                    {question.answers.map((a) => (
                        <p key={a.text}>
                            {a.text} Is correct : {a.isCorrect.toString()}
                        </p>
                    ))}
                </>
            ) : (
                <AnswerCreator
                    setNewAnswers={setNewAnswers}
                    questionType={question.type}
                />
            )}
            {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
        </>
    );
};

export default QuestionCreator;
