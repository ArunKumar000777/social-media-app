import React from "react";
import "./Posts.css";
import Post from "../Post/Post";
import { PostData } from "../../Data/PostData";

const Posts = () => {
    return <div className="posts">
       {PostData.map((post,id)=>{
        return <Post data={post} id={id}/>
       })}
    </div>;
};

export default Posts;
