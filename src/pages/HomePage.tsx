import CallToAction from "@/modules/HomePage/CallToAction";
import HeroSection from "@/modules/HomePage/HeroSection";
import OverviewSection from "@/modules/HomePage/OverviewSection";
import ServiceHighlights from "@/modules/HomePage/ServiceHighlights";

const HomePage = () => {
    return (
        <div>
            <HeroSection />
            <OverviewSection />
            <ServiceHighlights />
            {/* <FeedbackSection /> */}
            <CallToAction />
        </div>
    );
};

export default HomePage;