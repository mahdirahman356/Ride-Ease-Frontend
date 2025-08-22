/* eslint-disable @typescript-eslint/no-explicit-any */
import { role } from "@/constents/role";
import { adminSidebarItems } from "@/routes/adminSidebarItems";
import { driverSidebarItems } from "@/routes/driverSidebarItems";
import { riderSidebarItems } from "@/routes/riderSidebarItems";

const getSidebarItems = (userRole: any) => {
    switch (userRole) {
        case role.admin:
            return [...adminSidebarItems];
        case role.driver:
            return [...driverSidebarItems];
        case role.rider:
            return [...riderSidebarItems]
    }
};

export default getSidebarItems;