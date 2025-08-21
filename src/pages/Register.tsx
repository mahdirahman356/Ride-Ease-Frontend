import RegisterForm from "@/modules/Authentication/RegisterForm";

const Register = () => {

    return (
        <div>
             <div className="min-h-svh  flex justify-center items-center">
            <div className="w-full max-w-xs p-4">
                <RegisterForm />
            </div>
        </div>
        </div>
    );
};

export default Register;