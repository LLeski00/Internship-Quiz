import { QuizDetails } from "@/types";
import { Question as QuestionInterface } from "@/types/question";
import { FC, useState } from "react";
import Timer from "../Timer/Timer";
import { Question } from "@/components";
import { Button } from "@mui/material";

interface QuizProps {
    quiz: QuizDetails;
}

const Quiz: FC<QuizProps> = ({ quiz }) => {
    const numOfQuestions = quiz.questions.length;
    const [currentQuestion, setCurrentQuestion] = useState<QuestionInterface>(
        quiz.questions[0]
    );
    const [points, setPoints] = useState<number>(0);
    const [questionCounter, setQuestionCounter] = useState<number>(1);
    const [timer, setTimer] = useState({
        minutes: 0,
        seconds: 0,
    });

    return (
        <>
            <div className="quizHeader">
                <p>
                    <Timer timer={timer} setTimer={setTimer} />
                </p>
                <p>
                    {questionCounter} / {numOfQuestions}
                </p>
                <p>
                    {points} / {questionCounter}
                </p>
            </div>
            <Question question={currentQuestion} />
            <Button variant="contained">Next</Button>
        </>
    );
};

export default Quiz;
