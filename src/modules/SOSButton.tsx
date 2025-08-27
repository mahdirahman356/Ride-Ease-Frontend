import { Button } from "@/components/ui/button";
import { useState } from "react";
import { TbSos } from "react-icons/tb";

export default function SOSButton() {
    const [isOpen, setIsOpen] = useState(false);

    const callPolice = () => {
        window.location.href = "tel:999"; 
    };

    const notifyContact = () => {
        alert("🚨 Emergency contact notified!");
    };

    const shareLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                const lat = position.coords.latitude;
                const lng = position.coords.longitude;
                const mapsLink = `https://www.google.com/maps?q=${lat},${lng}`;
                alert(`📍 Location shared: ${mapsLink}`);
            });
        } else {
            alert("❌ Geolocation not supported!");
        }
    };

    return (
        <>
            {/* Floating SOS Button */}
            <Button
                onClick={() => setIsOpen(true)}
                className="fixed bottom-6 right-6 z-50 bg-red-600 text-white p-4 rounded-full shadow-lg hover:bg-red-700 transition"
            >
               <TbSos className="text-3xl"/>
            </Button>

            {/* Modal */}
            {isOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
                    <div className="bg-white rounded-lg shadow-xl p-6 w-80">
                        <h2 className="text-xl font-bold text-red-600 mb-4">Emergency SOS</h2>
                        <p className="text-gray-600 mb-4">Choose an emergency action:</p>

                        <div className="space-y-3">
                            <button
                                onClick={callPolice}
                                className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700"
                            >
                                 Call Police
                            </button>
                            <button
                                onClick={notifyContact}
                                className="w-full bg-yellow-500 text-white py-2 rounded hover:bg-yellow-600"
                            >
                                 Notify Contact
                            </button>
                            <button
                                onClick={shareLocation}
                                className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
                            >
                                 Share Live Location
                            </button>
                        </div>

                        <div className="flex justify-end">
                            <Button
                            onClick={() => setIsOpen(false)}
                            className="mt-3"
                            size={"sm"}

                        >
                             Close
                        </Button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
