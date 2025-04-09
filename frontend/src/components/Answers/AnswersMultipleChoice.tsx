import { useQuiz } from "@/hooks/useQuiz";
import { Answer } from "@/types/answer";
import { FC } from "react";

interface AnswersMultipleChoiceProps {
    answers: Answer[];
}

const AnswersMultipleChoice: FC<AnswersMultipleChoiceProps> = ({ answers }) => {
    const { handleAnswer } = useQuiz();

    return (
        <>
            <div className="answersMultipleChoice">
                {answers.map((a) => (
                    <p key={a.id} onClick={() => handleAnswer(a.text)}>
                        {a.text}
                    </p>
                ))}
            </div>
        </>
    );
};

export default AnswersMultipleChoice;
