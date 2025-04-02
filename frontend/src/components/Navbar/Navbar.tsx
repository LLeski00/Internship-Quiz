import { Button, TextField } from "@mui/material";
import { useState } from "react";
import styles from "./Navbar.module.css";
import { IoSearchOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { routes } from "@/constants/routes";

const Navbar = () => {
    const [searchValue, setSearchValue] = useState<string>("");
    const navigate = useNavigate();

    return (
        <div className={styles.navbar}>
            <h1 onClick={() => navigate(`${routes.HOME.path}`)}>DUMP Quiz</h1>
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
                        navigate(`${routes.QUIZZES.path}?search=${searchValue}`)
                    }
                />
            </div>
            <Button
                variant="contained"
                className={styles.loginButton}
                color="warning"
                onClick={() => navigate(`${routes.LOGIN.path}`)}
            >
                Login
            </Button>
        </div>
    );
};

export default Navbar;
