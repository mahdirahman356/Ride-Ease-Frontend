import { useUserInfoQuery } from "@/redux/features/auth/auth.api";
import OfflineNotice from "./OfflineNotice";

const Requests = () => {

    const { data, isLoading } = useUserInfoQuery(undefined)

    if (!isLoading && data?.data?.isOnline === false) {
        return <OfflineNotice />
    }

    return (
        <div>
            Requests page
        </div>
    );
};

export default Requests;