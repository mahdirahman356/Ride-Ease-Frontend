/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from "@/redux/baseApi";


export const riderApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        requestRide: builder.mutation({
            query: (data) => ({
                url: "/rides/request",
                method: "POST",
                body: data
            }),
            invalidatesTags: ["RIDE"],
        }),
        getMyRides: builder.query({
            query: (params) => ({
                url: "/rides/my-rides",
                method: "GET",
                params
            }),
            providesTags: ["RIDE"]
        }),
    })
})

export const {
    useRequestRideMutation,
    useGetMyRidesQuery
} = riderApi