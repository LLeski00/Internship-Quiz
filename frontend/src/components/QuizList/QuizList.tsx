import { Quiz } from "@/types";
import { FC } from "react";

interface QuizListProps {
    quizzes: Quiz[];
}

const QuizList: FC<QuizListProps> = ({ quizzes }) => {
    return (
        <div className="quizList">
            {quizzes.map((q) => (
                <div className="quiz" key={q.id}>
                    <h3>{q.title}</h3>
                    <p>{q.category.name}</p>
                </div>
            ))}
        </div>
    );
};

export default QuizList;
