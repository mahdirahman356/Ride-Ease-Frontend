
import questionImage from "../assets/image/question-image.png"

const faqs = [
    {
        question: "How do I book a ride?",
        answer:
            "Set your pickup and destination, choose a payment method, and confirm your booking.",
        category: "Rider",
        isOpen: true
    },
    {
        question: "How is the fare calculated?",
        answer:
            "The fare is based on distance, time, and traffic conditions. It is shown before confirming the ride.",
    },
    {
        question: "Can I cancel a ride?",
        answer:
            "Yes, you can cancel a ride before it starts, but cancellation policies may apply.",
    },

    // Driver
    {
        question: "How do I go Online/Offline?",
        answer:
            "Drivers can toggle their availability in the dashboard to start or stop receiving ride requests.",
    },
    {
        question: "How do I track my earnings?",
        answer:
            "Drivers can view their daily, weekly, and monthly income in the Earnings Dashboard.",
    }];


const FAQ = () => {

    return (
        <div>
            <div className="flex flex-col py-6 px-6 lg:py-16 space-y-6 md:flex-row items-start my-6 lg:my-16">
                <div className="flex flex-col md:items-center w-full lg:flex-row lg:w-1/2">
                    <div className=" lg:order-2 mr-5">
                        <h1 className="text-3xl font-semibold tracking-wide lg:text-4xl">Frequently Asked Questions</h1>
                        <p className="my-6 md:my-4 text-muted-foreground text-sm md:text-base">Find quick answers to the most common questions about our platform. Whether you're a rider, driver, or admin, we've covered the essentials to help you get started easily.</p>
                        <div className="flex justify-center items-center">
                            <img src={questionImage} alt="image" className="w-xs" />
                        </div>
                    </div>
                </div>

                <div className="w-full lg:w-1/2">
                    <div className="space-y-4">
                        {faqs.map((faq) => (
                            <details className="group [&_summary::-webkit-details-marker]:hidden" open={faq.isOpen}>
                                <summary
                                    className="flex items-center justify-between gap-1.5 rounded-md border bg-muted p-4"
                                >
                                    <h2 className="md:text-lg font-medium">{faq.question}</h2>

                                    <svg
                                        className="size-5 shrink-0 transition-transform duration-300 group-open:-rotate-180"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                    </svg>
                                </summary>

                                <p className="px-4 pt-4 text-sm md:text-base text-muted-foreground">
                                    {faq.answer}
                                </p>
                            </details>
                        ))}
                    </div>
                </div>
            </div>

            
        </div>
    );
};

export default FAQ;