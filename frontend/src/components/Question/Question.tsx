import { Question as QuestionInterface } from "@/types/question";
import { FC } from "react";
import { Answers } from "@/components";

interface QuestionProps {
    question: QuestionInterface;
    setPoints: React.Dispatch<React.SetStateAction<number>>;
}

const Question: FC<QuestionProps> = ({ question, setPoints }) => {
    return (
        <div className="question">
            <h3>{question.text}</h3>
            <Answers question={question} setPoints={setPoints} />
        </div>
    );
};

export default Question;
