import LoginForm from "@/modules/Authentication/LoginForm";

const Login = () => {
    return (
        <div className="min-h-svh  flex justify-center items-center">
            <div className="w-full max-w-xs p-4">
                <LoginForm />
            </div>
        </div>
    );
};

export default Login;