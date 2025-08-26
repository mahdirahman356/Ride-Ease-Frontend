import { Check } from "lucide-react";

const ServiceHighlights = () => {
    return (
        <section className="px-6 py-6 lg:py-16">
            <div className="container flex flex-col lg:flex-row-reverse lg:gap-8 lg:items-center">
                <div className="w-full lg:w-1/2 mb-12">
                    <div className="lg:max-w-lg">
                        <h1 className="text-3xl font-semibold lg:text-4xl mb-12">One Platform, Three Powerful Experiences</h1>
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

                <div className="h-96 w-full lg:w-1/2">
                    <img className="object-cover w-full h-full rounded-md" src="https://images.unsplash.com/photo-1555181126-cf46a03827c0?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80" alt="glasses photo" />
                </div>
            </div>
        </section>
    );
};

export default ServiceHighlights;