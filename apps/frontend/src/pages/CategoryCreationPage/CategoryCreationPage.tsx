import { Category, CategoryReq } from "@/types";
import { Button, TextField } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import styles from "./CategoryCreationPage.module.css";
import { useCategories, usePostCategory } from "@/api";
import LoadingSpinner from "@/components/LoadingSpinner/LoadingSpinner";
import toast from "react-hot-toast";

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

    useEffect(() => {
        if (fetchedCategories) setCategories(fetchedCategories);
    }, [fetchedCategories]);

    useEffect(() => {
        if (response && !postError) {
            setCategories((prev) => [...(prev ?? []), response]);
            toast.success("Category successfully created.");
        }
    }, [response]);

    useEffect(() => {
        if (postError) toast.error(postError);
    }, [postError]);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        newCategory.current.name = e.target.value;
    };

    async function handleFormSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        if (newCategory.current.name.length === 0) {
            toast.error("The name is empty");
            return;
        }

        if (categories?.some((c) => c.name === newCategory.current.name)) {
            toast.error("The category already exists");
            return;
        }

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
                        {isPostLoading && (
                            <>
                                <p>Creating...</p>
                                <LoadingSpinner />
                            </>
                        )}
                    </form>
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
            {isLoading && <LoadingSpinner />}
            {error && <p>{error}</p>}
        </div>
    );
};

export default CategoryCreationPage;
