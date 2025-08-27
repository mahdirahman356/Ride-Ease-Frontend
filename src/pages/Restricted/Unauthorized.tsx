import { Button } from "@/components/ui/button";
import { ArrowRight, OctagonAlert, Pin } from "lucide-react";
import { Link } from "react-router";

const Unauthorized = () => {
    return (
        <div>
            <div
                className="flex justify-center items-center my-12">
                <div className="w-full max-w-lg rounded-lg bg-primary-foreground p-5 md:p-6 shadow-lg">
                    <div className="flex flex-col justify-center items-center gap-2">
                        <OctagonAlert className="size-9 md:size-16 text-yellow-500" />
                        <h2 className="text-xl md:text-3xl font-bold text-center">Unauthorized Accesss</h2>
                    </div>

                    <div className="mt-6">
                        <p className="text-pretty text-muted-foreground text-center">
                            You do not have the required permissions to view this page or perform this action.
                        </p>
                    </div>
                    {/* What to do next */}
                    <div className="mt-6 space-y-2">
                        <h4 className="text-lg font font-semibold flex items-center gap-2">
                            <span><Pin /></span>
                            What to do next
                        </h4>
                        <div className="flex items-start gap-2 text-sm text-muted-foreground">
                            <div><ArrowRight className="size-4 mt-1" /></div>
                            <p> Return to your dashboard and continue with available features.</p>
                        </div>
                        <div className="flex items-start gap-2 text-sm text-muted-foreground">
                            <span><ArrowRight className="size-4 mt-1" /></span>
                            <p>If you believe this is a mistake, contact support for help.</p>
                        </div>
                    </div>
                    {/* Actions */}
                    <div className="mt-6 flex flex-wrap gap-3 justify-center">
                        <Link to="/">
                            <Button variant="default" className="w-36">Go home</Button>
                        </Link>
                        <Link to="/contact">
                            <Button variant="outline" className="w-36">Contact</Button>
                        </Link>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Unauthorized;