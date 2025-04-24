import { QuestionReq, QuestionType, AnswerReq } from "@/types";
import {
    Button,
    MenuItem,
    Select,
    SelectChangeEvent,
    TextField,
} from "@mui/material";
import { FC, useEffect, useState } from "react";
import { AnswerCreator } from "@/components";
import { isQuestionValid } from "@/utils";
import toast from "react-hot-toast";

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

    useEffect(() => {
        setQuestion((prev) => ({ ...prev, answers: newAnswers }));
    }, [newAnswers]);

    useEffect(() => {
        setNewAnswers([]);
        setQuestion((prev) => ({ ...prev, answers: [] }));
    }, [question.type]);

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
            toast.error("The question is not valid!");
            return;
        }

        setNewQuestion(question);
        setQuestion({
            text: "",
            type: QuestionType.MULTIPLE_CHOICE,
            answers: [],
        });
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
                    <h3>Current question answers:</h3>
                    {question.answers.map((a) => (
                        <p key={a.text}>
                            {a.text} {a.isCorrect && "✅"}
                        </p>
                    ))}
                </>
            ) : (
                <AnswerCreator
                    setNewAnswers={setNewAnswers}
                    questionType={question.type}
                />
            )}
        </>
    );
};

export default QuestionCreator;
