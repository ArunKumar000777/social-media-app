import React, { useState } from "react";
import { Followers } from "../../Data/FollowersData";
import { useGetTimelinePostsQuery } from "../../features/posts/postsApiSlice";
import {
    useFollowUserMutation,
    useUnFollowMutation,
    useGetUsersQuery,
    useRefreshTokenQuery,
} from "../../features/users/usersApiSlice";
import useAuth from "../../hooks/useAuth";
import "./user.css";

const User = ({ user }) => {
    const { refetch } = useRefreshTokenQuery();
    const userId = useAuth();

    const { refetch: getTimeLine } = useGetTimelinePostsQuery(userId.userId);
    const { user: currentUser } = useAuth();
    const [followUser, { isLoading: loading, isSuccess: success, isError: Error, error: errror }] = useFollowUserMutation();
    const [unFollow, { isSuccess, isLoading, error }] = useUnFollowMutation();
    const [following, setFollowing] = useState(user?.followers?.includes(currentUser?._id));
    console.log("🚀 ~ file: User.jsx ~ line 20 ~ User ~ following", following);
    const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER;
    console.log(userId);
  
    const handleFollow = async () => {
        if (following) {
            const response = await unFollow({ otherUsers: user._id, userId });
            console.log("🚀 ~ file: User.jsx ~ line 31 ~ handleFollow ~ response", response);
            console.log(isSuccess);
            setFollowing(!following);
            refetch();
            getTimeLine();
        } else {
            const res = await followUser({ otherUsers: user._id, userId });
            console.log("🚀 ~ file: User.jsx ~ line 37 ~ handleFollow ~ res", res);
            // success ? setFollowers((prev) => prev) : setFollowers((prev) => !prev);
            setFollowing(!following);
            refetch();
            getTimeLine();
        }
    };

    return (
        <div className="follower">
            <div>
                <img
                    className="followerImg"
                    src={user.profilePicture ? serverPublic + user.profilePicture : serverPublic + "defaultProfile.png"}
                    alt="user"
                />
                <div className="name">
                    <span> {user.firstname} </span>
                    <span>@ {user.username}</span>
                </div>
            </div>
           
            {
                <button className={following ? "button fc-button unfollow" : "button fc-button"} onClick={handleFollow}>
                    {following ? "unfollow" : "follow"}
                </button>
            }
        </div>
    );
};

export default User;
