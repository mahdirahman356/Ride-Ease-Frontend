import { Check } from "lucide-react";
import highlightsImage from "../../assets/image/highlights-image.jpg"
const ServiceHighlights = () => {
    return (
        <section>
            <div className="flex flex-col lg:gap-8 py-6 px-6 lg:py-10 space-y-6 lg:h-[32rem] lg:flex-row items-center justify-between">
              <div className="w-full lg:w-1/2 mb-12">
                    <div className="lg:max-w-lg space-y-10">
                        <h1 className="text-4xl lg:text-5xl font-medium">Features <span className="font-[100]">That</span> <br />  Move  <span className="font-[100]">You</span></h1>
                        <div className="flex flex-wrap gap-6">
                            <div>
                                <h3 className="text-xl font-semibold flex items-center gap-1.5 mb-3">
                                    For Riders
                                </h3>
                                <ul>
                                    <li className="flex gap-3 items-center mb-3">
                                        <span><Check size={17} className="text-muted-foreground" /></span>
                                        <span className="text-sm">Easy Ride Booking</span>
                                    </li>

                                    <li className="flex items-center gap-3 mb-3">
                                        <span><Check size={17} className="text-muted-foreground" /></span>
                                        <span>Live Tracking</span>
                                    </li>

                                    <li className="flex items-center gap-3 mb-3">
                                        <span><Check size={17} className="text-muted-foreground" /></span>
                                        <span>Flexible Payments</span>
                                    </li>

                                    <li className="flex items-center gap-3 mb-3">
                                        <span><Check size={17} className="text-muted-foreground" /></span>
                                        <span>Ride History</span>
                                    </li>
                                    <li className="flex items-center gap-3 mb-3">
                                        <span><Check size={17} className="text-muted-foreground" /></span>
                                        <span>Profile Management</span>
                                    </li>
                                </ul>
                            </div>

                            <div>
                                <h3 className="text-xl font-semibold flex items-center gap-1.5 mb-2">
                                    For Drivers
                                </h3>
                                <div className="flex items-center gap-3 mb-3">
                                    <Check size={17} className="text-muted-foreground" />
                                    <span>Availability Control</span>
                                </div>

                                <div className="flex items-center gap-3 mb-3">
                                    <Check size={17} className="text-muted-foreground" />
                                    <span>Incoming Ride Requests</span>
                                </div>

                                <div className="flex items-center gap-3 mb-3">
                                    <Check size={17} className="text-muted-foreground" />
                                    <span>Active Ride Management</span>
                                </div>

                                <div className="flex items-center gap-3 mb-3">
                                    <Check size={17} className="text-muted-foreground" />
                                    <span>Earnings Dashboard</span>
                                </div>
                                <div className="flex items-center gap-3 mb-3">
                                    <Check size={17} className="text-muted-foreground" />
                                    <span>Profile Management</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className=" md:flex items-center justify-center w-full h-96 lg:w-1/2">
                    <img className="object-cover w-full h-full max-w-2xl rounded-md" src={highlightsImage} alt="apple watch photo" />
                </div>
            </div>
        </section>
    );
};

export default ServiceHighlights;