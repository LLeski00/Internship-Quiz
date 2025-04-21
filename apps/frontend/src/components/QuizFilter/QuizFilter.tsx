import { Category } from "@/types";
import { MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { FC } from "react";
import styles from "./QuizFilter.module.css";

interface QuizFilterProps {
    filter: Category | null;
    setFilter: Function;
    categories: Category[];
}

const QuizFilter: FC<QuizFilterProps> = ({ filter, setFilter, categories }) => {
    function handleSelectChange(e: SelectChangeEvent<string>) {
        if (!categories) return;

        const category =
            categories.find((c) => c.id === e.target.value) || null;
        setFilter(category);
    }

    return (
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
        </>
    );
};

export default QuizFilter;
