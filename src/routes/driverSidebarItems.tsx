import { DriverActiveRide } from "@/pages/Driver/DriverActiveRide";
import DriverChangePassword from "@/pages/Driver/DriverChangePassword";
import DriverManageProfile from "@/pages/Driver/DriverManageProfile";
import DriverRideHistory from "@/pages/Driver/DriverRideHistory";
import { Earnings } from "@/pages/Driver/Earnings";
import Requests from "@/pages/Driver/Requests";
import type { ISidebarItem } from "@/types";
import { Bike, HandCoins, History, KeyRound, Radio, UserRound } from "lucide-react";

export const driverSidebarItems: ISidebarItem[] = [
    {
        title: "Rides",
        items: [
            {
                title: "Requests",
                icon: Bike,
                url: "/driver/requests",
                component: Requests,
            },
            {
                title: "Active Ride",
                icon: Radio,
                url: "/driver/active-ride",
                component: DriverActiveRide,
            },
            {
                title: "Earnings",
                url: "/driver/earnings",
                icon: HandCoins,
                component: Earnings,
            },
            {
                title: "Ride History",
                url: "/driver/ride-history",
                icon: History ,
                component: DriverRideHistory,
            },
        ],
    },
    {
        title: "Account",
        items: [
            {
                title: "Manage Profile",
                url: "/driver/manage-Profile",
                icon: UserRound,
                component: DriverManageProfile,
            },
            {
                title: "Change Password",
                url: "/driver/change-password",
                icon: KeyRound,
                component: DriverChangePassword,
            },
        ],
    },
]