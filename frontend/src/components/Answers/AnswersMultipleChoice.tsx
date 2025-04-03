import { Answer } from "@/types/answer";
import { FC } from "react";

interface AnswersMultipleChoiceProps {
    answers: Answer[];
}

const AnswersMultipleChoice: FC<AnswersMultipleChoiceProps> = ({ answers }) => {
    return (
        <>
            <div className="answersMultipleChoice">
                {answers.map((a) => (
                    <p key={a.id}>{a.text}</p>
                ))}
            </div>
        </>
    );
};

export default AnswersMultipleChoice;
