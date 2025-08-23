import RequestRide from "@/pages/Rider/RequestRide";
import RideHistory from "@/pages/Rider/RideHistory";
import RiderChangePassword from "@/pages/Rider/RiderChangePassword";
import RiderManageProfile from "@/pages/Rider/RiderManageProfile";
import type { ISidebarItem } from "@/types";


export const riderSidebarItems: ISidebarItem[] = [
    {
        title: "Requests",
        items: [
            {
                title: "Request Ride",
                url: "/rider/request-ride",
                component: RequestRide,
            },
        ],
    },
    {
        title: "Requests",
        items: [
            {
                title: "Ride History",
                url: "/rider/ride-history",
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
                component: RiderManageProfile,
            },
        ],
    },
     {
            title: "Change Password",
            items: [
                {
                    title: "Change Password",
                    url: "/rider/change-password",
                    component: RiderChangePassword,
                },
            ],
        },
]