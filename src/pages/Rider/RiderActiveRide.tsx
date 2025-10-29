import useMapRoute from "@/hooks/useRoute";
import { useGetRiderActiveRideQuery } from "@/redux/features/rider/rider.api";
import { Barcode, Car, CreditCard, LoaderCircleIcon, MapPin, Phone, UserRound } from "lucide-react";
import { MapContainer, Marker, Polyline, Popup, TileLayer } from 'react-leaflet'
import FitBounds from "@/modules/Map/FitBounds";
import type { StatusHistory } from "@/types";
import { format } from "date-fns";
import RideTimeline from "@/components/RideTimeline";


const RiderActiveRide = () => {
    const { data, isLoading } = useGetRiderActiveRideQuery(undefined)
    const rideData = data?.data?.[0]

    console.log("data:", rideData)

    const route = useMapRoute(rideData?.pickupLocation, rideData?.destinationLocation);

    const timelineMap: Record<keyof StatusHistory, string> = {
        requestedAt: "Ride Requested",
        acceptedAt: "Ride Accepted",
        pickedUpAt: "Picked Up",
        inTransitAt: "In Transit",
        completedAt: "Ride Completed",
    };

    const timelineData = Object.entries(rideData?.statusHistory ?? {}).map(([key, value], index) => {
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
            <div className="space-y-6 md:space-y-10">
                <div className="flex flex-col-reverse lg:flex-row gap-6 md:gap-10 justify-between items-start">
                    <div className="w-full lg:w-lg">
                        <div className="flex items-center gap-3">
                            <div className="flex justify-center items-center rounded-full bg-muted p-2.5" >
                                <Car size={25} className="text-muted-foreground" />
                            </div>
                            <div>
                                <p className="text-xl font-bold">{rideData?.status?.charAt(0).toUpperCase() + rideData?.status?.slice(1).toLowerCase()}</p>
                            </div>
                        </div>
                        <div className="flex flex-col justify-center col-span-12 align-middle p-5  lg:col-span-6 lg:h-auto">
                            <RideTimeline timelineData={timelineData} />
                        </div>
                    </div>

                    <div className="w-full">
                        <div className="h-[500px] w-full rounded-md overflow-hidden">
                            <MapContainer
                                center={[23.8103, 90.4125]}
                                zoom={12}
                                className="h-full w-full"
                            >
                                <TileLayer
                                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                />

                                <>
                                    {rideData?.pickupLocation && (
                                        <Marker position={[rideData?.pickupLocation.latitude, rideData?.pickupLocation.longitude]}>
                                            <Popup>
                                                <b>Pickup:</b> {rideData?.pickupLocation.address}
                                            </Popup>
                                        </Marker>
                                    )}
                                    {rideData?.destinationLocation && (
                                        <Marker
                                            position={[rideData?.destinationLocation.latitude, rideData?.destinationLocation.longitude]}
                                        >
                                            <Popup>
                                                <b>Destination:</b> {rideData?.destinationLocation.address}
                                            </Popup>
                                        </Marker>
                                    )}

                                    {rideData?.pickupLocation && rideData?.destinationLocation && (
                                        <>
                                            <FitBounds
                                                pickupLocation={rideData?.pickupLocation}
                                                destinationLocation={rideData?.destinationLocation}
                                            />
                                            {route.length > 0 && <Polyline positions={route} color="blue" />}
                                        </>
                                    )}
                                </>

                            </MapContainer>
                        </div>
                    </div>
                </div>

                <div className="flex flex-wrap gap-6 md:gap-10 items-stretch">
                    {/* Card 1 */}
                    <div className="flex-1 p-6 min-w-[300px] rounded-md border border-muted shadow-sm flex flex-col">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="flex justify-center items-center rounded-full bg-muted p-2.5" >
                                <MapPin size={25} className="text-muted-foreground" />
                            </div>
                            <div>
                                <p className="text-xl font-bold">Fare & Route Info</p>
                            </div>
                        </div>

                        <p className="text-muted-foreground mb-4">
                            Get a clear overview of your journey before you start the ride.
                        </p>

                        <div className="flex-1 space-y-4">
                            <div className="flex text-muted-foreground">
                                <span><CreditCard size={20} /></span>
                                <h1 className="px-2 text-sm">Fare: {rideData.fareEstimation} TK</h1>
                            </div>
                            <div className="flex text-muted-foreground">
                                <MapPin size={20} />
                                <h1 className="px-2 text-sm">Pickup: {rideData.pickupLocation.address}</h1>
                            </div>

                            <div className="flex text-muted-foreground">
                                <span><MapPin size={20} /></span>
                                <h1 className="px-2 text-sm">Destination: {rideData.destinationLocation.address}</h1>
                            </div>
                        </div>
                    </div>
                    {/* Card 2 */}
                    <div className="flex-1 p-6 min-w-[300px] rounded-md border border-muted shadow-sm flex flex-col">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="flex justify-center items-center rounded-full bg-muted p-2.5" >
                                <UserRound size={25} className="text-muted-foreground" />
                            </div>
                            <div>
                                <p className="font-semibold">{rideData?.driver?.name}</p>
                                <p className="text-muted-foreground text-xs">
                                    {rideData?.driver?.email}
                                </p>
                            </div>
                        </div>


                        <p className="text-muted-foreground mb-4">
                            Get a quick overview of the driver’s contact details and vehicle information.
                        </p>

                        <div className="flex-1 space-y-4">
                            <div className="flex text-muted-foreground">
                                <Phone size={20} />
                                <h1 className="px-2 text-sm">{rideData.driver.phone}</h1>
                            </div>

                            <div className="flex text-muted-foreground">
                                <MapPin size={20} />
                                <h1 className="px-2 text-sm">{rideData.driver.address}</h1>
                            </div>

                            <div className="flex text-muted-foreground">
                                <Car size={20} />
                                <h1 className="px-2 text-sm">{rideData.driver.vehicleInfo.model}</h1>
                            </div>

                            <div className="flex text-muted-foreground">
                                <Barcode size={20} />
                                <h1 className="px-2 text-sm">{rideData.driver.vehicleInfo.plateNumber}</h1>
                            </div>
                        </div>
                    </div>
                    {/* Card 3 */}
                    <div className="flex-1 p-6 min-w-[300px] rounded-md border border-muted shadow-sm flex flex-col justify-between">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="flex justify-center items-center rounded-full bg-muted p-2.5" >
                                <Car size={25} className="text-muted-foreground" />
                            </div>
                            <div>
                                <p className="text-xl font-bold text-nowrap">{rideData.driver.vehicleInfo.model}</p>
                            </div>
                        </div>

                        <img
                            src={rideData.driver.vehicleInfo.image}
                            alt="Shoes"
                            className="mb-4 rounded-md h-[200px] object-cover"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RiderActiveRide;