import { LoadingSpinner, Navbar } from "@/components";
import { routes } from "@/constants/routes";
import { isTokenValid } from "@/utils";
import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";

const UserLayout = () => {
    const navigate = useNavigate();
    const [isValid, setIsValid] = useState<boolean>(false);

    useEffect(() => {
        if (!isTokenValid()) {
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

export default UserLayout;
