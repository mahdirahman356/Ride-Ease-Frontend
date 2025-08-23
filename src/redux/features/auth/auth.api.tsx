import { baseApi } from "@/redux/baseApi";


export const authApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (userInfo) => ({
                url: "/auth/login",
                method: "POST",
                body: userInfo
            })
        }),
        register: builder.mutation({
            query: (userInfo) => ({
                url: "/user/register",
                method: "POST",
                body: userInfo
            })
        }),
        logout: builder.mutation({
            query: () => ({
                url: "/auth/logout",
                method: "POST",
            }),
            invalidatesTags: ["USER"]
        }),
        userInfo: builder.query({
            query: () => ({
                url: "/user/me",
                method: "GET",
            }),
            providesTags: ["USER"]
        }),
        updateProfile: builder.mutation({
            query: ({id , userInfo}) => ({
                url: `/user/update-user/${id}`,
                method: "PATCH",
                body: userInfo
            }),
            invalidatesTags: ["USER"],
        }),
        changePassword: builder.mutation({
            query: (userInfo) => ({
                url: "/auth/change-password",
                method: "POST",
                body: userInfo
            }),
            invalidatesTags: ["USER"],
        }),
    
    })
})

export const {
    useRegisterMutation,
    useLoginMutation,
    useLogoutMutation,
    useUserInfoQuery,
    useUpdateProfileMutation,
    useChangePasswordMutation
} = authApi