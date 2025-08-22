import { useUserInfoQuery } from "@/redux/features/auth/auth.api"
import type { ComponentType } from "react"
import { Navigate } from "react-router"


export const withAuth = (Component: ComponentType, requiredRole?: undefined) => {
    return function AuthWrapper() {
        const { data, isLoading } = useUserInfoQuery(undefined)
        if (isLoading) {
            return <>Loading....</>
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