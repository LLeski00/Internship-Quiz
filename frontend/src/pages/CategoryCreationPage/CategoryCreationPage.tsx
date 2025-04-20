import { routes } from "@/constants/routes";
import { createCategory, getCategories } from "@/api/categoryApi";
import { Category, CategoryReq } from "@/types";
import { isAdmin } from "@/utils";
import { Button, TextField } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./CategoryCreationPage.module.css";

const CategoryCreationPage = () => {
    const navigate = useNavigate();
    const [categories, setCategories] = useState<Category[] | null>(null);
    const newCategory = useRef<CategoryReq>({ name: "" });
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    useEffect(() => {
        if (!isAdmin()) {
            navigate(routes.NOT_FOUND.path);
            return;
        }
        loadCategories();
    }, []);

    async function loadCategories() {
        const fetchedCategories = await getCategories();
        setCategories(fetchedCategories);
    }

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        newCategory.current.name = e.target.value;
    };

    async function handleFormSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        if (newCategory.current.name.length === 0) {
            setErrorMessage("The name is empty");
            return;
        }

        if (categories?.some((c) => c.name === newCategory.current.name)) {
            setErrorMessage("The category already exists");
            return;
        }

        const res = await createCategory(newCategory.current);

        if (!res) {
            setErrorMessage("Something went wrong with creating the category");
            return;
        }

        setCategories((prev) => [
            ...(prev ?? []),
            { id: "", name: newCategory.current.name },
        ]);
        if (errorMessage) setErrorMessage(null);
    }

    return (
        <div className={styles.categoryCreationPage}>
            <h1>Category Creation</h1>
            {categories && (
                <>
                    <form onSubmit={handleFormSubmit} className={styles.form}>
                        <TextField
                            label="Title"
                            variant="outlined"
                            name="title"
                            onChange={handleChange}
                            placeholder="Title"
                            required
                        />
                        <Button
                            variant="contained"
                            color="success"
                            type="submit"
                        >
                            Add category
                        </Button>
                    </form>
                    {errorMessage && (
                        <p style={{ color: "red" }}>{errorMessage}</p>
                    )}
                    {categories ? (
                        <>
                            <h3>Existing categories:</h3>
                            {categories.map((q) => (
                                <div key={q.name}>{q.name}</div>
                            ))}
                        </>
                    ) : (
                        <p>There are no categories currently.</p>
                    )}
                </>
            )}
        </div>
    );
};

export default CategoryCreationPage;
