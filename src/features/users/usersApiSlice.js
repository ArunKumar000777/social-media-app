import { apiSlice } from "../../app/api/apiSlice";
import { setCredentials } from "../auth/authSlice";

export const usersApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getUsers: builder.query({
            query: () => ({
                url: "/users",
                validateStatus: (response, result) => {
                    return response.status === 200 && !result.isError;
                },
            }),
            providesTags: (result, error, arg) =>
                result
                    ? [{ type: "User", id: "LIST" }, ...result.map(({ _id }) => ({ type: "User", id: _id })), "User"]
                    : [{ type: "User", id: "LIST" }],
        }),
// *
        getUser: builder.query({
            query:(userId)=>({
                url:`/users/${userId}`,
                method: "GET"
            })
        }),
        updateUser: builder.mutation({
            query: ({ userId, userData }) => ({
                url: `users/${userId}`,
                method: "PUT",
                body: { ...userData },
            }),
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    const { accessToken } = data;
                    dispatch(setCredentials({ accessToken }));
                } catch (error) {
                }
            },
            invalidatesTags: (result, error, arg) => [{ type: "User", id: arg.userId }],
            
        }),
        uploadPicture: builder.mutation({
            query: (data) => ({
                url: "/upload",
                method: "POST",
                body: data,
            }),
        }),
        followUser: builder.mutation({
            query: (data) => ({
                url: `users/${data.otherUsers}/follow`,
                method: "PATCH",
                body: data.userId,
            }),

            invalidatesTags: (result, error, arg) => [{ type: "User", id: arg.userId }],
        }),
        unFollow: builder.mutation({
            query: (data) => ({
                url: `users/${data.otherUsers}/unfollow`,
                method: "PATCH",
                body: data.userId,
            }),
            invalidatesTags: (result, error, arg) => [{ type: "User", id: arg.userId }],
        }),
        addNewUser: builder.mutation({
            query: (initialUserData) => ({
                url: "users",
                method: "POST",
                body: {
                    ...initialUserData,
                },
            }),
            invalidatesTags: [{ type: "User", id: "LIST" }],
        }),
        refreshToken: builder.query({
            query: () => ({
                url: "auth/refresh",
                method: "GET",
            }),
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    const { accessToken } = data;
                    dispatch(setCredentials({ accessToken }));
                } catch (error) {
                }
            },
        }),
// *
        getUserProfileInfo: builder.query({
            query: ({ userId }) => ({
                url: `users/${userId}`,
                method: "GET",
            }),
            providesTags: (result, error, arg) => [{ type: "User", id: arg.userId }],
        }),

        deleteUser: builder.mutation({
            query: ({ id }) => ({
                url: "users",
                method: "DELETE",
                body: { id },
            }),
            invalidatesTags: (result, error, arg) => [{ type: "User", id: arg.id }],
        }),
    }),
});


export const {
    useGetUsersQuery,
    useAddNewUserMutation,
    useUpdateUserMutation,
    useDeleteUserMutation,
    useFollowUserMutation,
    useGetUserProfileInfoQuery,
    useUploadPictureMutation,
    useUnFollowMutation,
    useRefreshTokenQuery,
    useGetUserQuery,
} = usersApiSlice;


