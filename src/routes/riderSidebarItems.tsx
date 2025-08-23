import RequestRide from "@/pages/Rider/RequestRide";
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
]