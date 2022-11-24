import React from "react";
import "./Posts.css";
import Post from "../Post/Post";
import { useGetTimelinePostsQuery } from "../../features/posts/postsApiSlice";
import useAuth from "../../hooks/useAuth";
import { useParams } from "react-router-dom";
const Posts = () => {
    const { userId: currentUserId } = useParams();
    const { userId } = useAuth();

    let { data: posts, isLoading, isSuccess, isError, error } = useGetTimelinePostsQuery(userId);

    let content;
    if (!posts?.length) return (content = "No posts found");
    if (currentUserId) {
        posts = posts.filter((post) => post.userId === currentUserId);
    }

    if (isSuccess) {
        const postContent = posts?.map((post) => <Post post={post} key={post._id} />);
        content = <div className="posts">{postContent}</div>;
    }

    return content;
};

export default Posts;
