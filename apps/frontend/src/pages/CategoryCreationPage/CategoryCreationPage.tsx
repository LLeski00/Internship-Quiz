import { Category, CategoryReq } from "@/types";
import { Button, TextField } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import styles from "./CategoryCreationPage.module.css";
import useCategories from "@/api/category/useCategories";
import usePostCategory from "@/api/category/usePostCategory";

const CategoryCreationPage = () => {
    const [categories, setCategories] = useState<Category[] | null>(null);
    const { categories: fetchedCategories, isLoading, error } = useCategories();
    const {
        createCategory,
        isLoading: isPostLoading,
        error: postError,
        response,
    } = usePostCategory();
    const newCategory = useRef<CategoryReq>({ name: "" });
    const [formError, setFormError] = useState<string | null>(null);

    useEffect(() => {
        if (fetchedCategories) setCategories(fetchedCategories);
    }, [fetchedCategories]);

    useEffect(() => {
        if (response) setCategories((prev) => [...(prev ?? []), response]);
    }, [response]);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        newCategory.current.name = e.target.value;
    };

    async function handleFormSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        if (newCategory.current.name.length === 0) {
            setFormError("The name is empty");
            return;
        }

        if (categories?.some((c) => c.name === newCategory.current.name)) {
            setFormError("The category already exists");
            return;
        }

        if (formError) setFormError(null);
        createCategory(newCategory.current);
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
                        {isPostLoading && <p>Creating...</p>}
                        {postError && <p>{postError}</p>}
                    </form>
                    {formError && <p style={{ color: "red" }}>{formError}</p>}
                    {categories.length > 0 ? (
                        <>
                            <h3>Existing categories:</h3>
                            {categories.map((c) => (
                                <div key={c.name}>{c.name}</div>
                            ))}
                        </>
                    ) : (
                        <p>There are no categories currently.</p>
                    )}
                </>
            )}
            {isLoading && <p>Loading...</p>}
            {error && <p>{error}</p>}
        </div>
    );
};

export default CategoryCreationPage;
