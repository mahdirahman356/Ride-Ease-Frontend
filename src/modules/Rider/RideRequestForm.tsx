import Logo from "@/assets/icons/Logo";
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

const RideRequestForm = () => {

    const form = useForm();

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        console.log(data)
    }

    return (
        <div>
            <div className="flex flex-col gap-6">
                <div className="flex flex-col items-center gap-2 text-center">
                    <Logo />
                    <h1 className="text-2xl font-bold">Request For Ride</h1>
                    <p className="text-balance text-sm text-muted-foreground">
                        Enter your email below to login to your account
                    </p>
                </div>
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