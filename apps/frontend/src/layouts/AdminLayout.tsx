import { LoadingSpinner, Navbar } from "@/components";
import { routes } from "@/constants/routes";
import { isAdmin } from "@/utils";
import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";

const AdminLayout = () => {
    const navigate = useNavigate();
    const [isValid, setIsValid] = useState<boolean>(false);

    useEffect(() => {
        if (!isAdmin()) {
            navigate(routes.LOGIN.path);
            return;
        }
        setIsValid(true);
    }, []);

    return (
        <>
            <Navbar />
            <main>{isValid ? <Outlet /> : <LoadingSpinner />}</main>
        </>
    );
};

export default AdminLayout;
