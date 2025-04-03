import { Answer } from "@/types/answer";
import { FC } from "react";

interface AnswersTrueFalseProps {
    answers: Answer[];
    setPoints: React.Dispatch<React.SetStateAction<number>>;
}

const AnswersTrueFalse: FC<AnswersTrueFalseProps> = ({
    answers,
    setPoints,
}) => {
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
