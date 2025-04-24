import { Question, QuestionType } from "@/types";
import { AnswersFillInTheBlank, AnswersMultipleChoice } from "@/components";
import { useQuiz } from "@/hooks";

const Answers = () => {
    const { currentQuestion } = useQuiz();
    const AnswersComponent = getAnswersComponent(currentQuestion);

    function getAnswersComponent(question: Question | null) {
        if (!question) {
            console.error("The question doesn't exist");
            return;
        }

        switch (question.type) {
            case QuestionType.TRUE_FALSE:
            case QuestionType.MULTIPLE_CHOICE:
                return <AnswersMultipleChoice answers={question.answers} />;
            case QuestionType.FILL_IN_THE_BLANK:
                return <AnswersFillInTheBlank />;
            default:
                console.error("The question type doesn't exist");
                break;
        }
    }
    return <>{AnswersComponent}</>;
};

export default Answers;
