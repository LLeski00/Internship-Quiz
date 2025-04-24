import { routes } from "@/constants";
import { isAdmin, isTokenValid } from "@/utils";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import styles from "./HomePage.module.css";

const HomePage = () => {
    const navigate = useNavigate();
    const isLoggedIn = isTokenValid();

    return (
        <div className={styles.homePage}>
            <div className={styles.navCardList}>
                <div className={styles.navCard}>
                    <article>
                        <h2>Welcome to Dump Quiz</h2>{" "}
                        <p>
                            Whether you're here to challenge your knowledge,
                            learn something new, or just have fun — you're in
                            the right place. <br />
                            <br />✅ Create custom quizzes on any topic
                            <br />
                            🎯 Test yourself with multiple question types <br />
                            👥 Share quizzes with friends or students <br />
                            📊 Track your progress and improve <br />
                            <br />
                            Ready to dive in? Start a quiz, build your own, or
                            explore popular categories!
                        </p>
                    </article>
                    <Button
                        variant="contained"
                        color="secondary"
                        onClick={() => navigate(routes.QUIZZES.path)}
                    >
                        Explore quizzes
                    </Button>
                </div>
                {isAdmin() && (
                    <>
                        <div className={styles.navCard}>
                            <article>
                                <h2>Create Your Own Quiz</h2>
                                <p>
                                    Build engaging quizzes in just a few steps:
                                    <br />
                                    <br />
                                    ✏️ Add a title and choose a category <br />
                                    ❓ Create questions using multiple choice,
                                    true/false, or fill-in-the-blank formats
                                    <br />
                                    ✅ Mark correct answers and add as many
                                    questions as you like <br />
                                    🚀 Save and share your quiz with others
                                    instantly <br />
                                    <br />
                                    Whether you're a teacher, student, or just
                                    love making quizzes — the power is in your
                                    hands. Get started now and make your quiz
                                    unique!
                                </p>
                            </article>
                            <Button
                                variant="contained"
                                color="error"
                                onClick={() =>
                                    navigate(routes.QUIZ_CREATION.path)
                                }
                            >
                                Create a quiz
                            </Button>
                        </div>
                        <div className={styles.navCard}>
                            <article>
                                <h2>Add A New Category</h2>
                                <p>
                                    To organize your content effectively, please
                                    enter the details for the new category you
                                    wish to create:
                                    <br />
                                    <br />
                                    📛 Category Name: Choose a clear and
                                    descriptive name that reflects the
                                    category's purpose. <br />
                                    <br />
                                    Once you've filled in the necessary details,
                                    click ✨ Create Category to finalize the
                                    process.
                                </p>
                            </article>
                            <Button
                                variant="contained"
                                color="info"
                                onClick={() =>
                                    navigate(routes.CATEGORY_CREATION.path)
                                }
                            >
                                Add a new category
                            </Button>
                        </div>
                        <div className={styles.navCard}>
                            <article>
                                <h2>Admin Dashboard</h2>
                                <p>
                                    Get a quick glance at how everyone’s doing!
                                    <br />
                                    <br />
                                    👥 All registered users in one place <br />
                                    📈 Track quiz participation and performance
                                    <br />
                                    🏅 Highlight top scorers and active learners
                                    <br /> 🛠️ Identify who might need a little
                                    extra help <br />
                                    <br />
                                    Whether you're managing a classroom, a team,
                                    or a community — this is your hub for
                                    insight and impact. Stay informed. Stay in
                                    control. 🚀
                                </p>
                            </article>
                            <Button
                                variant="contained"
                                color="warning"
                                onClick={() =>
                                    navigate(routes.ADMIN_DASHBOARD.path)
                                }
                            >
                                Admin dashboard
                            </Button>
                        </div>
                    </>
                )}
                {!isLoggedIn && (
                    <div className={styles.navCard}>
                        <article>
                            <h2>Create an Account</h2>
                            <p>
                                Join our quiz community in just a few clicks!
                                <br />
                                <br />
                                ✅ Save your progress <br />
                                🧠 Create and take custom quizzes
                                <br />
                                🏆 Track your performance over time <br />
                                <br />
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
                    </div>
                )}
            </div>
        </div>
    );
};

export default HomePage;
