import App from "@/App";
import DashboardLayout from "@/layout/DashboardLayout";
import About from "@/pages/About";
import HomePage from "@/pages/HomePage";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import generateRoutes from "@/utils/generateRoutes";
import { createBrowserRouter, Navigate } from "react-router";
import { adminSidebarItems } from "./adminSidebarItems";
import { riderSidebarItems } from "./riderSidebarItems";
import { driverSidebarItems } from "./driverSidebarItems";
import { withAuth } from "@/utils/withAuth";
import { role } from "@/constents/role";
import Unauthorized from "@/pages/Restricted/Unauthorized";
import AccessDenied from "@/pages/Restricted/AccessDenied";
import type { TRole } from "@/types";
import RideDetails from "@/pages/Rider/RideDetails";
import Features from "@/pages/Features";
import FAQ from "@/pages/FAQ";
import Contact from "@/pages/Rider/Contact";



export const router = createBrowserRouter([
    {
        Component: App,
        path: "/",
        children: [
            {
                Component: HomePage,
                index: true
            },
            {
                Component: About,
                path: "about"
            },
            {
                Component: Features,
                path: "features"
            },
            {
                Component: Contact,
                path: "contact"
            },
            {
                Component: FAQ,
                path: "faq"
            },
        ]
    },
    {
        Component: withAuth(DashboardLayout, role.admin as TRole),
        path: "/admin",
        children: [
            { index: true, element: <Navigate to={"/admin/analytics"} /> },
            ...generateRoutes(adminSidebarItems)
        ]
    },
    {
        Component: withAuth(DashboardLayout, role.rider as TRole),
        path: "/rider",
        children: [
            { index: true, element: <Navigate to={"/rider/request-ride"} /> },
            ...generateRoutes(riderSidebarItems),
            {
                Component: RideDetails,
                path: "ride-details/:id"
            }
        ]
    },
    {
        Component: withAuth(DashboardLayout, role.driver as TRole),
        path: "/driver",
        children: [
            { index: true, element: <Navigate to={"/driver/requests"} /> },
            ...generateRoutes(driverSidebarItems)

        ]
    },
    {
        Component: Login,
        path: "/login"
    },
    {
        Component: Register,
        path: "/register"
    },
    {
        Component: Unauthorized,
        path: "/unauthorized"
    },
    {
        Component: AccessDenied,
        path: "/access-denied"
    },

])