import { Category, Quiz } from "@/types";
import { FC } from "react";

interface QuizListProps {
    quizzes: Quiz[];
    filter: Category | null;
}

const QuizList: FC<QuizListProps> = ({ quizzes, filter }) => {
    const filteredQuizzes = filter
        ? quizzes.filter((q) => q.category.id === filter.id)
        : quizzes;

    return (
        <div className="quizList">
            {filteredQuizzes.map((q) => (
                <div className="quiz" key={q.id}>
                    <h3>{q.title}</h3>
                    <p>{q.category.name}</p>
                </div>
            ))}
        </div>
    );
};

export default QuizList;
