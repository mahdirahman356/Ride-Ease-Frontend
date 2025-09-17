
const getCoordinates = async (address: string) => {
    const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`
    );
    const data = await response.json();
    if (data.length > 0) {
        return {
            latitude: parseFloat(data[0].lat),
            longitude: parseFloat(data[0].lon),
        };
    }
    throw new Error("Address not found");
};

export default getCoordinates;