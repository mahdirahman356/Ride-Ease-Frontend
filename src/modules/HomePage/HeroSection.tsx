import { Button } from "@/components/ui/button";
import heroImage from "../../assets/image/hero-image.jpg"
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
const HeroSection = () => {
    return (
        <header>
            <div className="flex flex-col py-6 px-6 lg:py-10 mx-auto space-y-6 lg:h-[32rem] md:flex-row items-center mt-6 lg:mt-10">
                <div className="flex flex-col md:items-center w-full lg:flex-row lg:w-1/2">
                    <div className="flex justify-center order-2 mt-10 lg:mt-0 lg:space-y-3 lg:flex-col">
                        <button className="w-3 h-3 mx-2 bg-primary rounded-full lg:mx-0 focus:outline-none"></button>
                        <button className="w-3 h-3 mx-2 bg-ring rounded-full lg:mx-0 focus:outline-none hover:bg-primary"></button>
                        <button className="w-3 h-3 mx-2 bg-ring rounded-full lg:mx-0 focus:outline-none hover:bg-primary"></button>
                        <button className="w-3 h-3 mx-2 bg-ring rounded-full lg:mx-0 focus:outline-none hover:bg-primary"></button>
                    </div>

                    <div className="max-w-lg lg:mx-12 lg:order-2 md:mr-10 space-y-10">
                        <h1 className="text-4xl lg:text-5xl font-medium">Fast <span className="font-[100]">Safe Rides</span> <br />  Your  <span className="font-[100]">Way</span></h1>
                        <p className="text-muted-foreground text-sm md:text-base">Book a ride in seconds, track it live, and reach your destination comfortably. Whether you’re a Rider, Driver, or Admin, manage everything with ease</p>
                        <div className="flex justify-center sm:justify-start">
                            <Link to={"/rider/ride-request"}>
                                <Button className="flex items-center justify-between p-3 text-xs rounded-full">
                                    <span className="px-4 tracking-[0.2em] uppercase">Book Your Ride</span>
                                    <div className="flex items-center gap-2">
                                        <span className="p-3 bg-muted rounded-full text-primary"><ArrowRight size={18} /></span>
                                    </div>
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="hidden md:flex items-center justify-center w-full h-96 lg:w-1/2">
                    <img className="object-cover w-full h-full max-w-2xl rounded-md" src={heroImage} alt="apple watch photo" />
                </div>
            </div>
        </header>
    );
};

export default HeroSection;