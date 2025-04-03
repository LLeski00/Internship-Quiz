import { Question, QuestionType } from "@/types/question";
import { FC } from "react";
import {
    AnswersFillInTheBlank,
    AnswersMultipleChoice,
    AnswersTrueFalse,
} from "@/components";

interface AnswersProps {
    question: Question;
}

const Answers: FC<AnswersProps> = ({ question }) => {
    const AnswersComponent = getAnswersComponent(question);

    function getAnswersComponent(question: Question) {
        switch (question.type) {
            case QuestionType.MULTIPLE_CHOICE:
                return <AnswersMultipleChoice answers={question.answers} />;
            case QuestionType.FILL_IN_THE_BLANK:
                return <AnswersFillInTheBlank answers={question.answers} />;
            case QuestionType.SLIDER:
                return <AnswersTrueFalse answers={question.answers} />;
            default:
                console.error("The question type doesn't exist");
                break;
        }
    }
    return <>{AnswersComponent}</>;
};

export default Answers;
