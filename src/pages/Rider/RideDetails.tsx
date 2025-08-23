import { useGetMyRidesQuery } from "@/redux/features/rider/rider.api";
import { useParams } from "react-router";

const RideDetails = () => {

    const { id } = useParams()
    const { data } = useGetMyRidesQuery({ _id: id })
    const rideDetails = data?.data?.data[0]
    console.log(rideDetails)

    return (
        <div>
            Ride Details page
        </div>
    );
};

export default RideDetails;