import { apiSlice } from "../../app/api/apiSlice";
import { store } from "../../app/store";
const state = store.getState();
const token = state.auth.token;

const postsApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        uploadImage: builder.mutation({
            query: (data) => ({
                url: "/upload",
                method: "POST",
                body: data,
            }),
        }),
        postData: builder.mutation({
            query: (newPost) => ({
                url: "/posts",
                method: "POST",
                body: { ...newPost },
            }),
            invalidatesTags: [{ type: "Post", id: "LIST" }],
        }),
        getTimelinePosts: builder.query({
            query: (userId) => ({
                url: `/posts/${userId}/timeline`,
                method: "GET",
                validateStatus: (response, result) => {
                    return response.status === 200 && !result.isError;
                },
            }),

            providesTags: (result, error, arg) =>
                result
                    ? [{ type: "Post", id: "LIST" }, ...result.map(({ _id }) => ({ type: "Post", id: _id })), "Post"]
                    : [{ type: "Post", id: "LIST" }],
        }),

        getOnePost: builder.query({
            query: (postId) => ({
                url: `/posts/${postId}`,
                method: "GET",
            }),
        }),
        likePost: builder.mutation({
            query: ({ postId, userId }) => ({
                url: `/posts/${postId}/like`,
                method: "PUT",
                body: { userId },
            }),

            invalidatesTags: (result, error, arg) => [{ type: "Post", id: arg.postId }],
        }),
        deletePost: builder.mutation({
            query: ({ postId, userId }) => ({
                url: `/posts/${postId}`,
                method: "DELETE",
                body: { userId },
            }),
            invalidatesTags: (result, error, arg) => [{ type: "Post", id: arg.postId }],
        }),
        updatePost: builder.mutation({
            query: ({ postId, userId, desc }) => ({
                url: `/posts/${postId}`,
                method: "PUT",
                body: { userId, desc },
            }),
            invalidatesTags: (result, error, arg) => [{ type: "Post", id: arg.postId }],
        }),
    }),
});

export const {
    useUploadImageMutation,
    usePostDataMutation,
    useGetTimelinePostsQuery,
    useLikePostMutation,
    useGetOnePostQuery,
    useDeletePostMutation,
    useUpdatePostMutation,
} = postsApiSlice;
