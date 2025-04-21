type Answer = {
    id: string;
    questionId: string;
    text: string;
    isCorrect: boolean;
};

type AnswerReq = {
    text: string;
    isCorrect: boolean;
};

export { Answer, AnswerReq };
