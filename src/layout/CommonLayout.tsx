import type { ReactNode } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useGetActiveRideQuery } from "@/redux/features/driver/driver.api";
import { useGetMyRidesQuery } from "@/redux/features/rider/rider.api";
import SOSButton from "@/components/SOSButton";
interface IProps {
    children: ReactNode
}
const CommonLayout = ({ children }: IProps) => {

    const { data: diverRideStatus } = useGetActiveRideQuery(undefined)
    const { data: riderRideStatus } = useGetMyRidesQuery({ status: "IN_TRANSIT" })


    console.log("for driver", diverRideStatus?.data?.[0]?.status)
    console.log("for rider", riderRideStatus?.data?.data?.[0]?.status)

    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />
            <div className="grow-1 md:w-[95%] lg:max-w-7xl mx-auto mt-16">{children}</div>
            {(diverRideStatus?.data?.[0]?.status || riderRideStatus?.data?.data?.[0]?.status) === "IN_TRANSIT" 
            && <SOSButton />}
            <Footer />
        </div>
    );
};

export default CommonLayout;