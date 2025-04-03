import { routes } from "@/constants/routes";
import { getCategories } from "@/services/categoryApi";
import { Category, Quiz } from "@/types";
import { isTokenValid } from "@/utils/jwtUtils";
import { MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface QuizFilterProps {
    quizzes: Quiz[];
    filter: Category | null;
    setFilter: Function;
}

const QuizFilter: FC<QuizFilterProps> = ({ filter, setFilter }) => {
    const [categories, setCategories] = useState<Category[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        loadCategories();
    }, []);

    async function loadCategories() {
        if (!isTokenValid()) {
            navigate(routes.LOGIN.path);
            return;
        }

        const categories = await getCategories(localStorage.getItem("jwt"));
        if (!categories) {
            console.error("There was an issue fetching categories.");
            return;
        }
        setCategories(categories);
    }

    function handleSelectChange(e: SelectChangeEvent<string>) {
        const category =
            categories.find((c) => c.id === e.target.value) || null;
        setFilter(category);
    }

    return (
        <form className="quiz-filter">
            <Select
                value={filter ? filter.id : ""}
                onChange={handleSelectChange}
                displayEmpty
            >
                <MenuItem value="">All Categories</MenuItem>
                {categories.map((c) => (
                    <MenuItem key={c.id} value={c.id}>
                        {c.name}
                    </MenuItem>
                ))}
            </Select>
        </form>
    );
};

export default QuizFilter;
