import { Navbar } from "@/components";
import { routes } from "@/constants/routes";
import { isTokenValid } from "@/utils";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

const UserLayout = () => {
    const navigate = useNavigate();

    useEffect(() => {
        if (!isTokenValid()) {
            navigate(routes.LOGIN.path);
            return;
        }
    }, []);

    return (
        <>
            <Navbar />
            <main>
                <Outlet />
            </main>
        </>
    );
};

export default UserLayout;
