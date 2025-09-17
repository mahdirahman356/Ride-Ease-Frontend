/* eslint-disable @typescript-eslint/no-explicit-any */
import { useAssignRideMutation, useGetActiveRideQuery } from "@/redux/features/driver/driver.api";
import userImage from "../../assets/image/user-image.webp"
import { ArrowDownUp, Bike, LoaderCircleIcon, MapPin, Timer } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { format } from "date-fns";

const ActiveRide = () => {

    const { data, isLoading } = useGetActiveRideQuery(undefined)
    const [assignRide] = useAssignRideMutation()

    const rideData = data?.data?.[0]
    console.log(data?.data?.message)

    const ActionButton = rideData?.status === "ACCEPTED"
        ? "Picked Up"
        : rideData?.status === "PICKED_UP"
            ? "In_Transit"
            : "Completed";

    const handleStatus = async (id: string, status: string) => {
        console.log(id, status?.replace(" ", "_").toUpperCase())
        const Updatedstatus = status?.replace(" ", "_").toUpperCase()
        const toastId = toast.loading("Loading...")

        try {
            const res = await assignRide({ id, data: { status: Updatedstatus } }).unwrap()
            console.log(res)
            if (res.success) {
                toast.success("You have updated the ride status.", { id: toastId })
            }
        } catch (error: any) {
            console.log(error)
        }
    }

    if (isLoading) {
        return <div className="flex justify-center items-center my-20">
            <LoaderCircleIcon
                className="-ms-1 animate-spin"
                size={30}
                aria-hidden="true"
            />
        </div>
    }


    return (
        <div>
            <div className="p-4">
                {data?.data?.message ? <p className="text-center mt-20 text-muted-foreground">{data?.data?.message}</p> :
                    <div className="container grid grid-cols-12 mx-auto">
                        <div className="flex flex-col justify-center col-span-12 align-middle   lg:col-span-6 lg:h-auto">
                            <div className="flex flex-col md:py-5 ">
                                <h1 className="py-4 text-2xl md:text-4xl font-semibold">Active Ride Management</h1>
                                <p className="">Manage the full lifecycle of a ride by updating its status in real time, keeping both drivers and riders informed at every step.</p>
                            </div>
                        </div>
                        <div className="flex flex-col col-span-12  divide-y lg:col-span-6">
                            <div className="pt-6 pb-4 space-y-2">
                                <div className="flex items-center gap-3">
                                    <img
                                        className="rounded-full border"
                                        src={userImage}
                                        width={40}
                                        height={40}
                                        alt="user-profile"
                                    />
                                    <div>
                                        <div className="font-medium">{rideData?.rider?.name}</div>
                                        <span className="text-muted-foreground mt-0.5 text-xs">
                                            {rideData?.rider?.address ? rideData?.rider?.address : "Address not provided"}
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className="pt-6 pb-4 space-y-2">
                                <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-3">
                                    <div className="flex items-start gap-1">
                                        <span><MapPin size={20} className="text-muted-foreground mt-0.5" /></span>
                                        <p>{rideData?.pickupLocation.address}</p>
                                    </div>
                                    <ArrowDownUp className="text-muted-foreground" />
                                    <div className="flex items-start gap-1">
                                        <span><MapPin size={20} className="text-muted-foreground mt-0.5" /></span>
                                        <p>{rideData?.destinationLocation.address}</p>
                                    </div>
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold mt-6">Time Stamps</h3>
                                </div>
                                <ul className="">
                                    {rideData?.statusHistory?.requestedAt &&
                                        <li className="flex items-start gap-2 mb-2">
                                            <span><Timer className="size-5 mt-1" /></span>
                                            <span>Requested at {format(new Date(rideData?.statusHistory?.requestedAt), "MMM dd, yyyy, hh:mm a")}</span>
                                        </li>}
                                    {rideData?.statusHistory?.acceptedAt &&
                                        <li className="flex items-start gap-2 mb-2">
                                            <span><Timer className="size-5 mt-1" /></span>
                                            <span>Accepted at {format(new Date(rideData?.statusHistory?.acceptedAt), "MMM dd, yyyy, hh:mm a")}</span>
                                        </li>}
                                    {rideData?.statusHistory?.pickedUpAt &&
                                        <li className="flex items-start gap-2 mb-2">
                                            <span><Timer className="size-5 mt-1" /></span>
                                            <span>Picked Up at {format(new Date(rideData?.statusHistory?.pickedUpAt), "MMM dd, yyyy, hh:mm a")}</span>
                                        </li>}
                                    {rideData?.statusHistory?.inTransitAt &&
                                        <li className="flex items-start gap-2 mb-2">
                                            <span><Timer className="size-5 mt-1" /></span>
                                            <span>InTransit at{format(new Date(rideData?.statusHistory?.inTransitAt), "MMM dd, yyyy, hh:mm a")}</span>
                                        </li>}
                                    {rideData?.statusHistory?.completedAt &&
                                        <li className="flex items-start gap-2 mb-2">
                                            <span><Timer className="size-5 mt-1" /></span>
                                            <span>Completed at {format(new Date(rideData?.statusHistory?.completedAt), "MMM dd, yyyy, hh:mm a")}</span>
                                        </li>}
                                </ul>
                            </div>
                            <div className="pt-6 pb-4 space-y-2">
                                <div className="flex justify-between">
                                    <Button size={"sm"} onClick={() => handleStatus(rideData?._id, ActionButton)}>{ActionButton}</Button>
                                    <div className="flex items-center gap-3">
                                        <div className="flex justify-center items-center rounded-full border w-10 h-10" >
                                            <Bike />
                                        </div>
                                        <div>
                                            <p className="text-xl font-bold">{rideData?.status?.charAt(0).toUpperCase() + rideData?.status?.slice(1).toLowerCase()}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>}

            </div>
        </div>
    );
};

export default ActiveRide;