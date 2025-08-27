import ActiveRide from "@/pages/Driver/ActiveRide";
import DriverChangePassword from "@/pages/Driver/DriverChangePassword";
import DriverManageProfile from "@/pages/Driver/DriverManageProfile";
import DriverRideHistory from "@/pages/Driver/DriverRideHistory";
import { Earnings } from "@/pages/Driver/Earnings";
import Requests from "@/pages/Driver/Requests";
import type { ISidebarItem } from "@/types";

export const driverSidebarItems: ISidebarItem[] = [
    {
        title: "Rides",
        items: [
            {
                title: "Requests",
                url: "/driver/requests",
                component: Requests,
            },
            {
                title: "Active Ride",
                url: "/driver/active-ride",
                component: ActiveRide,
            },
            {
                title: "Earnings",
                url: "/driver/earnings",
                component: Earnings,
            },
             {
                title: "Ride History",
                url: "/driver/ride-history",
                component: DriverRideHistory,
            },
        ],
    },
    {
        title: "Manage Profile",
        items: [
            {
                title: "Manage Profile",
                url: "/driver/manage-Profile",
                component: DriverManageProfile,
            },
            {
                title: "Change Password",
                url: "/driver/change-password",
                component: DriverChangePassword,
            },
        ],
    },
]