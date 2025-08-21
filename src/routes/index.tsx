import App from "@/App";
import DashboardLayout from "@/layout/DashboardLayout";
import About from "@/pages/About";
import Analytics from "@/pages/Admin/Analytics";
import Requests from "@/pages/Driver/Requests";
import HomePage from "@/pages/HomePage";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import RequestRide from "@/pages/Rider/RequestRide";
import { createBrowserRouter, Navigate } from "react-router";



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
            }
        ]
    },
    {
        Component: DashboardLayout,
        path: "/admin",
        children: [
            { index: true, element: <Navigate to={"/admin/analytics"} /> },
            {
                Component: Analytics,
                path: "analytics",
            }
        ]
    },
    {
        Component: DashboardLayout,
        path: "/rider",
        children: [
            { index: true, element: <Navigate to={"/rider/request-ride"} /> },
            {
                Component: RequestRide,
                path: "request-ride",
            }
        ]
    },
    {
        Component: DashboardLayout,
        path: "/driver",
        children: [
            { index: true, element: <Navigate to={"/driver/requests"} /> },
            {
                Component: Requests,
                path: "requests",
            }
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
])