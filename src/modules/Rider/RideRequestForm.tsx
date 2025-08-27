/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm, type FieldValues, type SubmitHandler } from "react-hook-form";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRequestRideMutation } from "@/redux/features/rider/rider.api";
import { toast } from "sonner";

const RideRequestSchema = z.object({
    pickupLocation: z
        .string()
        .min(3, { message: "Address is too short" })
        .max(200, { message: "Address is too long" })
        .nonempty("Pickup Location is required"),
    destinationLocation: z
        .string()
        .min(3, { message: "Destination Location is too short" })
        .max(200, { message: "Destination Location is too long" })
        .nonempty("Destination Location is required"),
    fareEstimation: z
        .string()
        .nonempty("Payment Method is required"),
    paymentMethod: z
        .string()
        .nonempty("Payment Method is required")
})

const RideRequestForm = () => {

    const [requestRider] = useRequestRideMutation()

    const form = useForm<z.infer<typeof RideRequestSchema>>({
        resolver: zodResolver(RideRequestSchema),
        defaultValues: {
            pickupLocation: "",
            destinationLocation: "",
            fareEstimation: "",
            paymentMethod: ""
        }
    });
    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        const requestRideData = {
            ...data,
            fareEstimation: Number(data.fareEstimation),
        }
        console.log(requestRideData)
        const toastId = toast.loading("Loading...")
        try {
            const res = await requestRider(requestRideData).unwrap()
            console.log(res)
            if (res.success) {
                toast.success(res.message, { id: toastId })
            }

        } catch (error: any) {
            console.log("error", error)
            if (error.status === 400 && error.data.message === "You already have an active ride.") {
                toast.error("You already have an active ride.", { id: toastId })
            } else if (error.status === 404 && error.data.message === "No available drivers right now.") {
                toast.error("No available drivers right now.", { id: toastId })
            }

        }
    }

    return (
        <div>
            <div className="flex flex-col gap-6">
                    <h1 className="text-3xl font-bold">Go anywhere with Ride Ease</h1>
                <div className="grid gap-6">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                            <FormField
                                control={form.control}
                                name="pickupLocation"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Pickup Location</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Pickup Location"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="destinationLocation"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Destination Location</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Destination Location"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="fareEstimation"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Fare Estimation</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="number"
                                                placeholder="Fare Estimation"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="paymentMethod"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Select Payment Method</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger className="w-full">
                                                    <SelectValue placeholder="Select Payment Method" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value="cash">Cash</SelectItem>
                                                <SelectItem value="card">Card</SelectItem>
                                                <SelectItem value="mobile">Mobile Payment</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <Button type="submit" className="w-full">
                                Continue
                            </Button>
                        </form>
                    </Form>
                </div>
            </div>
        </div>
    );
};

export default RideRequestForm;