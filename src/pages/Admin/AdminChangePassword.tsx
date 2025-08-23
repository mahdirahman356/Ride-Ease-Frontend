import ChangePasswordForm from "@/modules/Authentication/ChangePasswordForm";

const AdminChangePassword = () => {
    return (
        <div className="flex justify-center items-center">
            <div className="w-full max-w-sm p-4">
                <ChangePasswordForm />
            </div>
        </div>
    );
};

export default AdminChangePassword;