import { baseApi } from "@/redux/baseApi";


export const adminApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        updateActivityStatus: builder.mutation({
            query: ({id , userInfo}) => ({
                url: `/user/activity-status/${id}`,
                method: "PATCH",
                body: userInfo
            }),
            invalidatesTags: ["USER"],
        }),
    
        updateDriverApproval: builder.mutation({
            query: ({id , userInfo}) => ({
                url: `/user/drivers/approve/${id}`,
                method: "PATCH",
                body: userInfo
            }),
            invalidatesTags: ["USER"],
        }),
        getAllUsers: builder.query({
            query: (params) => ({
                url: "/user/view",
                method: "GET",
                params
            }),
            providesTags: ["USER"],
        }),
        getAllRides: builder.query({
            query: (params) => ({
                url: "/user/view-rides",
                method: "GET",
                params
            }),
            providesTags: ["USER"],
        }),
        adminAnalytics: builder.query({
            query: (params) => ({
                url: "/user/admin-analytics",
                method: "GET",
                params
            }),
            providesTags: ["USER"],
        }),
    })
})

export const {
    useUpdateActivityStatusMutation,
    useUpdateDriverApprovalMutation,
    useGetAllUsersQuery,
    useGetAllRidesQuery,
    useAdminAnalyticsQuery
} = adminApi