import Requests from "@/pages/Driver/Requests";
import type { ISidebarItem } from "@/types";

export const driverSidebarItems: ISidebarItem[] = [
    {
        title: "Requests",
        items: [
            {
                title: "Requests",
                url: "/driver/requests",
                component: Requests,
            },
        ],
    },
]