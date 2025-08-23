import AdminChangePassword from "@/pages/Admin/AdminChangePassword";
import AdminManageProfile from "@/pages/Admin/AdminManageProfile";
import Analytics from "@/pages/Admin/Analytics";
import ManageUsers from "@/pages/Admin/ManageUsers";
import RideOversight from "@/pages/Admin/RideOversight";
import type { ISidebarItem } from "@/types";


export const adminSidebarItems: ISidebarItem[] = [
     {
        title: "Analytics",
        items: [
            {
                title: "Analytics",
                url: "/admin/analytics",
                component: Analytics,
            },
        ],
    },
     {
        title: "User Management",
        items: [
            {
                title: "User Management",
                url: "/admin/manage-users",
                component: ManageUsers,
            },
        ],
    },
     {
        title: "Ride Oversight",
        items: [
            {
                title: "Ride Oversight",
                url: "/admin/ride-oversight",
                component: RideOversight,
            },
        ],
    },
     {
        title: "Manage Profile",
        items: [
            {
                title: "Manage Profile",
                url: "/admin/manage-profile",
                component: AdminManageProfile,
            },
        ],
    },
     {
        title: "Change Password",
        items: [
            {
                title: "Change Password",
                url: "/admin/change-password",
                component: AdminChangePassword,
            },
        ],
    },
]