import { Question, QuestionType } from "@/types/question";
import { FC } from "react";
import {
    AnswersFillInTheBlank,
    AnswersMultipleChoice,
    AnswersTrueFalse,
} from "@/components";

interface AnswersProps {
    question: Question;
    setPoints: React.Dispatch<React.SetStateAction<number>>;
}

const Answers: FC<AnswersProps> = ({ question, setPoints }) => {
    const AnswersComponent = getAnswersComponent(question);

    function getAnswersComponent(question: Question) {
        switch (question.type) {
            case QuestionType.MULTIPLE_CHOICE:
                return (
                    <AnswersMultipleChoice
                        answers={question.answers}
                        setPoints={setPoints}
                    />
                );
            case QuestionType.FILL_IN_THE_BLANK:
                return (
                    <AnswersFillInTheBlank
                        answers={question.answers}
                        setPoints={setPoints}
                    />
                );
            case QuestionType.TRUE_FALSE:
                return (
                    <AnswersTrueFalse
                        answers={question.answers}
                        setPoints={setPoints}
                    />
                );
            default:
                console.error("The question type doesn't exist");
                break;
        }
    }
    return <>{AnswersComponent}</>;
};

export default Answers;
