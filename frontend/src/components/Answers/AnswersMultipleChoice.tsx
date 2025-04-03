import { Answer } from "@/types/answer";
import { FC } from "react";

interface AnswersMultipleChoiceProps {
    answers: Answer[];
    setPoints: React.Dispatch<React.SetStateAction<number>>;
}

const AnswersMultipleChoice: FC<AnswersMultipleChoiceProps> = ({
    answers,
    setPoints,
}) => {
    function handleAnswer(answer: Answer) {
        if (answer.isCorrect) setPoints((prev: number) => prev + 1);
    }

    return (
        <>
            <div className="answersMultipleChoice">
                {answers.map((a) => (
                    <p key={a.id} onClick={() => handleAnswer(a)}>
                        {a.text}
                    </p>
                ))}
            </div>
        </>
    );
};

export default AnswersMultipleChoice;
