import { useUserScores } from "@/api";
import LoadingSpinner from "@/components/LoadingSpinner/LoadingSpinner";
import { extractAxiosError } from "@/utils/errorUtils";

const AdminDashboardPage = () => {
    const { userScores, isLoading, error } = useUserScores();

    return (
        <>
            <h1>User scores</h1>
            {error ? (
                <p>{extractAxiosError(error)}</p>
            ) : (
                <>
                    {userScores &&
                        userScores.map((u) => (
                            <div key={u.id}>
                                <h2>{u.email}</h2>
                                {u.scores.length > 0 ? (
                                    u.scores.map((s) => (
                                        <div key={s.id}>
                                            <p>
                                                Quiz: {s.quiz.title} Points:{" "}
                                                {s.points} Time: {s.time}
                                            </p>
                                        </div>
                                    ))
                                ) : (
                                    <p>No scores yet.</p>
                                )}
                            </div>
                        ))}
                </>
            )}
            {isLoading && <LoadingSpinner />}
        </>
    );
};

export default AdminDashboardPage;
