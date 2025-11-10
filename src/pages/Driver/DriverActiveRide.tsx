/* eslint-disable @typescript-eslint/no-explicit-any */
import {
    MapPinIcon,
    NavigationIcon,
    HomeIcon,
    DollarSignIcon,
    CreditCardIcon,
    Navigation,
    LoaderCircleIcon,
} from 'lucide-react'
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import { Button } from '@/components/ui/button'
import { useAssignRideMutation, useGetActiveRideQuery } from '@/redux/features/driver/driver.api'
import FitBounds from '@/modules/Map/FitBounds'
import useMapRoute from '@/hooks/useRoute'
import userImage from '../../assets/image/user-icon.jpg'
import { format } from "date-fns";
import type { StatusHistory } from '@/types'
import RideTimeline from '@/components/RideTimeline'
import { toast } from 'sonner'

export function DriverActiveRide() {

    const { data, isLoading } = useGetActiveRideQuery(undefined)
    const [assignRide] = useAssignRideMutation()
    const rideData = data?.data?.[0]
    const riderInfo = data?.data?.[0]?.rider

    const timelineMap: Record<keyof StatusHistory, string> = {
        requestedAt: "Requested",
        acceptedAt: "Accepted",
        pickedUpAt: "Picked Up",
        inTransitAt: "In Transit",
        completedAt: "Completed",
    };
    const timelineData = Object.entries(rideData?.statusHistory ?? {}).map(([key, value], index) => {
        if (!value) return null;

        const dateStr = value as string;
        return {
            id: index + 1,
            date: format(new Date(dateStr), "MMM dd, yyyy, hh:mm a"),
            title: timelineMap[key as keyof StatusHistory],
            // description: `Status changed to "${timelineMap[key as keyof StatusHistory]}"`
        };
    })
        .filter(Boolean);
    console.log(timelineData)

    const route = useMapRoute(rideData?.pickupLocation, rideData?.destinationLocation);

    const ActionButton = rideData?.status === "ACCEPTED"
        ? "Picked Up"
        : rideData?.status === "PICKED_UP"
            ? "In_Transit"
            : "Completed";

    const handleStatus = async (id: string, status: string) => {
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
        <div className="w-full min-h-[calc(100vh-4rem)]">
            {data?.data?.message ? <p className="text-center mt-20 text-muted-foreground">{data?.data?.message}</p> :
                <div className="flex flex-col lg:flex-row h-[calc(100vh-4rem)]">
                    {/* Left Side - Ride Details */}
                    <div className="w-full lg:w-2/5 p-4 md:p-6 overflow-y-auto no-scrollbar">
                        <div className="max-w-xl mx-auto space-y-6">
                            {/* Status Badge */}
                            <div className="flex items-center justify-between">
                                <h1 className="text-2xl font-bold">Your Ride</h1>
                                <div className="flex items-center gap-2">
                                    <span className="uppercase text-sm tracking-[0.3em]"> {rideData?.status}</span>
                                    <span className="p-3 bg-muted rounded-full hidden lg:inline "><Navigation size={18} /></span>
                                </div>

                            </div>
                            {/* Rider Information */}
                            <div className="p-6 rounded-md border border-muted shadow-sm">
                                <h2 className="text-lg font-semibold mb-4">
                                    Rider Information
                                </h2>

                                <div className="flex items-center space-x-4 mb-4">
                                    <img
                                        src={riderInfo?.image ? riderInfo?.image : userImage}
                                        alt={riderInfo?.name}
                                        className="w-14 h-14 rounded-full object-cover border-2 border-muted shadow-md"
                                    />
                                    <div>
                                        <h3 className="text-lg font-semibold">
                                            {riderInfo?.name}
                                        </h3>
                                        <p className="text-sm text-muted-foreground">{riderInfo?.phone}</p>
                                    </div>
                                </div>
                                <div className="flex flex-col">
                                    <div className='flex items-start gap-1'>
                                        <HomeIcon size={15} className='mt-0.5 text-muted-foreground' />
                                        <p className="text-sm text-muted-foreground">Address</p>
                                    </div>
                                    <p className="text-sm font-medium">
                                        {riderInfo?.address}
                                    </p>
                                </div>
                            </div>
                            {/* Route Information */}
                            <div className="p-6 rounded-md border border-muted shadow-sm">
                                <h2 className="text-lg font-semibold mb-4">
                                    Route Details
                                </h2>
                                {/* Pickup Location */}
                                <div className="flex items-start mb-4 pb-4 border-b border-muted">
                                    <div className="flex-shrink-0 w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                                        <MapPinIcon className="w-5 h-5 text-green-600" />
                                    </div>
                                    <div className="ml-3 flex-1">
                                        <p className="text-sm font-medium text-muted-foreground">
                                            Pickup Location
                                        </p>
                                        <p className="text-base font-semibold">
                                            {rideData.pickupLocation.address}
                                        </p>
                                        <p className="text-xs text-muted-foreground mt-1">
                                            {rideData.pickupLocation.latitude.toFixed(5)},{' '}
                                            {rideData.pickupLocation.longitude.toFixed(5)}
                                        </p>
                                    </div>
                                </div>
                                {/* Destination Location */}
                                <div className="flex items-start">
                                    <div className="flex-shrink-0 w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                                        <NavigationIcon className="w-5 h-5 text-red-600" />
                                    </div>
                                    <div className="ml-3 flex-1">
                                        <p className="text-sm font-medium text-muted-foreground">
                                            Destination
                                        </p>
                                        <p className="text-base font-semibold">
                                            {rideData.destinationLocation.address}
                                        </p>
                                        <p className="text-xs text-muted-foreground mt-1">
                                            {rideData.destinationLocation.latitude.toFixed(5)},{' '}
                                            {rideData.destinationLocation.longitude.toFixed(5)}
                                        </p>
                                    </div>
                                </div>
                            </div>
                            {/* Fare and Payment */}
                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-green-50 p-4 rounded-md border border-muted shadow-sm">
                                    <div className="flex items-center mb-2">
                                        <DollarSignIcon className="w-5 h-5 text-green-600 mr-2" />
                                        <p className="text-sm text-muted-foreground">Fare Estimation</p>
                                    </div>
                                    <p className="text-lg font-bold">
                                        {rideData.fareEstimation} TK
                                    </p>
                                </div>
                                <div className="bg-purple-50 p-4 rounded-md border border-muted shadow-sm">
                                    <div className="flex items-center mb-2">
                                        <CreditCardIcon className="w-5 h-5 text-purple-600 mr-2" />
                                        <p className="text-sm text-muted-foreground">Payment Method</p>
                                    </div>
                                    <p className="text-lg font-bold capitalize">
                                        {rideData.paymentMethod}
                                    </p>
                                </div>
                            </div>
                            {/* Status Timeline */}
                            <div className="p-6 rounded-md border border-muted shadow-sm">
                                <h2 className="text-lg font-semibold mb-4">
                                    Ride Timeline
                                </h2>
                                <div className="px-5">
                                    <RideTimeline timelineData={timelineData} />
                                </div>
                            </div>
                            {/* Action Button */}
                            <Button
                                className='w-full rounded-md'
                                onClick={() =>
                                    handleStatus(rideData?._id, ActionButton)}
                            >{ActionButton}
                            </Button>
                        </div>
                    </div>
                    {/* Right Side - Map */}
                    <div className="w-full lg:w-3/5 h-96 lg:h-full">
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
                </div>}
        </div>
    )
}
