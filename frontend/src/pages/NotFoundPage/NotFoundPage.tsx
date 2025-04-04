import { routes } from "@/constants/routes";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const NotFoundPage = () => {
    const navigate = useNavigate();

    return (
        <>
            <h2>The page doesn't exist</h2>
            <Button
                onClick={() => navigate(routes.HOME.path)}
                variant="contained"
            >
                Go to home page
            </Button>
        </>
    );
};

export default NotFoundPage;
