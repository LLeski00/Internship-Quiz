import { useState } from "react";
import styles from "./Hamburger.module.css";
import { useNavigate } from "react-router-dom";
import { isTokenValid } from "@/utils";
import toast from "react-hot-toast";
import { routes } from "@/constants";
import { Button, TextField } from "@mui/material";
import { IoSearchOutline } from "react-icons/io5";

const Hamburger = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [searchValue, setSearchValue] = useState<string>("");
    const navigate = useNavigate();
    const isLoggedIn = isTokenValid();

    function logout() {
        localStorage.setItem("jwt", "");
        toast.success("Successfully logged out");
        navigate(routes.HOME.path);
    }

    function toggleHamburger() {
        setIsOpen((prev) => !prev);
    }

    return (
        <div className={styles.hamburger}>
            <p onClick={toggleHamburger}>≡</p>
            {isOpen && (
                <div className={styles.menu}>
                    <div className={styles.searchBar}>
                        <TextField
                            className={styles.searchBarInput}
                            label="Search"
                            variant="outlined"
                            value={searchValue}
                            onChange={(e) => setSearchValue(e.target.value)}
                            placeholder="Search the quizzes..."
                        />
                        <IoSearchOutline
                            onClick={() =>
                                navigate(
                                    `${routes.QUIZZES.path}?search=${searchValue}`
                                )
                            }
                        />
                    </div>
                    {isLoggedIn ? (
                        <>
                            <Button
                                variant="contained"
                                className={styles.loginButton}
                                color="secondary"
                                onClick={logout}
                            >
                                Logout
                            </Button>
                        </>
                    ) : (
                        <Button
                            variant="contained"
                            className={styles.loginButton}
                            color="warning"
                            onClick={() => navigate(`${routes.LOGIN.path}`)}
                        >
                            Login
                        </Button>
                    )}
                </div>
            )}
        </div>
    );
};

export default Hamburger;
