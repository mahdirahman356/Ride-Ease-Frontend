import type { ILocation } from "@/types";
import axios from "axios";
import { useEffect, useState } from "react";

const useMapRoute = (pickupLocation?: ILocation, destinationLocation?: ILocation) => {

    const [route, setRoute] = useState([]);

    useEffect(() => {

        if (
            !pickupLocation?.latitude ||
            !pickupLocation?.longitude ||
            !destinationLocation?.latitude ||
            !destinationLocation?.longitude
        ) {
            setRoute([]); 
            return;
        }

        async function fetchRoute() {
            try {
                const url = `https://router.project-osrm.org/route/v1/driving/${pickupLocation?.longitude},${pickupLocation?.latitude};${destinationLocation?.longitude},${destinationLocation?.latitude}?overview=full&geometries=geojson`;
                const res = await axios.get(url)
                const coords = res.data.routes[0].geometry.coordinates.map(
                    (coord: number[]) => [coord[1], coord[0]]
                )
                setRoute(coords)
            } catch (err) {
                console.error("Failed to fetch route", err);
            }
        }
        fetchRoute()
    }, [pickupLocation?.latitude, pickupLocation?.longitude, destinationLocation?.latitude, destinationLocation?.longitude])

    return route
};

export default useMapRoute;