import { StepForward } from "lucide-react";

const OverviewSection = () => {
    return (
        <section>
            <div className="px-6 py-6 lg:py-16">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    <div className="rounded-md bg-muted p-4 shadow-xs outline-none space-y-3">
                        <div className="flex grow items-center gap-3">
                            <div className="rounded-full p-2 bg-primary text-muted">
                                <StepForward size={16} />
                            </div>
                            <p className="text-xl font-semibold">Step 1</p>
                        </div>
                        <p className="pl-10 text-muted-foreground text-sm md:text-base">Enter your pickup and destination, choose your preferred vehicle, and confirm your booking in seconds.</p>
                    </div>
                    <div className="rounded-md bg-muted p-4 shadow-xs outline-none space-y-3">
                        <div className="flex grow items-center gap-3">
                            <div className="rounded-full p-2 bg-primary text-muted">
                                <StepForward size={16} />
                            </div>
                            <p className="text-xl font-semibold">Step 2</p>
                        </div>
                        <p className="pl-10 text-muted-foreground text-sm md:text-base">Nearby drivers get your request instantly. The best-matched driver accepts and heads towards your pickup location.</p>
                    </div>
                    <div className="rounded-md bg-muted p-4 shadow-xs outline-none space-y-3">
                        <div className="flex grow items-center gap-3">
                            <div className="rounded-full p-2 bg-primary text-muted">
                                <StepForward size={16} />
                            </div>
                            <p className="text-xl font-semibold">Step 3</p>
                        </div>
                        <p className="pl-10  text-muted-foreground text-sm md:text-base">Track your ride in real-time, pay securely, and reach your destination comfortably and safely.</p>
                    </div>
                    <div className="rounded-md bg-muted p-4 shadow-xs outline-none space-y-3">
                        <div className="flex grow items-center gap-3">
                            <div className="rounded-full p-2 bg-primary text-muted">
                                <StepForward size={16} />
                            </div>
                            <p className="text-xl font-semibold">Step 4</p>
                        </div>
                        <p className="pl-10  text-muted-foreground text-sm md:text-base">After the ride, share your feedback and rate your driver to keep the community safe and reliable.</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default OverviewSection;