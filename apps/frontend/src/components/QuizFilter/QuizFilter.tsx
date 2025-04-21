import { Category, Quiz } from "@/types";
import { MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { FC } from "react";
import styles from "./QuizFilter.module.css";
import useCategories from "@/api/category/useCategories";

interface QuizFilterProps {
    quizzes: Quiz[];
    filter: Category | null;
    setFilter: Function;
}

const QuizFilter: FC<QuizFilterProps> = ({ filter, setFilter }) => {
    const { categories, isLoading, error } = useCategories();

    function handleSelectChange(e: SelectChangeEvent<string>) {
        if (!categories) return;

        const category =
            categories.find((c) => c.id === e.target.value) || null;
        setFilter(category);
    }

    return (
        <>
            {error ? (
                <p>{error}</p>
            ) : (
                <>
                    {categories && (
                        <form className={styles.quizFilter}>
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
                    )}
                    {isLoading && <p>Loading...</p>}
                </>
            )}
        </>
    );
};

export default QuizFilter;
