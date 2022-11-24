import { apiSlice } from "../../app/api/apiSlice";
import { logOut, setCredentials } from "./authSlice";

export const authApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (userInfo) => ({
                url: "auth/login",
                method: "POST",
                body: { ...userInfo },
            }),
        }),
        signUp: builder.mutation({
            query: (userInfo) => ({
                url: "auth/register",
                method: "POST",
                body: { ...userInfo },
            }),
        }),
        sendLogout: builder.mutation({
            query: () => ({
                url: "/auth/logout",
                method: "POST",
            }),
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    // console.log(data);
                    dispatch(logOut());
                    setTimeout(() => {
                        dispatch(apiSlice.util.resetApiState());
                    }, 1000);
                } catch (error) {
                }
            },
        }),

        refresh: builder.mutation({
            query: () => ({
                url: "/auth/refresh",
                method: "GET",
            }),
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    if(!data) return 'Network error sorry'
                    // console.log(data);
                    const { accessToken } = data;
                    dispatch(setCredentials({ accessToken }));
                } catch (error) {
                    // console.log(error.error);
                }
            },
        }),
    }),
});

export const { useLoginMutation ,useRefreshMutation,useSendLogoutMutation,useSignUpMutation} = authApiSlice;
