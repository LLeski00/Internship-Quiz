import { routes } from "@/constants/routes";
import { isAdmin } from "@/utils";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const QuizCreationPage = () => {
    const navigate = useNavigate();

    useEffect(() => {
        if (!isAdmin()) navigate(routes.NOT_FOUND.path);
    }, []);

    return (
        <div>
            <h1>Quiz Creation</h1>
        </div>
    );
};

export default QuizCreationPage;
