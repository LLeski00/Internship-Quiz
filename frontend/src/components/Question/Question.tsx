import { Question as QuestionInterface } from "@/types/question";
import { FC } from "react";
import { Answers } from "@/components";

interface QuestionProps {
    question: QuestionInterface;
}

const Question: FC<QuestionProps> = ({ question }) => {
    return (
        <div className="question">
            <h3>{question.text}</h3>
            <Answers question={question} />
        </div>
    );
};

export default Question;
