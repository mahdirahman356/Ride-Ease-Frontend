import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useUpdateProfileMutation, useUserInfoQuery } from "@/redux/features/auth/auth.api";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type FieldValues, type Resolver, type SubmitHandler } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

const updateUserZodSchema = z.object({
    name: z.preprocess(
        (val) => (val === "" ? undefined : val),
        z.string()
            .min(2, { message: "Name must be at least 2 characters long" })
            .max(50, { message: "Name cannot exceed 50 characters" })
            .optional()
    ),
    phone: z.preprocess(
        (val) => (val === "" ? undefined : val),
        z
            .string()
            .regex(/^(?:\+8801\d{9}|01\d{9})$/, {
                message: "Phone number must be valid for Bangladesh. Format: +8801XXXXXXXXX or 01XXXXXXXXX",
            })
            .optional()
    ),
    address: z.preprocess(
        (val) => (val === "" ? undefined : val),
        z.string()
            .min(2, { message: "Address must be at least 2 characters long" })
            .max(200, { message: "Address cannot exceed 200 characters." })
            .optional()
    ),
    vehicleInfo: z
        .object({
            model: z.string(),
            plateNumber: z.string(),
        })
        .optional(),
});

const ManageProfileForm = () => {

    const { data: userData } = useUserInfoQuery(undefined)
    const [updateProfile] = useUpdateProfileMutation()

    const form = useForm<z.infer<typeof updateUserZodSchema>>({
        resolver: zodResolver(updateUserZodSchema) as Resolver<z.infer<typeof updateUserZodSchema>>,
        defaultValues: {
            name: userData?.data?.name,
            phone: userData?.data?.phone,
            address: userData.data.address
        }
    });


    const id = userData.data._id
    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        const toastId = toast.loading("Loading...")
        try {
            const res = await updateProfile({ id, userInfo: data }).unwrap()
            if (res.success) {
                toast.success("User updated successfully", { id: toastId })
            }
        } catch (error) {
            console.log(error)
        }

    }

    return (
        <div>
            <div>
                <div className="flex flex-col gap-6">
                        <h1 className="text-3xl font-bold">Update and personalize your profile</h1>
                    <div className="grid gap-6">
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                                <FormField
                                    control={form.control}
                                    name="name"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Name</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="Name"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="phone"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Phone Number</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="Phone Number"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="address"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Address</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="Address"
                                                    {...field}
                                                />
                                            </FormControl>
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
        </div>
    );
};

export default ManageProfileForm;