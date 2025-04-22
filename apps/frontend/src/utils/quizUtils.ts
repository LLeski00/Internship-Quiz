import { QuizReq } from "@/types";
import { AnswerReq } from "@/types/answer";
import { QuestionReq, QuestionType } from "@/types/question";

function isQuizValid(quiz: QuizReq): boolean {
    if (quiz.questions.length < 5) return false;
    const usedTypes: QuestionType[] = [];

    for (const q of quiz.questions) {
        if (!usedTypes.includes(q.type)) usedTypes.push(q.type);
        if (usedTypes.length >= 2) return true;
    }

    return false;
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
