import { role } from "@/constents/role";
import { adminSidebarItems } from "@/routes/adminSidebarItems";
import { driverSidebarItems } from "@/routes/driverSidebarItems";
import { riderSidebarItems } from "@/routes/riderSidebarItems";
import type { TRole } from "@/types";

const getSidebarItems = (userRole: TRole) => {
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