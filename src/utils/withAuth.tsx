import { useUserInfoQuery } from "@/redux/features/auth/auth.api"
import type { TRole } from "@/types"
import { LoaderCircleIcon } from "lucide-react"
import type { ComponentType } from "react"
import { Navigate } from "react-router"


export const withAuth = (Component: ComponentType, requiredRole?: TRole) => {
    return function AuthWrapper() {
        const { data, isLoading } = useUserInfoQuery(undefined)
       if (isLoading) {
               return <div className="flex justify-center items-center my-20">
                   <LoaderCircleIcon
                       className="-ms-1 animate-spin"
                       size={30}
                       aria-hidden="true"
                   />
               </div>
           }
        if (!isLoading && !data?.data?.email) {
            return <Navigate to={"/login"} />
        }

        if (requiredRole && !isLoading && requiredRole !== data?.data?.role) {
            return <Navigate to={"/unauthorized"} />

        }

        if (!isLoading && (data?.data?.isApproved === false || data?.data?.isActive === "BLOCKED")) {
                return <Navigate to={"/access-denied"} />
        }

        return <Component />
    }
}