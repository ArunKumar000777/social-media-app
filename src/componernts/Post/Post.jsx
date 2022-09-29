import React from "react";
import "./Post.css";
import Like from "@mui/icons-material/FavoriteOutlined";
import NotLike from "@mui/icons-material/FavoriteBorderOutlined";
import ShareIcon from "@mui/icons-material/SendOutlined";
import CommentIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";

const Post = ({ data }) => {
    return (
        <div className="post">
            <img src={data.img} alt="postImage" />

            <div className="postReact">
                {data.liked ? <Like style={{ color: "var(--orange)" }} /> : <NotLike style={{ color: "#8d8181" }} />}
                <CommentIcon style={{ color: "#8d8181" }} />
                <ShareIcon style={{ color: "#8d8181" }} />
            </div>
            <span>{data.likes} likes</span>

            <div className="desc">
                <span>
                    <b>{data.name}</b>
                </span>
                <span> {data.desc}</span>
            </div>
        </div>
    );
};

export default Post;
