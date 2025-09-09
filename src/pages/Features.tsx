import { FaCarSide } from "react-icons/fa6";
import { HiMiniUsers } from "react-icons/hi2";
import { MdAdminPanelSettings } from "react-icons/md";
import { ArrowDown, CircleSmall } from "lucide-react";
const features = [
    {
        title: "Rider Features",
        icon: <HiMiniUsers className="w-10 h-10 text-muted" />,
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
        icon: <FaCarSide className="w-10 h-10 text-muted" />,
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
        icon: <MdAdminPanelSettings className="w-10 h-10 text-muted" />,
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
        <section className="py-6 px-6 lg:py-10 my-6 lg:my-10">
            <div>

                <div className="space-y-10 mb-6 lg:mb-10">
                    <h1 className="text-4xl lg:text-5xl font-medium">Everything <span className="font-[100]">You Need</span> <br />  for  <span className="font-[100]">Smarter Rides</span></h1>
                    <div className="flex items-center gap-2">
                        <span className="uppercase text-sm tracking-[0.3em]">Features</span>
                        <span className="p-3 bg-muted rounded-full"><ArrowDown size={18}/></span>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-6 mt-8">
                    {features.map((feature) => (
                        <div
                            key={feature.title}
                            className="rounded p-8 bg-muted"
                        >
                            <div className="flex items-center justify-center mb-4">
                                <div className="rounded-full bg-primary p-4">
                                    <span>{feature.icon}</span>
                                </div>
                            </div>
                            <h3 className="text-xl font-semibold text-center mb-6">
                                {feature.title}
                            </h3>
                            <ul className="space-y-3">
                                {feature.items.map((item, index) => (
                                    <li key={index} className="flex items-start gap-2">
                                        <li className="flex items-start gap-3 text-muted-foreground mt-2 text-sm md:text-base">
                                            <span><CircleSmall className="size-4 mt-1" /></span>
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