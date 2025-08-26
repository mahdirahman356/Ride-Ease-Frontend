/* eslint-disable @typescript-eslint/no-explicit-any */
import { useAssignRideMutation, useGetActiveRideQuery } from "@/redux/features/driver/driver.api";
import userImage from "../../assets/image/user-image.webp"
import { Bike, MapPin, MoveRight, Timer } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
const ActiveRide = () => {

    const { data } = useGetActiveRideQuery(undefined)
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


    return (
        <div>
            <div className="">
                {data?.data?.message ? <p className="text-center mt-20 text-muted-foreground">{data?.data?.message}</p> : 
                 <div className="container grid grid-cols-12 mx-auto">
                    <div className="flex flex-col justify-center col-span-12 align-middle   lg:col-span-6 lg:h-auto">
                        <div className="flex flex-col items-center p-8 py-12 text-center ">
                            <span>12 June</span>
                            <h1 className="py-4 text-2xl md:text-5xl font-bold">Lorem, ipsum dolor sit amet consectetur adipisicing.</h1>
                            <p className="pb-6">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas, a!</p>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-7 h-7">
                                <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path>
                            </svg>
                        </div>
                    </div>
                    <div className="flex flex-col col-span-12 p-6 divide-y lg:col-span-6 lg:p-10">
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
                            <div className="flex items-center gap-3">
                                <div className="flex items-center gap-1">
                                    <MapPin className="text-muted-foreground" />
                                    <p>{rideData?.pickupLocation}</p>
                                </div>
                                <MoveRight className="text-muted-foreground" />
                                <div className="flex items-center gap-1">
                                    <MapPin className="text-muted-foreground" />
                                    <p>{rideData?.destinationLocation}</p>
                                </div>
                            </div>
                            <div>
                                <h3 className="text-xl font-bold mt-6">Time Stamps</h3>
                            </div>
                            <ul className="px-4">
                                <li className="flex items-center gap-2 mb-2"><Timer className="size-5" /> Requested At</li>
                                <li className="flex items-center gap-2  mb-2"><Timer className="size-5" /> Requested At</li>
                                <li className="flex items-center gap-2  mb-2"><Timer className="size-5" /> Requested At</li>
                                <li className="flex items-center gap-2  mb-2"><Timer className="size-5" /> Requested At</li>
                            </ul>
                        </div>
                        <div className="pt-6 pb-4 space-y-2">
                            <div className="flex justify-between">
                                <Button onClick={() => handleStatus(rideData?._id, ActionButton)}>{ActionButton}</Button>
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