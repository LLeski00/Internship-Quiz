import { AnswerReq } from "@/types/answer";
import { QuestionType } from "@/types/question";
import { Button } from "@mui/material";
import { FC, JSX, useEffect, useState } from "react";
import AnswerCreatorMultipleChoice from "./AnswerCreatorMultipleChoice";
import AnswerCreatorFillInTheBlank from "./AnswerCreatorFillInTheBlank";
import AnswerCreatorTrueFalse from "./AnswerCreatorTrueFalse";

interface AnswerCreatorProps {
    setNewAnswers: Function;
    questionType: QuestionType;
}

const AnswerCreator: FC<AnswerCreatorProps> = ({
    setNewAnswers,
    questionType,
}) => {
    const [answers, setAnswers] = useState<AnswerReq[]>([]);
    const [areSaved, setAreSaved] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const AnswersComponent = getAnswersForm();

    useEffect(() => {
        setAnswers([]);
        setAreSaved(false);
    }, [questionType]);

    function getAnswersForm(): JSX.Element {
        switch (questionType) {
            case QuestionType.FILL_IN_THE_BLANK:
                return <AnswerCreatorFillInTheBlank setAnswers={setAnswers} />;
            case QuestionType.MULTIPLE_CHOICE:
                return (
                    <AnswerCreatorMultipleChoice
                        answers={answers}
                        setAnswers={setAnswers}
                    />
                );
            case QuestionType.TRUE_FALSE:
                return <AnswerCreatorTrueFalse setAnswers={setAnswers} />;
            default:
                return <></>;
        }
    }

    function handleFormSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        if (!answers.some((a: AnswerReq) => a.isCorrect)) {
            setErrorMessage("There should be at least one correct answer!");
            return;
        }

        setNewAnswers(answers);
        setAreSaved(true);
        if (errorMessage) setErrorMessage(null);
    }

    return (
        <div>
            <form onSubmit={handleFormSubmit}>
                {areSaved ? (
                    answers.map((a) => (
                        <p key={a.text}>
                            {a.text} Is correct : {a.isCorrect.toString()}
                        </p>
                    ))
                ) : (
                    <>
                        {AnswersComponent}
                        <Button type="submit" variant="contained">
                            Save answers
                        </Button>
                        {errorMessage && (
                            <p style={{ color: "red" }}>{errorMessage}</p>
                        )}
                    </>
                )}
            </form>
        </div>
    );
};

export default AnswerCreator;
