import { Navbar } from "@/components";
import { routes } from "@/constants/routes";
import { isAdmin } from "@/utils";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

const AdminLayout = () => {
    const navigate = useNavigate();

    useEffect(() => {
        if (!isAdmin()) {
            navigate(routes.NOT_FOUND.path);
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

export default AdminLayout;
