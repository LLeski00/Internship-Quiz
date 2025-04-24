import { AnswerReq, QuestionType } from "@/types";
import { Button } from "@mui/material";
import { FC, JSX, useEffect, useState } from "react";
import {
    AnswerCreatorMultipleChoice,
    AnswerCreatorFillInTheBlank,
    AnswerCreatorTrueFalse,
} from "@/components";
import { areAnswersValid } from "@/utils";
import styles from "./AnswerCreator.module.css";
import toast from "react-hot-toast";

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
    const AnswersComponent = getAnswersForm();

    useEffect(() => {
        if (questionType !== QuestionType.TRUE_FALSE) setAnswers([]);
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

        if (!areAnswersValid(answers)) {
            toast.error("There should be at least one correct answer!");
            return;
        }

        setNewAnswers(answers);
        setAreSaved(true);
    }

    return (
        <div>
            <form onSubmit={handleFormSubmit} className={styles.answerCreator}>
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
                    </>
                )}
            </form>
        </div>
    );
};

export default AnswerCreator;
