import RideHistory from "@/pages/Rider/RideHistory";
import RiderActiveRide from "@/pages/Rider/RiderActiveRide";
import RiderChangePassword from "@/pages/Rider/RiderChangePassword";
import RideRequest from "@/pages/Rider/RideRequest";
import RiderManageProfile from "@/pages/Rider/RiderManageProfile";
import type { ISidebarItem } from "@/types";
import { GitPullRequest, History, KeyRound, Radio, UserRound } from "lucide-react";


export const riderSidebarItems: ISidebarItem[] = [
    {
        title: "Ride Request",
        items: [
            {
                title: "Request Ride",
                url: "/rider/ride-request",
                icon: GitPullRequest,
                component: RideRequest,
            },
            {
                title: "Active Ride",
                url: "/rider/active-ride",
                icon: Radio,
                component: RiderActiveRide,
            },
            {
                title: "Ride History",
                url: "/rider/ride-history",
                icon: History,
                component: RideHistory,
            },
        ],
    },
    {
        title: "Manage Profile",
        items: [
            {
                title: "Manage Profile",
                url: "/rider/manage-profile",
                icon: UserRound,
                component: RiderManageProfile,
            },
            {
                title: "Change Password",
                url: "/rider/change-password",
                icon: KeyRound,
                component: RiderChangePassword,
            },
        ],
    },
]