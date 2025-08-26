import { useGetMyRidesQuery } from "@/redux/features/rider/rider.api";
import { useParams } from "react-router";
import userImage from "../../assets/image/user-image.webp"
import { Bike, MapPin, MoveRight, Timer } from "lucide-react";
import { format } from "date-fns";
import type { StatusHistory } from "@/types";
import RideTimeline from "@/components/RideTimeline";
const RideDetails = () => {

    const { id } = useParams()
    const { data } = useGetMyRidesQuery({ _id: id })
    const rideDetails = data?.data?.data[0]
    console.log(rideDetails)

    const timelineMap: Record<keyof StatusHistory, string> = {
        requestedAt: "Ride Requested",
        acceptedAt: "Ride Accepted",
        pickedUpAt: "Picked Up",
        inTransitAt: "In Transit",
        completedAt: "Ride Completed",
    };

    const timelineData = Object.entries(rideDetails?.statusHistory ?? {}).map(([key, value], index) => {
        if (!value) return null;

        const dateStr = value as string;
        return {
            id: index + 1,
            date: format(new Date(dateStr), "MMM dd, yyyy, hh:mm a"),
            title: timelineMap[key as keyof StatusHistory],
            description: `Status changed to "${timelineMap[key as keyof StatusHistory]}"`
        };
    })
        .filter(Boolean);
    console.log(timelineData)

    return (
        <div>
            <div className="">
                {data?.data?.message ? <p className="text-center mt-20 text-muted-foreground">{data?.data?.message}</p> :
                    <div className="container grid grid-cols-12 mx-auto">
                        <div className="flex flex-col justify-center col-span-12 align-middle   lg:col-span-6 lg:h-auto">
                            <RideTimeline timelineData={timelineData}/>
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
                                        <div className="font-medium">{rideDetails?.driver?.name}</div>
                                        <span className="text-muted-foreground mt-0.5 text-xs">
                                            {rideDetails?.driver?.address ? rideDetails?.rider?.address : "Address not provided"}
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className="pt-6 pb-4 space-y-2">
                                <div className="flex items-center gap-3">
                                    <div className="flex items-center gap-1">
                                        <MapPin className="text-muted-foreground" />
                                        <p>{rideDetails?.pickupLocation}</p>
                                    </div>
                                    <MoveRight className="text-muted-foreground" />
                                    <div className="flex items-center gap-1">
                                        <MapPin className="text-muted-foreground" />
                                        <p>{rideDetails?.destinationLocation}</p>
                                    </div>
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold mt-6">Time Stamps</h3>
                                </div>
                                <ul className="px-4">
                                    <li className="flex items-center gap-2 mb-2"><Timer className="size-5" />
                                        {rideDetails?.statusHistory?.requestedAt &&
                                            `Requested at ${format(new Date(rideDetails?.statusHistory?.requestedAt), "MMM dd, yyyy, hh:mm a")}`}
                                    </li>
                                    <li className="flex items-center gap-2 mb-2"><Timer className="size-5" />
                                        {rideDetails?.statusHistory?.acceptedAt &&
                                            `Accepted at ${format(new Date(rideDetails?.statusHistory?.acceptedAt), "MMM dd, yyyy, hh:mm a")}`}
                                    </li>
                                    <li className="flex items-center gap-2 mb-2"><Timer className="size-5" />
                                        {rideDetails?.statusHistory?.pickedUpAt &&
                                            `Picked up at ${format(new Date(rideDetails?.statusHistory?.pickedUpAt), "MMM dd, yyyy, hh:mm a")}`}
                                    </li>
                                    <li className="flex items-center gap-2 mb-2"><Timer className="size-5" />
                                        {rideDetails?.statusHistory?.inTransitAt &&
                                            `In transit at ${format(new Date(rideDetails?.statusHistory?.inTransitAt), "MMM dd, yyyy, hh:mm a")}`}
                                    </li>
                                    <li className="flex items-center gap-2 mb-2"><Timer className="size-5" />
                                        {rideDetails?.statusHistory?.completedAt &&
                                            `Completed at ${format(new Date(rideDetails?.statusHistory?.completedAt), "MMM dd, yyyy, hh:mm a")}`}
                                    </li>
                                </ul>
                            </div>
                            <div className="pt-6 pb-4 space-y-2">
                                <div className="flex justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="flex justify-center items-center rounded-full border w-10 h-10" >
                                            <Bike />

                                        </div>
                                        <div>
                                            <p className="text-xl font-bold">{rideDetails?.status?.charAt(0).toUpperCase() + rideDetails?.status?.slice(1).toLowerCase()}</p>
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

export default RideDetails;