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

interface QuestionCreatorProps {
    setNewQuestion: Function;
}

const QuestionCreator: FC<QuestionCreatorProps> = ({ setNewQuestion }) => {
    const [question, setQuestion] = useState<QuestionReq>({
        text: "",
        type: QuestionType.MULTIPLE_CHOICE,
        answers: [],
    });
    const [newAnswers, setNewAnswers] = useState<AnswerReq>();

    useEffect(() => {
        checkAnswers();
        console.log(question.answers);
    }, [newAnswers]);

    function checkAnswers() {
        //To do
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
        setNewQuestion(question);
    }

    return (
        <>
            <form onSubmit={handleFormSubmit}>
                <TextField
                    label="Question"
                    name="text"
                    onChange={handleChange}
                    placeholder="Question"
                    required
                />
                <Select
                    name="type"
                    defaultValue={QuestionType.MULTIPLE_CHOICE}
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
                            {a.text} is correct: {a.isCorrect}
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
