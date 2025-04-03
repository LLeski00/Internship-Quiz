import { routes } from "@/constants/routes";
import { Category, Quiz } from "@/types";
import { FC } from "react";
import { useNavigate } from "react-router-dom";

interface QuizListProps {
    quizzes: Quiz[];
    filter: Category | null;
}

const QuizList: FC<QuizListProps> = ({ quizzes, filter }) => {
    const filteredQuizzes = filter
        ? quizzes.filter((q) => q.category.id === filter.id)
        : quizzes;
    const quizApi = routes.QUIZ.path.split(":")[0];
    const navigate = useNavigate();

    return (
        <div className="quizList">
            {filteredQuizzes.map((q) => (
                <div
                    className="quiz"
                    key={q.id}
                    onClick={() => navigate(quizApi + q.id)}
                >
                    <h3>{q.title}</h3>
                    <p>{q.category.name}</p>
                </div>
            ))}
        </div>
    );
};

export default QuizList;
