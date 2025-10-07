import type { GeoapifyPlace } from "@/types";
import { useState, useEffect } from "react";

export const useLocationSuggestions = (
  pickupValue: string,
  destinationValue: string,
  activeField: "pickup" | "destination" | null
) => {
  const [suggestions, setSuggestions] = useState<GeoapifyPlace[]>([]);
  const [notFound, setNotFound] = useState(false);

  // Fetch places from Geoapify API
  const fetchPlaces = async (input: string) => {
    try {
      const res = await fetch(
        `https://api.geoapify.com/v1/geocode/autocomplete?text=${encodeURIComponent(
          input + " Bangladesh"
        )}&limit=7&apiKey=${import.meta.env.VITE_GEOAPIFY_KEY}`
      );
      const data = await res.json();
      if (data.features?.length > 0) {
        setSuggestions(data.features || []);
        setNotFound(false)
      } else {
        setSuggestions([]);
        setNotFound(true)
      }
    } catch (error) {
      console.error("Error fetching location:", error);
      setSuggestions([]);
    }
  };

  // Handle suggestion updates with debounce
  useEffect(() => {
    const timeout = setTimeout(() => {
      let value = "";
      if (activeField === "pickup") value = pickupValue;
      if (activeField === "destination") value = destinationValue;

      if (value.length > 2) {
        fetchPlaces(value);
      } else {
        setSuggestions([]);
        setNotFound(true);
      }
    }, 300);

    return () => clearTimeout(timeout);
  }, [pickupValue, destinationValue, activeField]);

  return { suggestions, notFound };
};
