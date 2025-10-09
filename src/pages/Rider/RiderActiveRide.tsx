import { useGetRiderActiveRideQuery } from "@/redux/features/rider/rider.api";
import { LoaderCircleIcon } from "lucide-react";


const RiderActiveRide = () => {
    const { data, isLoading } = useGetRiderActiveRideQuery(undefined)
    const rideData = data?.data?.[0]

    console.log("pickupLocation:", rideData?.pickupLocation)
    console.log("destinationLocation:", rideData?.destinationLocation)

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
           Rider Active Ride
       </div>
    );
};

export default RiderActiveRide;