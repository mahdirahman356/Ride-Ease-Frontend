import { Outlet } from "react-router";

const DashboardLayout = () => {
    return (
        <div>
            Dashboard Layout 
            <Outlet />
        </div>
    );
};

export default DashboardLayout;