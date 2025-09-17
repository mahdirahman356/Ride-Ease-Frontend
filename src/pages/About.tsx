import aboutSectionimage1 from "../assets/image/about-section-image-1.jpg"
import aboutSectionimage2 from "../assets/image/about-section-image-2.jpg"
import { CircleSmall } from "lucide-react";

const teamMembers = [
    {
        name: "Jane Doe",
        role: "CEO & Founder",
        image: "https://i.ibb.co/LzsXvbRv/author-7.jpg",
        bio: "Jane has 10+ years in tech and transport, passionate about creating innovative solutions.",
        linkedin: "#",
        twitter: "#",
    },
    {
        name: "John Smith",
        role: "CTO",
        image: "https://i.ibb.co/LzsXvbRv/author-7.jpg",
        bio: "John ensures RideXpress’s platform remains fast, reliable, and secure with his full-stack expertise.",
        linkedin: "#",
        twitter: "#",
    },
    {
        name: "Sarah Lee",
        role: "Head of Operations",
        image: "https://i.ibb.co/LzsXvbRv/author-7.jpg",
        bio: "Sarah oversees day-to-day operations and driver support, ensuring smooth ride experiences.",
        linkedin: "#",
        twitter: "#",
    },
    {
        name: "Michael Tan",
        role: "Lead Designer",
        image: "https://i.ibb.co/LzsXvbRv/author-7.jpg",
        bio: "Michael creates intuitive, user-friendly interfaces, ensuring a polished experience across devices.",
        linkedin: "#",
        twitter: "#",
    },
    {
        name: "Priya Patel",
        role: "Marketing & Community Manager",
        image: "https://i.ibb.co/LzsXvbRv/author-7.jpg",
        bio: "Priya leads outreach efforts, managing promotions and community engagement for RideXpress.",
        linkedin: "#",
        twitter: "#",
    },
];

const About = () => {
    return (
        <section>
            <div className="mt-6 lg:mt-10">
                <div className="flex flex-col mx-auto space-y-6 md:flex-row-reverse items-center py-6 px-6 lg:py-10">
                    <div className="flex flex-col md:items-center w-full lg:flex-row lg:w-1/2">
                        <div className="max-w-lg md:ml-10 lg:order-2  space-y-10">
                            <h1 className="text-4xl lg:text-5xl font-medium">About <span className="font-[100]">Us</span></h1>
                            <p className="text-muted-foreground text-sm md:text-base">Ride ease is a next-generation ride booking platform dedicated to making urban transportation seamless, safe, and efficient. Since our inception, we have aimed to connect riders and drivers through a reliable, technology-driven service that prioritizes convenience. With a presence in multiple cities, our platform has become a trusted partner for commuters seeking fast, affordable, and reliable rides.</p>
                        </div>
                    </div>

                    <div className="hidden md:flex items-center justify-center w-full h-96 lg:w-1/2">
                        <img className="object-cover w-full h-full rounded" src={aboutSectionimage1} alt="About Section Image" />
                    </div>
                </div>
                <div className="flex flex-col mx-auto space-y-6 md:flex-row items-center py-6 px-6 lg:py-10">
                    <div className="flex flex-col md:items-center w-full lg:flex-row lg:w-1/2">
                        <div className="max-w-lg md:mr-10 lg:order-2 space-y-10 ">
                            <h1 className="text-4xl lg:text-5xl font-medium"> Your <span className="font-[100]"> Journey </span> <br /> Our <span className="font-[100]"> Mission </span></h1>
                            <ul className="space-x-3">
                                <li className="flex items-start gap-3 text-muted-foreground text-sm md:text-base">
                                    <span><CircleSmall className="size-4 mt-1" /></span>
                                    <span>Safe, timely, and accessible rides for everyone.</span>
                                </li>
                                <li className="flex items-start gap-3 text-muted-foreground mt-2 text-sm md:text-base">
                                    <span><CircleSmall className="size-4 mt-1" /></span>
                                    <span>Empowering drivers to earn more and manage rides.</span>
                                </li>
                                <li className="flex items-start gap-3 text-muted-foreground mt-2 text-sm md:text-base">
                                    <span><CircleSmall className="size-4 mt-1" /></span>
                                    <span>Using tech and data to improve transport and satisfaction.</span>
                                </li>
                                <li className="flex items-start gap-3 text-muted-foreground mt-2 text-sm md:text-base">
                                    <span><CircleSmall className="size-4 mt-1" /></span>
                                    <span>Promoting sustainable, responsible urban travel.</span>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className="hidden md:flex items-center justify-center w-full h-96 lg:w-1/2">
                        <img className="object-cover w-full h-full rounded" src={aboutSectionimage2} alt="apple watch photo" />
                    </div>
                </div>
            </div>

            <div className="py-6 px-6 lg:py-10">
                <h1 className="text-2xl lg:text-3xl font-medium">Meet <span className="font-[100]">Our Team</span></h1>

                <div className="mt-2">
                    <span className="inline-block w-40 h-1 bg-primary rounded-full"></span>
                    <span className="inline-block w-3 h-1 ml-1 bg-primary rounded-full"></span>
                    <span className="inline-block w-1 h-1 ml-1 bg-primary rounded-full"></span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 my-6 lg:my-10">
                    {teamMembers.map((member) => (
                        <a href="#" className="group relative block bg-primary  h-96 lg:h-full rounded">
                            <img
                                alt=""
                                src={member.image}
                                className="absolute inset-0 h-96 lg:h-full w-full rounded object-cover object-top opacity-75 transition-opacity group-hover:opacity-50"
                            />

                            <div className="relative p-4 sm:p-6 lg:p-8">
                                <p className="text-sm font-medium tracking-widest text-sky-500 uppercase">{member.role}</p>

                                <p className="text-xl font-bold text-muted sm:text-2xl">{member.name}</p>

                                <div className="mt-32 sm:mt-48 lg:mt-64">
                                    <div
                                        className="translate-y-8 transform opacity-0 transition-all group-hover:translate-y-0 group-hover:opacity-100"
                                    >
                                        <p className="text-sm text-muted">
                                           {member.bio}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </a>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default About;
