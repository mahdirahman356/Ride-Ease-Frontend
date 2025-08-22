import { Button } from "@/components/ui/button";
import { ArrowRight, Pin, Power } from "lucide-react";
import { Link } from "react-router";

const OfflineNotice = () => {

  return (
    <div className="flex justify-center items-center my-12">
      <div className="w-full max-w-lg rounded-lg bg-primary-foreground p-5 md:p-6 shadow-lg">
        {/* Header */}
        <div className="flex flex-col justify-center items-center gap-2">
          <Power className="size-9 md:size-16 text-yellow-500" />
          <h2 className="text-xl md:text-3xl font-bold text-center">
            You’re Currently Offline
          </h2>
        </div>

        {/* Description */}
        <div className="mt-6">
          <p className="text-pretty text-muted-foreground text-center">
            You are currently offline and will not receive ride requests from
            riders. You can still access your dashboard, ride history, earnings,
            and profile settings.
          </p>
        </div>

        {/* What to do next */}
        <div className="mt-6 space-y-2">
          <h4 className="text-lg font-semibold flex items-center gap-2">
            <Pin />
            Next Steps
          </h4>
          <div className="flex items-start gap-2 text-sm text-muted-foreground">
            <ArrowRight className="size-4 mt-1" />
            <p>Go online to start receiving ride requests immediately.</p>
          </div>
          <div className="flex items-start gap-2 text-sm text-muted-foreground">
            <ArrowRight className="size-4 mt-1" />
            <p>You can toggle your online/offline status anytime from your dashboard.</p>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-6 flex flex-wrap gap-3 justify-center">
          <Button variant="default" className="w-44">
            <Link to={"/"}>Go to Home Page</Link>
          </Button>
          <Button variant="outline" onClick={() => console.log("Go Online") } className="w-44">
            Go Online
          </Button>
        </div>
      </div>
    </div>
  );
};

export default OfflineNotice;
