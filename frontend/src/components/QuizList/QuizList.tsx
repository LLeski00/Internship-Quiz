import { routes } from "@/constants/routes";
import { Category, Quiz } from "@/types";
import { getCategoryImage } from "@/utils/categoryUtils";
import { FC } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./QuizList.module.css";

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
        <div className={styles.quizList}>
            {filteredQuizzes.map((q) => (
                <div
                    className={styles.quiz}
                    key={q.id}
                    onClick={() => navigate(quizApi + q.id)}
                >
                    <img
                        src={getCategoryImage(q.category)}
                        className={styles.categoryImage}
                        alt={q.category.name}
                    />
                    <h3>{q.title}</h3>
                    <p>{q.category.name}</p>
                </div>
            ))}
        </div>
    );
};

export default QuizList;
