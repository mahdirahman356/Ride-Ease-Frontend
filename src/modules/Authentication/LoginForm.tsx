/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Password from "@/components/ui/Password";
import { useLoginMutation } from "@/redux/features/auth/auth.api";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type FieldValues, type SubmitHandler } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import { toast } from "sonner";
import z from "zod";
import { FcGoogle } from "react-icons/fc";

const loginSchema = z.object({
  email: z
    .email()
    .nonempty("Email is required"),
  password: z
    .string()
    .nonempty("Password is required")
})

const LoginForm = () => {

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: ""
    }
  });

  const [login] = useLoginMutation()
  const navigate = useNavigate()

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("Loading...")
    try {
      const res = await login(data).unwrap()
      if (res.success) {
        toast.success("Logged in successfully", { id: toastId })
        navigate("/")
      }
    } catch (error: any) {
      console.log("error", error)
      if (error.status === 400 && error.data.message === "Incorrect Password") {
        toast.error("Incorrect Password", { id: toastId })
      } else if (error.status === 400 && error.data.message === "Email does not exist") {
        toast.error("Email does not exist", { id: toastId })
      }

    }
  }

  return (
    <div>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <h1 className="text-xl lg:text-2xl font-medium">
            Login to <span className="font-[100]">your account </span> <br />
           to <span className="font-[100]"> continue </span>
          </h1>             </div>
        <div className="grid gap-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder="Email"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Password
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

          <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
            <span className="relative z-10 bg-background px-2 text-muted-foreground">
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
          Don&apos;t have an account?{" "}
          <Link to="/register" replace className="underline underline-offset-4">
            Register
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;