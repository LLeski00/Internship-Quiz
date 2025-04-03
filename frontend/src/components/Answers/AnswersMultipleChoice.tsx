import { useQuiz } from "@/hooks/useQuiz";
import { Answer } from "@/types/answer";
import { FC } from "react";

interface AnswersMultipleChoiceProps {
    answers: Answer[];
}

const AnswersMultipleChoice: FC<AnswersMultipleChoiceProps> = ({ answers }) => {
    const { setPoints } = useQuiz();

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
