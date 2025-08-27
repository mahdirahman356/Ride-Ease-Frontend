/* eslint-disable @typescript-eslint/no-explicit-any */
import { useUserInfoQuery } from "@/redux/features/auth/auth.api";
import OfflineNotice from "./OfflineNotice";
import { useAssignRideMutation, useGetRideRequestsQuery } from "@/redux/features/driver/driver.api";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import type { IRide } from "@/types";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { LoaderCircleIcon } from "lucide-react";

const Requests = () => {

    const [assignRide] = useAssignRideMutation()
    const { data, isLoading } = useUserInfoQuery(undefined)
    const { data: rideRequeste, isLoading: isLoadingRideRequestes } = useGetRideRequestsQuery(undefined)
    console.log(rideRequeste?.data?.message)

    const handleStatus = async (id: string, status: string) => {
        console.log(id, status)
        const toastId = toast.loading("Loading...")
        try {
            const res = await assignRide({ id, data: { status: status } }).unwrap()
            console.log(res)
            if (res.success && res.message === "Ride status has been updated to 'ACCEPTED'.") {
                toast.success("You have accepted the ride.", { id: toastId })
            } else if (res.success && res.message === "Ride status has been updated to 'REJECTED'.") {
                toast.success("You have rejected the ride.", { id: toastId })
            }
        } catch (error: any) {
            console.log(error)
            if (error.status === 403 && error.data.message === "You already have an active ride") {
                toast.error("You already have an active ride", { id: toastId })
            }
        }
    }


    if (!isLoading && data?.data?.isOnline === false) {
        return <OfflineNotice />
    }

    if (isLoadingRideRequestes) {
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
            {rideRequeste?.data?.message ? <p className="text-center mt-20 text-muted-foreground">{rideRequeste?.data?.message}</p> :
                <div className="p-4">
                    <Table>
                        <TableHeader>
                            <TableRow className="hover:bg-transparent text-nowrap">
                                <TableHead>Pickup Location</TableHead>
                                <TableHead>Destination Location</TableHead>
                                <TableHead>Rider</TableHead>
                                <TableHead>Fare range</TableHead>
                                <TableHead>Requested At</TableHead>
                                <TableHead>Action</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {rideRequeste?.data?.map((item: IRide) => (
                                <TableRow key={item._id} className="text-nowrap">
                                    <TableCell>{item.pickupLocation}</TableCell>
                                    <TableCell>{item.destinationLocation}</TableCell>
                                    <TableCell> <div className="flex items-center gap-3">
                                        <div>
                                            <div className="font-medium">{item.rider?.name}</div>
                                            <span className="text-muted-foreground mt-0.5 text-xs">
                                                {item.rider?.address ? item.rider?.address : "Address not provided"}
                                            </span>
                                        </div>
                                    </div></TableCell>
                                    <TableCell >{item.fareEstimation}TK</TableCell>
                                    <TableCell > {format(new Date(item.statusHistory.requestedAt), "PP")}</TableCell>
                                    <TableCell >
                                        <Button onClick={() => handleStatus(item._id, "ACCEPTED")} className="mr-4" size={"sm"}>Accept</Button>
                                        <Button onClick={() => handleStatus(item._id, "REJECTED")} size={"sm"}>Reject</Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>}
        </div>
    );
};

export default Requests;