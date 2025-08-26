import { useState } from "react";
import { toast } from "sonner";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type FieldValues, type SubmitHandler } from "react-hook-form";
import contactUsImage from "../../assets/image/contact-us-image.avif"

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

const formSchema = z.object({
    name: z.string().min(3, "Full Name must be at least 3 characters."),
    email: z.string().email("Please enter a valid email."),
    phone: z
        .string()
        .optional()
        .refine(
            (val) => !val || /^\+?\d{7,15}$/.test(val),
            "Please enter a valid phone number."
        ),
    subject: z.string().min(1, "Subject is required."),
    message: z.string().min(10, "Message must be at least 10 characters."),
});

type FormValues = z.infer<typeof formSchema>;

export default function ContactPage() {
    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            email: "",
            phone: "",
            subject: "",
            message: "",
        },
    });

    const [loading, setLoading] = useState(false);

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setLoading(true);
        console.log(data)
        setTimeout(() => {
            setLoading(false);
            toast.success("Thank you for contacting us! We’ll get back to you soon.");
            form.reset();
        }, 1200);
    };

    return (
        <div>
            <div className="flex flex-col py-6 px-6 lg:py-16 mx-auto space-y-6 lg:h-[32rem] md:flex-row items-center mt-6 lg:mt-16">
                <div className="flex flex-col w-full lg:w-1/2">
                    <div className="mr-5">
                        <h1 className="text-3xl font-semibold tracking-wide lg:text-4xl">Contact Us</h1>
                        <p className="my-6 md:my-4 text-muted-foreground text-sm md:text-base">We’d love to hear from you! Whether you have a question about our services, need support, or want to share feedback, our team is here to help.</p>
                    </div>
                    <div>
                        <div className="flex flex-wrap gap-8 md:justify-between mt-6 mr-10">
                            <div>
                                <h3 className="text-xl font-semibold mb-1">
                                    Head Office
                                </h3>
                                <span className="text-sm text-muted-foreground">Dhaka, Bangladesh</span>
                            </div>
                            <div>
                                <h3 className="text-xl font-semibold mb-1">
                                    Contact
                                </h3>
                                <span className="text-sm text-muted-foreground">Support@gmail.com</span>
                            </div>
                            <div>
                                <h3 className="text-xl font-semibold mb-1">
                                    Support Hours
                                </h3>
                                <span className="text-sm text-muted-foreground">9:00 AM - 10:00 PM (Everyday)</span>
                            </div>
                        </div>


                    </div>
                </div>

                <div className="hidden md:flex items-center justify-center w-full h-96 lg:w-1/2">
                    <img className="object-cover w-full h-full max-w-2xl rounded-md" src={contactUsImage} alt="apple watch photo" />
                </div>
            </div>

           <div className="py-6 px-6 lg:py-16">
             <h1 className="text-2xl font-semibold lg:text-3xl">Send Us a Message</h1>

                <div className="mt-2">
                    <span className="inline-block w-40 h-1 bg-primary rounded-full"></span>
                    <span className="inline-block w-3 h-1 ml-1 bg-primary rounded-full"></span>
                    <span className="inline-block w-1 h-1 ml-1 bg-primary rounded-full"></span>
                </div>
             <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-6 mt-8">
                    <div className="sm:flex md:flex gap-8 w-full space-y-6 sm:space-y-0 md:space-y-0">
                        {/* Full Name */}
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem className="w-full">
                                    <FormLabel>Full Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Enter your full name" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Email */}
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem className="w-full">
                                    <FormLabel>Email Address</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Enter your email" type="email" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    <div className="sm:flex md:flex gap-8 w-full space-y-6 sm:space-y-0 md:space-y-0">
                        {/* Phone */}
                        <FormField
                            control={form.control}
                            name="phone"
                            render={({ field }) => (
                                <FormItem className="w-full">
                                    <FormLabel>Phone Number (optional)</FormLabel>
                                    <FormControl>
                                        <Input placeholder="+8801XXXXXXXXX" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Subject */}
                        <FormField
                            control={form.control}
                            name="subject"
                            render={({ field }) => (
                                <FormItem className="w-full">
                                    <FormLabel>Subject</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Enter subject" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    {/* Message */}
                    <FormField
                        control={form.control}
                        name="message"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Your Message</FormLabel>
                                <FormControl>
                                    <Textarea
                                        placeholder="Write your message..."
                                        className="resize-none"
                                        rows={5}
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <Button type="submit" className="w-48" disabled={loading}>
                        {loading ? "Sending..." : "Send Message"}
                    </Button>
                </form>
            </Form>
           </div>
        </div>
    );
}
