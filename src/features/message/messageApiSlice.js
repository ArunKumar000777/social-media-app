import { apiSlice } from "../../app/api/apiSlice";

const messageApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        createMessage: builder.mutation({
            query: (messageInfo) => {
                return {
                    url: `/message`,
                    method: "POST",
                    body: { ...messageInfo },
                };
            },
        }),
    }),
});

export const { useCreateMessageMutation } = messageApiSlice;
