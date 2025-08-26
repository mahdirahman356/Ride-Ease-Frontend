import { FaCarSide } from "react-icons/fa6";
import { HiMiniUsers } from "react-icons/hi2";
import { MdAdminPanelSettings } from "react-icons/md";
import { Check } from "lucide-react"; 
const features = [
    {
        title: "Rider Features",
        icon: <HiMiniUsers className="w-10 h-10 text-sky-500" />,
        items: [
            "Easy Ride Booking with pickup & destination",
            "Fare Estimation before confirming rides",
            "Multiple Payment Options (cash, card, wallet)",
            "Real-time Ride Tracking with driver details",
            "Ride History with search & filters",
            "Profile Management",
            "SOS Safety Button with live location sharing",
        ],
    },
    {
        title: "Driver Features",
        icon: <FaCarSide className="w-10 h-10 text-green-400" />,
        items: [
            "Online/Offline Availability Toggle",
            "Accept or Reject incoming ride requests",
            "Active Ride Management with stepwise status updates",
            "Earnings Dashboard (daily, weekly, monthly charts)",
            "Ride History with advanced filters",
            "Profile Management (vehicle & contact info)",
            "SOS Safety Button for emergencies",
        ],
    },
    {
        title: "Admin Features",
        icon: <MdAdminPanelSettings className="w-10 h-10 text-red-400" />,
        items: [
            "User Management (search, filter, block/unblock)",
            "Approve or Suspend Drivers",
            "Ride Oversight with advanced filters",
            "Analytics Dashboard (revenue, ride volume, activity)",
            "Consistent Search & Filter tools",
            "Profile Management for admin accounts",
            "System Oversight & Policy Management",
        ],
    },
];

const Features = () => {
    return (
        <section className="py-6 px-6 lg:py-16">
            <div className="">
                <h1 className="text-2xl font-semibold lg:text-3xl mt-6">Features</h1>

                <div className="mt-2">
                    <span className="inline-block w-40 h-1 bg-primary rounded-full"></span>
                    <span className="inline-block w-3 h-1 ml-1 bg-primary rounded-full"></span>
                    <span className="inline-block w-1 h-1 ml-1 bg-primary rounded-full"></span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-6 mt-8">
                    {features.map((feature) => (
                        <div
                            key={feature.title}
                            className="rounded-sm shadow-md p-8 hover:shadow-xl transition-shadow duration-300"
                        >
                            <div className="flex items-center justify-center mb-4">
                                <div className="rounded-full bg-muted p-4">
                                    <span>{feature.icon}</span>
                                </div>
                            </div>
                            <h3 className="text-xl font-semibold text-center mb-6">
                                {feature.title}
                            </h3>
                            <ul className="space-y-3">
                                {feature.items.map((item, index) => (
                                    <li key={index} className="flex items-start gap-3">
                                        <li className="flex items-start gap-3 text-muted-foreground mt-2 text-sm md:text-base">
                                            <span><Check className="size-4 mt-1 text-blue-500" /></span>
                                            <span>{item}</span>
                                        </li>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Features;
