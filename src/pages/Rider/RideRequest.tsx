/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm, type FieldValues, type SubmitHandler } from "react-hook-form";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRequestRideMutation } from "@/redux/features/rider/rider.api";
import { toast } from "sonner";
import { MapContainer, Marker, Polyline, Popup, TileLayer } from 'react-leaflet'
import FitBounds from "@/modules/Map/FitBounds";
import useRoute from "@/hooks/useRoute";
import { useState } from "react";
import type { ILocation } from "@/types";
import { useLocationSuggestions } from "@/hooks/useLocationSuggestions";



const RideRequestSchema = z.object({
    pickupLocation: z
        .string()
        .min(3, { message: "Address is too short" })
        .max(200, { message: "Address is too long" })
        .nonempty("Pickup Location is required"),
    destinationLocation: z
        .string()
        .min(3, { message: "Destination Location is too short" })
        .max(200, { message: "Destination Location is too long" })
        .nonempty("Destination Location is required"),
    fareEstimation: z
        .string()
        .nonempty("Payment Method is required"),
    paymentMethod: z
        .string()
        .nonempty("Payment Method is required")
})



const RideRequest = () => {


    const [requestRider] = useRequestRideMutation()

    const [pickupLocation, setPickupLocation] = useState<ILocation | undefined>(undefined);
    const [destinationLocation, setDestinationLocation] = useState<ILocation | undefined>(undefined);
    const [activeField, setActiveField] = useState<"pickup" | "destination" | null>(null);

    const form = useForm<z.infer<typeof RideRequestSchema>>({
        resolver: zodResolver(RideRequestSchema),
        defaultValues: {
            pickupLocation: "",
            destinationLocation: "",
            fareEstimation: "",
            paymentMethod: "",
        },
    });

    const pickupLocationValue = form.watch("pickupLocation");
    const destinationLocationValue = form.watch("destinationLocation");

    const { suggestions, notFound } = useLocationSuggestions(
        pickupLocationValue,
        destinationLocationValue,
        activeField
    );

    const handleSelectSuggestion = (place: any) => {
        const locationData: ILocation = {
            address: place?.properties?.formatted,
            latitude: place?.geometry?.coordinates[1],
            longitude: place?.geometry?.coordinates[0],
        }

        console.log(locationData)

        if (activeField === "pickup") {
            setPickupLocation(locationData)
            form.setValue("pickupLocation", place?.properties?.formatted)
        }
        if (activeField === "destination") {
            setDestinationLocation(locationData)
            form.setValue("destinationLocation", place?.properties?.formatted)
        }

        setActiveField(null);
    }


    const onSubmit: SubmitHandler<FieldValues> = async (data) => {

        const toastId = toast.loading("Loading...")
        try {

            const requestRideData = {
                ...data,
                pickupLocation: pickupLocation,
                destinationLocation: destinationLocation,
                fareEstimation: Number(data.fareEstimation),
            }
            console.log(requestRideData)

            const res = await requestRider(requestRideData).unwrap()
            console.log(res)
            if (res.success) {
                toast.success(res.message, { id: toastId })
            }

            console.log(requestRideData)

        } catch (error: any) {
            console.log("error", error)
            if (error.status === 400 && error.data.message === "You already have an active ride.") {
                toast.error("You already have an active ride.", { id: toastId })
            } else if (error.status === 404 && error.data.message === "No available drivers right now.") {
                toast.error("No available drivers right now.", { id: toastId })
            }

        }
    }

    const route = useRoute(pickupLocation, destinationLocation)


    return (
        <div className="flex flex-col lg:flex-row gap-12 justify-between items-start">
            <div className="flex flex-col justify-center items-center">
                <div className="flex flex-col gap-6 w-full lg:min-w-xs">
                    <h1 className="text-2xl lg:text-3xl font-medium">
                        Go  <span className="font-[100]"> anywhere with </span> <br />
                        Ride <span className="font-[100]">Ease</span>
                    </h1>
                    <div className="space-y-6">
                        <Form {...form}>
                            <form id="submit-request" onSubmit={form.handleSubmit(onSubmit)} className="grid sm:grid-cols-2 lg:grid-cols-1 gap-6">
                                {/* pickupLocation */}
                                <div className="relative">
                                    <FormField
                                        control={form.control}
                                        name="pickupLocation"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormControl>
                                                    <Input
                                                        placeholder="Pickup Location"
                                                        {...field}
                                                        onFocus={() => setActiveField("pickup")}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    {activeField === "pickup"  && (
                                        <ul className="absolute z-10 bg-background shadow-2xl  w-full rounded mt-1 max-h-72 overflow-y-auto custom-scroll">
                                            {notFound && (
                                                <li className="py-6 text-center text-sm text-muted-foreground">No results</li>
                                            )}
                                            {suggestions.map((s, i) => (
                                                <li
                                                    key={i}
                                                    className="p-2 hover:bg-muted cursor-pointer text-sm"
                                                    onClick={() => handleSelectSuggestion(s)}
                                                >
                                                    {s?.properties?.formatted}
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </div>
                                {/* destinationLocation */}
                                <div className="relative">
                                    <FormField
                                        control={form.control}
                                        name="destinationLocation"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormControl>
                                                    <Input
                                                        placeholder="Destination Location"
                                                        {...field}
                                                        onFocus={() => setActiveField("destination")}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    {activeField === "destination" && (
                                       <ul className="absolute z-10 bg-background shadow-2xl  w-full rounded mt-1 max-h-60 overflow-y-auto">
                                            {notFound && (
                                                <li className="py-6 text-center text-sm text-muted-foreground">No results</li>
                                            )}
                                            {suggestions.map((s, i) => (
                                                <li
                                                    key={i}
                                                    className="p-2 hover:bg-muted cursor-pointer text-sm"
                                                    onClick={() => handleSelectSuggestion(s)}
                                                >
                                                    {s?.properties?.formatted}
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </div>
                                {/* fareEstimation */}
                                <FormField
                                    control={form.control}
                                    name="fareEstimation"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormControl>
                                                <Input
                                                    type="number"
                                                    placeholder="Fare Estimation"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                {/* paymentMethod */}
                                <FormField
                                    control={form.control}
                                    name="paymentMethod"
                                    render={({ field }) => (
                                        <FormItem>
                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                <FormControl>
                                                    <SelectTrigger className="w-full">
                                                        <SelectValue placeholder="Select Payment Method" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    <SelectItem value="cash">Cash</SelectItem>
                                                    <SelectItem value="card">Card</SelectItem>
                                                    <SelectItem value="mobile">Mobile Payment</SelectItem>
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </form>
                            <Button type="submit" form="submit-request" className="w-full sm:w-32 lg:w-full">
                                Continue
                            </Button>
                        </Form>
                    </div>
                </div>
            </div>
            <div className="h-[500px] w-full rounded-lg overflow-hidden shadow">

                <MapContainer
                    center={[23.6850, 90.3563]}
                    zoom={12}
                    className="h-full w-full"
                >
                    {/* OpenStreetMap Tiles */}
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />

                    <>
                        {/* Pickup Marker */}
                        {pickupLocation && (
                            <Marker position={[pickupLocation.latitude, pickupLocation.longitude]}>
                                <Popup>
                                    <b>Pickup:</b> {pickupLocation.address}
                                </Popup>
                            </Marker>
                        )}

                        {/* Destination Marker */}
                        {pickupLocation && destinationLocation && (
                            <>
                                <Marker
                                    position={[destinationLocation.latitude, destinationLocation.longitude]}
                                >
                                    <Popup>
                                        <b>Destination:</b> {destinationLocation.address}
                                    </Popup>
                                </Marker>
                                <FitBounds
                                    pickupLocation={pickupLocation}
                                    destinationLocation={destinationLocation}
                                />
                                {route.length > 0 && <Polyline positions={route} color="blue" />}
                            </>
                        )}
                    </>

                </MapContainer>
            </div>
        </div>
    );
};

export default RideRequest;