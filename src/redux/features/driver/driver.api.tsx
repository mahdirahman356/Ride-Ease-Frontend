import { baseApi } from "@/redux/baseApi";


export const driverApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        assignRide: builder.mutation({
            query: ({ id, data }) => ({
                url: `/drivers/assign-ride/${id}`,
                method: "PATCH",
                body: data
            }),
            invalidatesTags: ["RIDE"],
        }),
        updateAvailability: builder.mutation({
            query: (data) => ({
                url: `/user/availability`,
                method: "PATCH",
                body: data
            }),
            invalidatesTags: ["USER"],
        }),
        getRideRequests: builder.query({
            query: () => ({
                url: "/drivers/ride-requests",
                method: "GET",
            }),
            providesTags: ["RIDE"]
        }),
        getActiveRide: builder.query({
            query: () => ({
                url: "/drivers/assigned-ride",
                method: "GET",
            }),
            providesTags: ["RIDE"]
        }),
        getMyRidesHistory: builder.query({
            query: (params) => ({
                url: "/drivers/my-ride-history",
                method: "GET",
                params
            }),
            providesTags: ["RIDE"]
        }),
        getMyEarnings: builder.query({
            query: (params) => ({
                url: "/drivers/my-earnings",
                method: "GET",
                params
            }),
            providesTags: ["RIDE"]
        }),
    })
})

export const {
    useGetRideRequestsQuery,
    useAssignRideMutation,
    useUpdateAvailabilityMutation,
    useGetActiveRideQuery,
    useGetMyRidesHistoryQuery,
    useGetMyEarningsQuery
} = driverApi