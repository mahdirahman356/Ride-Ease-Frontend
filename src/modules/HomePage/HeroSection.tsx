import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const HeroSection = () => {
    return (
        <header>
            <div className="flex flex-col py-6 px-6 lg:py-16 mx-auto space-y-6 lg:h-[32rem] md:flex-row items-center mt-6 lg:mt-16">
                <div className="flex flex-col md:items-center w-full lg:flex-row lg:w-1/2">
                    <div className="flex justify-center order-2 mt-6 lg:mt-0 lg:space-y-3 lg:flex-col">
                        <button className="w-3 h-3 mx-2 bg-primary rounded-full lg:mx-0 focus:outline-none"></button>
                        <button className="w-3 h-3 mx-2 bg-ring rounded-full lg:mx-0 focus:outline-none hover:bg-primary"></button>
                        <button className="w-3 h-3 mx-2 bg-ring rounded-full lg:mx-0 focus:outline-none hover:bg-primary"></button>
                        <button className="w-3 h-3 mx-2 bg-ring rounded-full lg:mx-0 focus:outline-none hover:bg-primary"></button>
                    </div>

                    <div className="max-w-lg lg:mx-12 lg:order-2 mr-5">
                        <h1 className="text-3xl font-semibold tracking-wide lg:text-4xl">Your Ride, Your Way <br /> Fast, Safe & Reliable!</h1>
                        <p className="my-6 md:my-4 text-muted-foreground text-sm md:text-base">Book a ride in seconds, track it live, and reach your destination comfortably. Whether you’re a Rider, Driver, or Admin, manage everything with ease</p>
                        <Button>
                            <Link to={"/login"}>Book Your Ride</Link>
                        </Button>
                    </div>
                </div>

                <div className="hidden md:flex items-center justify-center w-full h-96 lg:w-1/2">
                    <img className="object-cover w-full h-full max-w-2xl rounded-md" src="https://images.unsplash.com/photo-1579586337278-3befd40fd17a?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1352&q=80" alt="apple watch photo" />
                </div>
            </div>
        </header>
    );
};

export default HeroSection;