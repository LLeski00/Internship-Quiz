import { routes } from "@/constants/routes";
import { isAdmin, isTokenValid } from "@/utils";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import styles from "./HomePage.module.css";

const HomePage = () => {
    const navigate = useNavigate();
    const isLoggedIn = isTokenValid();

    return (
        <div className={styles.homePage}>
            <h1>Home</h1>
            <article>
                <h1>Welcome to Dump Quiz! 🧠</h1>{" "}
                <p>
                    Whether you're here to challenge your knowledge, learn
                    something new, or just have fun — you're in the right place.{" "}
                    <br />✅ Create custom quizzes on any topic
                    <br />
                    🎯 Test yourself with multiple question types <br />
                    👥 Share quizzes with friends or students <br />
                    📊 Track your progress and improve <br />
                    Ready to dive in? Start a quiz, build your own, or explore
                    popular categories!
                </p>
            </article>
            <Button
                variant="contained"
                color="secondary"
                onClick={() => navigate(routes.QUIZZES.path)}
            >
                Explore quizzes
            </Button>
            {isAdmin() && (
                <>
                    <article>
                        <h2>🛠️ Create Your Own Quiz</h2>
                        <p>
                            Build engaging quizzes in just a few steps: <br />
                            ✏️ Add a title and choose a category <br />❓ Create
                            questions using multiple choice, true/false, or
                            fill-in-the-blank formats <br />✅ Mark correct
                            answers and add as many questions as you like <br />
                            🚀 Save and share your quiz with others instantly
                            Whether you're a teacher, student, or just love
                            making quizzes — the power is in your hands. <br />
                            Get started now and make your quiz unique!
                        </p>
                    </article>
                    <Button
                        variant="contained"
                        color="error"
                        onClick={() => navigate(routes.QUIZ_CREATION.path)}
                    >
                        Create a quiz
                    </Button>
                    <article>
                        <h2>Add A New Category</h2>
                        <p>
                            To organize your content effectively, please enter
                            the details for the new category you wish to create:
                            <br />
                            📛 Category Name: Choose a clear and descriptive
                            name that reflects the category's purpose. <br />
                            Once you've filled in the necessary details, click
                            ✨ Create Category to finalize the process.
                        </p>
                    </article>
                    <Button
                        variant="contained"
                        color="info"
                        onClick={() => navigate(routes.CATEGORY_CREATION.path)}
                    >
                        Add a new category
                    </Button>
                </>
            )}
            {!isLoggedIn && (
                <>
                    <article>
                        <h2>📝 Create an Account</h2>
                        <p>
                            Join our quiz community in just a few clicks! <br />
                            ✅ Save your progress <br />
                            🧠 Create and take custom quizzes
                            <br />
                            🏆 Track your performance over time <br />
                            Fill in your details below and start your quiz
                            journey today!
                        </p>
                    </article>
                    <Button
                        variant="contained"
                        color="warning"
                        onClick={() => navigate(routes.REGISTER.path)}
                    >
                        Register
                    </Button>
                </>
            )}
        </div>
    );
};

export default HomePage;
