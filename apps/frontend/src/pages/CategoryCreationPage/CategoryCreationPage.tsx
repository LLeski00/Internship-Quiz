import { CategoryReq } from "@/types";
import { Button, TextField } from "@mui/material";
import { useRef } from "react";
import styles from "./CategoryCreationPage.module.css";
import { useCategories, usePostCategory } from "@/api";
import LoadingSpinner from "@/components/LoadingSpinner/LoadingSpinner";
import toast from "react-hot-toast";
import { extractAxiosError } from "@/utils/errorUtils";

const CategoryCreationPage = () => {
    const { categories, isLoading, error } = useCategories();
    const { addCategory, isPending } = usePostCategory();
    const newCategory = useRef<CategoryReq>({ name: "" });

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

        addCategory(newCategory.current);
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
                        {isPending && (
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
                                <p key={c.name} className={styles.category}>
                                    {c.name}
                                </p>
                            ))}
                        </>
                    ) : (
                        <p>There are no categories currently.</p>
                    )}
                </>
            )}
            {isLoading && <LoadingSpinner />}
            {error && <p>{extractAxiosError(error)}</p>}
        </div>
    );
};

export default CategoryCreationPage;
