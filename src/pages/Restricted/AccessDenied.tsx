import { Button } from "@/components/ui/button";
import { useUserInfoQuery } from "@/redux/features/auth/auth.api";
import { ArrowRight, Lock, OctagonAlert, Pin } from "lucide-react";
import { Link } from "react-router";

const AccessDenied = () => {

    const { data } = useUserInfoQuery(undefined)

    return (
        <div
            className="fixed inset-0 z-50 grid place-content-center bg-muted-foreground/50 p-4 overflow-auto">
            <div className="w-full max-w-lg rounded-lg bg-primary-foreground p-5 md:p-6 shadow-lg">
                <div className="flex flex-col justify-center items-center gap-2">
                    <OctagonAlert className="size-9 md:size-16 text-yellow-500" />
                    <h2 className="text-xl md:text-3xl font-bold text-center">
                        Access Restricted
                    </h2>
                </div>

                <div className="mt-6">
                    <p className="text-pretty text-muted-foreground">
                        Your account has been temporarily restricted. You cannot access the dashboard or services until this issue is resolved.                    </p>
                </div>
                {/* Current Status */}
                <div className="mt-6 space-y-2">
                    <h4 className="text-lg font font-semibold flex items-center gap-2">
                        <span><Lock /></span>
                        Current Status
                    </h4>
                    {data?.data?.isApproved === false &&
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <div><ArrowRight className="size-4" /></div>
                            <p>Your account is suspended</p>
                        </div>}
                    {data?.data?.isActive === "BLOCKED" &&
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <div><ArrowRight className="size-4" /></div>
                            <p>Your account is blocked</p>
                        </div>}

                </div>
                {/* What to do next */}
                <div className="mt-6 space-y-2">
                    <h4 className="text-lg font font-semibold flex items-center gap-2">
                        <span><Pin /></span>
                        What to do next
                    </h4>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <div><ArrowRight className="size-4" /></div>
                        <p> If you believe this is a mistake, or once you have resolved the issue, please reach out to our support team. </p>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <div><ArrowRight className="size-4" /></div>
                        <p>Some suspensions require identity verification or additional documents. Make sure you provide these if requested.</p>
                    </div>
                </div>
                {/* Actions */}
                <div className="mt-6 flex flex-wrap gap-3">
                    <Link to="/">
                        <Button variant="default" className="w-36">Go to home page</Button>
                    </Link>
                    <Link to="/contact">
                        <Button variant="outline" className="w-36">Contact Support</Button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default AccessDenied;