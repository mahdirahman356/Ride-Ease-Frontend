import { Check } from "lucide-react";

const teamMembers = [
    {
        name: "Jane Doe",
        role: "CEO & Founder",
        image: "https://i.ibb.co/LzsXvbRv/author-7.jpg",
        bio: "Jane brings over 10 years of experience in tech and transportation. Passionate about building innovative solutions.",
        linkedin: "#",
        twitter: "#",
    },
    {
        name: "John Smith",
        role: "CTO",
        image: "https://i.ibb.co/FqyYHzdC/author-5.jpg",
        bio: "John ensures RideXpress’s platform remains fast, reliable, and secure with his full-stack expertise.",
        linkedin: "#",
        twitter: "#",
    },
    {
        name: "Sarah Lee",
        role: "Head of Operations",
        image: "https://i.ibb.co/NnVHbFjh/christopher-campbell-r-DEOVt-E7v-Os-unsplash.jpg",
        bio: "Sarah oversees day-to-day operations and driver support, ensuring smooth ride experiences.",
        linkedin: "#",
        twitter: "#",
    },
    {
        name: "Michael Tan",
        role: "Lead Designer",
        image: "https://i.ibb.co/wrgHTw6D/author-6.jpg",
        bio: "Michael creates intuitive, user-friendly interfaces, ensuring a polished experience across devices.",
        linkedin: "#",
        twitter: "#",
    },
    {
        name: "Priya Patel",
        role: "Marketing & Community Manager",
        image: "https://i.ibb.co/XxNQ4gFq/author-1.jpg",
        bio: "Priya leads outreach efforts, managing promotions and community engagement for RideXpress.",
        linkedin: "#",
        twitter: "#",
    },
];

const About = () => {
    return (
        <section>
            <div className="py-6 px-6 lg:py-16 lg:h-[64rem]  mt-6 lg:mt-16">
                <div className="flex flex-col mx-auto space-y-6 md:flex-row-reverse items-center mb-6 lg:mb-16">
                    <div className="flex flex-col md:items-center w-full lg:flex-row lg:w-1/2">
                        <div className="max-w-lg md:mx-12 lg:order-2 mr-5">
                            <h1 className="text-3xl font-semibold tracking-wide lg:text-4xl">About Us</h1>
                            <p className="my-6 md:my-4 text-muted-foreground text-sm md:text-base">RideXpress is a next-generation ride booking platform dedicated to making urban transportation seamless, safe, and efficient. Since our inception, we have aimed to connect riders and drivers through a reliable, technology-driven service that prioritizes convenience. With a presence in multiple cities, our platform has become a trusted partner for commuters seeking fast, affordable, and reliable rides.</p>

                        </div>
                    </div>

                    <div className="hidden md:flex items-center justify-center w-full h-96 lg:w-1/2">
                        <img className="object-cover w-full h-full max-w-2xl rounded-md" src="https://images.unsplash.com/photo-1543269664-7eef42226a21?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80" alt="apple watch photo" />
                    </div>
                </div>
                <div className="flex flex-col mx-auto space-y-6 md:flex-row items-center">
                    <div className="flex flex-col md:items-center w-full lg:flex-row lg:w-1/2">
                        <div className="max-w-lg lg:mx-12 lg:order-2 mr-5">
                            <h1 className="text-3xl font-semibold tracking-wide mb-6">Our mission is to revolutionize urban mobility by</h1>
                          <ul className="space-x-3 mt-2">
                              <li className="flex items-start gap-3 text-muted-foreground text-sm md:text-base">
                                <span><Check className="size-4 mt-1" /></span>
                                <span>Providing safe, timely, and accessible rides for everyone.</span>
                            </li>
                            <li className="flex items-start gap-3 text-muted-foreground mt-2 text-sm md:text-base">
                                <span><Check className="size-4 mt-1" /></span>
                                <span>Empowering drivers with tools to maximize earnings and manage rides effectively.</span>
                            </li>
                            <li className="flex items-start gap-3 text-muted-foreground mt-2 text-sm md:text-base">
                                <span><Check className="size-4 mt-1" /></span>
                                <span>Leveraging technology and data to optimize transportation and enhance user satisfaction.</span>
                            </li>
                            <li className="flex items-start gap-3 text-muted-foreground mt-2 text-sm md:text-base">
                                <span><Check className="size-4 mt-1" /></span>
                                <span>Promoting sustainable and responsible urban travel solutions.</span>
                            </li>
                          </ul>
                        </div>
                    </div>

                    <div className="hidden md:flex items-center justify-center w-full h-96 lg:w-1/2">
                        <img className="object-cover w-full h-full max-w-2xl rounded-md" src="https://images.unsplash.com/photo-1543269664-7eef42226a21?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80" alt="apple watch photo" />
                    </div>
                </div>
            </div>

            <div className="py-6 px-6 lg:py-16">
                <h1 className="text-2xl font-semibold lg:text-3xl">Meet Our Team</h1>

                <div className="mt-2">
                    <span className="inline-block w-40 h-1 bg-primary rounded-full"></span>
                    <span className="inline-block w-3 h-1 ml-1 bg-primary rounded-full"></span>
                    <span className="inline-block w-1 h-1 ml-1 bg-primary rounded-full"></span>
                </div>
                 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
                {teamMembers.map((member) => (
                    <a href="#" className="group relative block bg-primary">
                        <img
                            alt="membars-image"
                            src={member.image}
                            className="absolute inset-0 h-full w-full object-cover opacity-75 transition-opacity group-hover:opacity-50"
                        />

                        <div className="relative p-4 sm:p-6 lg:p-8">
                            <p className="text-sm font-medium tracking-widest text-pink-500 uppercase">{member.role}</p>

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
