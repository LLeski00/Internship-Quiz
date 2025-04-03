import { Question, QuestionType } from "@/types/question";
import {
    AnswersFillInTheBlank,
    AnswersMultipleChoice,
    AnswersTrueFalse,
} from "@/components";
import { useQuiz } from "@/hooks/useQuiz";

const Answers = () => {
    const { currentQuestion } = useQuiz();
    const AnswersComponent = getAnswersComponent(currentQuestion);

    function getAnswersComponent(question: Question | null) {
        if (!question) {
            console.error("The question doesn't exist");
            return;
        }

        switch (question.type) {
            case QuestionType.MULTIPLE_CHOICE:
                return <AnswersMultipleChoice answers={question.answers} />;
            case QuestionType.FILL_IN_THE_BLANK:
                return <AnswersFillInTheBlank answers={question.answers} />;
            case QuestionType.TRUE_FALSE:
                return <AnswersTrueFalse answers={question.answers} />;
            default:
                console.error("The question type doesn't exist");
                break;
        }
    }
    return <>{AnswersComponent}</>;
};

export default Answers;
