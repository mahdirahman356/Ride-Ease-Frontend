import RequestRide from "@/pages/Rider/RequestRide";
import RideHistory from "@/pages/Rider/RideHistory";
import RiderChangePassword from "@/pages/Rider/RiderChangePassword";
import RiderManageProfile from "@/pages/Rider/RiderManageProfile";
import type { ISidebarItem } from "@/types";
import { GitPullRequest, History, KeyRound, UserRound } from "lucide-react";


export const riderSidebarItems: ISidebarItem[] = [
    {
        title: "Ride Request",
        items: [
            {
                title: "Request Ride",
                url: "/rider/request-ride",
                icon: GitPullRequest,
                component: RequestRide,
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