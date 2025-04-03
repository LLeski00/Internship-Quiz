import { Answer } from "@/types/answer";
import { FC } from "react";

interface AnswersTrueFalseProps {
    answers: Answer[];
}

const AnswersTrueFalse: FC<AnswersTrueFalseProps> = ({ answers }) => {
    return (
        <>
            <div className="answersTrueFalse">
                {answers.map((a) => (
                    <p key={a.id}>{a.text}</p>
                ))}
            </div>
        </>
    );
};

export default AnswersTrueFalse;
