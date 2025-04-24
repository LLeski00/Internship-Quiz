import { AnswerReq } from "@/types";
import { Checkbox } from "@mui/material";
import { FC, useEffect } from "react";

interface AnswerCreatorTrueFalseProps {
    setAnswers: Function;
}

const AnswerCreatorTrueFalse: FC<AnswerCreatorTrueFalseProps> = ({
    setAnswers,
}) => {
    useEffect(() => {
        const trueAnswer: AnswerReq = {
            text: "True",
            isCorrect: false,
        };
        const falseAnswer: AnswerReq = {
            text: "False",
            isCorrect: true,
        };

        setAnswers([trueAnswer, falseAnswer]);
    }, []);

    function createTrueFalseAnswers(e: React.ChangeEvent<HTMLInputElement>) {
        const trueAnswer: AnswerReq = {
            text: "True",
            isCorrect: e.target.checked,
        };
        const falseAnswer: AnswerReq = {
            text: "False",
            isCorrect: !e.target.checked,
        };

        setAnswers([trueAnswer, falseAnswer]);
    }

    return (
        <label>
            Is true?
            <Checkbox onChange={createTrueFalseAnswers} />
        </label>
    );
};

export default AnswerCreatorTrueFalse;
