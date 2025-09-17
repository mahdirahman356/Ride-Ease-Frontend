import AdminChangePassword from "@/pages/Admin/AdminChangePassword";
import AdminManageProfile from "@/pages/Admin/AdminManageProfile";
import { Analytics } from "@/pages/Admin/Analytics";
import ManageUsers from "@/pages/Admin/ManageUsers";
import RideOversight from "@/pages/Admin/RideOversight";
import type { ISidebarItem } from "@/types";
import { Bike, ChartLine, KeyRound, UserRound, UsersRound } from "lucide-react";


export const adminSidebarItems: ISidebarItem[] = [
    {
        title: "Rides",
        items: [
            {
                title: "Analytics",
                url: "/admin/analytics",
                icon: ChartLine,
                component: Analytics,
            },
            {
                title: "Ride Oversight",
                url: "/admin/ride-oversight",
                icon: Bike,
                component: RideOversight,
            },
        ],
    },
    {
        title: "Users",
        items: [
            {
                title: "User Management",
                url: "/admin/manage-users",
                icon: UsersRound,
                component: ManageUsers,
            },
        ],
    },
    {
        title: "Account",
        items: [
            {
                title: "Manage Profile",
                url: "/admin/manage-profile",
                icon: UserRound,
                component: AdminManageProfile,
            },
            {
                title: "Change Password",
                url: "/admin/change-password",
                icon: KeyRound,
                component: AdminChangePassword,
            },
        ],
    },
]