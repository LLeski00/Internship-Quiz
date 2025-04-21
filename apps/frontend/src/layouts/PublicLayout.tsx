import { Navbar } from "@/components";
import { Outlet } from "react-router-dom";

const PublicLayout = () => {
    return (
        <>
            <Navbar />
            <main>
                <Outlet />
            </main>
        </>
    );
};

export default PublicLayout;
