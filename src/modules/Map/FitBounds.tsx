import type { ILocation } from "@/types";
import { useEffect } from "react";
import { useMap } from "react-leaflet";
import L from "leaflet";

const FitBounds = (
    { pickupLocation, destinationLocation }:
    { pickupLocation: ILocation, destinationLocation: ILocation }
) => {

    const map = useMap()

    useEffect(() => {

        if(pickupLocation && destinationLocation){
            const bounds = L.latLngBounds([
                [pickupLocation.latitude, pickupLocation.longitude],
                [destinationLocation.latitude, destinationLocation.longitude]
            ]);
            map.fitBounds(bounds, {padding: [50, 50]})
        }

    }, [pickupLocation, destinationLocation, map])

    return null
};

export default FitBounds;