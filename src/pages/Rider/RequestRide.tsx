import RideRequestForm from "@/modules/Rider/RideRequestForm";

const RequestRide = () => {
    return (
         <div className="flex justify-center items-center">
            <div className="w-full max-w-sm p-4">
                <RideRequestForm />
            </div>
        </div>
    );
};

export default RequestRide;