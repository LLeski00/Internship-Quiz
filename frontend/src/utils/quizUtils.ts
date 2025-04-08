import { QuizReq } from "@/types";
import { AnswerReq } from "@/types/answer";
import { QuestionReq } from "@/types/question";

function isQuizValid(quiz: QuizReq): boolean {
    return true;
}

function isQuestionValid(question: QuestionReq): boolean {
    if (!areAnswersValid(question.answers) || question.text === "")
        return false;

    return true;
}

function areAnswersValid(answers: AnswerReq[]): boolean {
    if (!answers.some((a: AnswerReq) => a.isCorrect)) return false;
    return true;
}

export { isQuizValid, isQuestionValid, areAnswersValid };
