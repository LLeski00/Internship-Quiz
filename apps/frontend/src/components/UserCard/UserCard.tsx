import { UserDetails } from "@/types/user";
import { FC, useState } from "react";
import styles from "./UserCard.module.css";

interface UserCardProps {
    user: UserDetails;
}

const UserCard: FC<UserCardProps> = ({ user }) => {
    const [showScores, setShowScores] = useState<boolean>(false);

    function toggleScores() {
        setShowScores((prev) => !prev);
    }

    return (
        <div className={styles.userCard} onClick={toggleScores}>
            <h2>{user.email}</h2>
            {showScores && (
                <div>
                    {user.scores.length > 0 ? (
                        user.scores.map((s) => (
                            <div key={s.id} className={styles.quizScore}>
                                <p>
                                    Quiz: {s.quiz.title} <br />
                                    Score:
                                    {s.score.toFixed(2)}% <br />
                                    Time:
                                    {s.time}s
                                </p>
                            </div>
                        ))
                    ) : (
                        <p>No scores yet.</p>
                    )}
                </div>
            )}
        </div>
    );
};

export default UserCard;
