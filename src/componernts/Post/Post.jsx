import React, { useState } from "react";
import "./Post.css";
import Like from "@mui/icons-material/FavoriteOutlined";
import NotLike from "@mui/icons-material/FavoriteBorderOutlined";
import ShareIcon from "@mui/icons-material/SendOutlined";
import CommentIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import { useLikePostMutation } from "../../features/posts/postsApiSlice";
import useAuth from "../../hooks/useAuth";
import { Link } from "react-router-dom";

const Post = ({ post }) => {
    const { userId } = useAuth();

    // const { refetch } = useGetTimelinePostsQuery(userId);

    const [likePost, { isLoading, isSuccess, isError, error }] = useLikePostMutation();

    const flag = post?.likes?.includes(userId);

    const [liked, setLiked] = useState(flag);

    const handleLike = async () => {
        setLiked((prev) => !prev);

        const res = await likePost({ postId: post._id, userId });

        liked && setLiked(!flag);

        // refetch();
    };

    return (
        <div className="post">
            <Link to={`/post/${post._id}`} style={{ color: "inherit", textDecoration: "inherit" }}>
                <img
                    className="post_image"
                    src={post?.image ? process.env.REACT_APP_PUBLIC_FOLDER + post?.image : ""}
                    alt="postImage"
                />
            </Link>
            <div className="post_info">
                <div className="postReact">
                    {liked ? (
                        <Like style={{ color: "var(--orange)", cursor: "pointer" }} onClick={handleLike} />
                    ) : (
                        <NotLike style={{ color: "#8d8181", cursor: "pointer" }} onClick={handleLike} />
                    )}
                    <CommentIcon style={{ color: "#8d8181" }} />
                    <ShareIcon style={{ color: "#8d8181" }} />
                </div>
                <span>{post?.likes?.length} likes</span>
                <div className="desc">
                    <span>
                        <b>{post?.name}</b>
                    </span>
                    <Link to={`/post/${post._id}`} style={{ color: "inherit", textDecoration: "inherit" }}>
                        <span> {post?.desc}</span>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Post;
