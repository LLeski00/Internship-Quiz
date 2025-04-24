import { useUserScores } from "@/api";
import { extractAxiosError } from "@/utils";
import styles from "./AdminDashboardPage.module.css";
import { UserCard, LoadingSpinner } from "@/components";

const AdminDashboardPage = () => {
    const { userScores, isLoading, error } = useUserScores();

    return (
        <div className={styles.adminDashboardPage}>
            <h1>Admin Dashboard</h1>
            {error ? (
                <p>{extractAxiosError(error)}</p>
            ) : (
                <>{userScores?.map((u) => <UserCard key={u.id} user={u} />)}</>
            )}
            {isLoading && <LoadingSpinner />}
        </div>
    );
};

export default AdminDashboardPage;
