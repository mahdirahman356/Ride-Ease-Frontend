
import questionImage from "../assets/image/faq-image.png"

const faqs = [
    {
        question: "How do I request a ride as a Rider?",
        answer:
            "Go to your dashboard, enter pickup and destination details, choose a payment method, and submit the request.",
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

    {
        question: "Can Admins block or suspend users?",
        answer:
            "Yes, Admins can block/unblock Riders and approve/suspend Drivers from the dashboard.",
    },
    {
        question: "What happens if my account is blocked or suspended?",
        answer:
            "You’ll be redirected to a status page showing the reason and instructions to resolve the issue.",
    },
    {
        question: "How do I track my earnings?",
        answer:
            "Drivers can view their daily, weekly, and monthly income in the Earnings Dashboard.",
    },
    {
        question: "What is the SOS button used for?",
        answer:
            "During an active ride, Riders and Drivers can press SOS to call police, notify emergency contacts, or share live location.",
    }];


const FAQ = () => {

    return (
        <div>
            <div className="flex flex-col py-6 px-6 lg:py-10 space-y-6 md:flex-row items-start my-6 lg:my-10">
                <div className="flex flex-col md:items-center w-full lg:flex-row lg:w-1/2">
                    <div className=" lg:order-2 mr-5">
                        <h1 className="text-4xl font-medium mb-6">Frequently <span className="font-[100]">Asked Questions</span></h1>
                        <div className="flex justify-center items-center">
                            <img src={questionImage} alt="image" className="w-sm" />
                        </div>
                    </div>
                </div>

                <div className="w-full lg:w-1/2">
                    <div className="">
                        {faqs.map((faq) => (
                            <details className="group [&_summary::-webkit-details-marker]:hidden" open={faq.isOpen}>
                                <summary
                                    className="flex items-center justify-between gap-1.5  border-b  p-4"
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