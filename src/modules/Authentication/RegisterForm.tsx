/* eslint-disable @typescript-eslint/no-explicit-any */
import Password from "@/components/ui/Password";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm, type FieldValues, type SubmitHandler } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { useRegisterMutation } from "@/redux/features/auth/auth.api";
import { toast } from "sonner";
import { FcGoogle } from "react-icons/fc";

const registerSchema = z.object({
    name: z
        .string()
        .nonempty("Name is required")
        .min(2, { error: "Name is too short" })
        .max(50),

    email: z
        .email()
        .nonempty("Email is required"),

    role: z
        .string()
        .nonempty("Role is required"),

    password: z
        .string()
        .nonempty("Password is required")
        .min(8, { error: "Password is too short" }),
})


const RegisterForm = () => {

    const form = useForm<z.infer<typeof registerSchema>>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            name: "",
            email: "",
            role: "",
            password: ""
        }
    });
    const [register] = useRegisterMutation()
    const navigate = useNavigate()

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        const toastId = toast.loading("Loading...")
        try {
            const res = await register(data).unwrap()
            if (res.success) {
                toast.success("User Created Successfully", { id: toastId })
                navigate("/login")
            }
        } catch (error: any) {
            console.log("error", error)
            if (error.status === 400 && error.data.message === "User Already Exist") {
                toast.error("User Already Exist", { id: toastId })
            }

        }

    }

    return (
        <div>
            <div className="flex flex-col gap-6">
                <div className="flex flex-col items-center gap-2 text-center">
                    <h1 className="text-2xl font-semibold">Register your account</h1>
                </div>
                <div className="grid gap-6">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Name</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Name" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Email" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="role"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Role</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger className="w-full">
                                                    <SelectValue placeholder="Select a role" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value="RIDER">Rider</SelectItem>
                                                <SelectItem value="DRIVER">Driver</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Password</FormLabel>
                                        <FormControl>
                                            <Password {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button type="submit" className="w-full">Continue</Button>
                        </form>
                    </Form>
                    <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
                        <span className="bg-background text-muted-foreground relative z-10 px-2">
                            Or continue with
                        </span>
                    </div>
                    <Button
                        type="button"
                        variant="outline"
                        className="w-full cursor-pointer bg-muted"
                    >
                        <FcGoogle className="text-2xl mr-3" />
                        Login with Google
                    </Button>
                </div>
                <div className="text-center text-sm">
                    Already have an account? {" "}
                    <Link to="/login" className="underline underline-offset-4">
                        Login
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default RegisterForm;