/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useChangePasswordMutation } from "@/redux/features/auth/auth.api";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type FieldValues, type SubmitHandler } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

const ChangePasswordSchema = z.object({
    oldPassword: z
        .string()
        .nonempty("Old Password is required"),
    newPassword: z
        .string()
        .nonempty("New Password is required")
        .min(8, { error: "Password is too short" })
})

const ChangePasswordForm = () => {

    const [changePassword] = useChangePasswordMutation()

    const form = useForm<z.infer<typeof ChangePasswordSchema>>({
        resolver: zodResolver(ChangePasswordSchema),
        defaultValues: {
            oldPassword: "",
            newPassword: ""
        }
    });

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        console.log(data)
        const toastId = toast.loading("Loading...")
        try {
            const res = await changePassword(data).unwrap()
            console.log(res)
            if (res.success) {
                toast.success("Password Changed Successfully", { id: toastId })
            }
        } catch (error: any) {
            console.log(error)
            if (error.status === 401 && error.data.message === "Old Password does not match") {
                toast.error("Old Password does not match", { id: toastId })
            } else if (error.status === 400 && error.data.message === "New password must be different from the old password") {
                toast.error("New password must be different from the old password", { id: toastId })
            }
        }
    }

    return (
        <div>
            <div className="flex justify-center items-center">
                <div className="w-full max-w-sm">
                    <div className="flex flex-col gap-6">
                        <h1 className="text-3xl font-bold">Change and update your account password</h1>
                        <div className="grid gap-6 w-full">
                            <Form {...form}>
                                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                                    <FormField
                                        control={form.control}
                                        name="oldPassword"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Old Password</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder="Old Password"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="newPassword"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>New Password</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder="New Password"
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
        </div>
    );
};

export default ChangePasswordForm;