import React from "react";
import "./ProfileCard.css";
import useAuth from "../../hooks/useAuth";
import { Link, useParams } from "react-router-dom";
import { useGetTimelinePostsQuery } from "../../features/posts/postsApiSlice";
import { useGetUsersQuery } from "../../features/users/usersApiSlice";
// import { useGetUserProfileInfoQuery } from "../../features/users/usersApiSlice";


function ProfileCard({ location }) {

    const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER;

    const { user } = useAuth();
    const { post } = useGetTimelinePostsQuery(user?._id, {
        selectFromResult: ({ data }) => ({
            post: data?.filter((post) => post.userId === user?._id),
        }),
    });

    return (
        <div className="profileCard">
            <div className="profileImages">
                <div className="coverImage__container">
                    <img
                        src={user?.coverPicture ? serverPublic + user.coverPicture : serverPublic + "defaultCover.jpg"}
                        alt=""
                        className="coverImage"
                    />
                </div>
                <div className="profileImage__container">
                    <img
                        src={user?.profilePicture ? serverPublic + user.profilePicture : serverPublic + "defaultProfile.png"}
                        alt=""
                        className="profileImage"
                    />
                </div>
            </div>

            <div className="profile__name">
                <span>
                    {user?.firstname}
                    {user?.lastname}
                </span>
                <span>{user?.worksAt || "Write about yourself"}</span>
            </div>

            <div className="followStatus__container">
                <hr />
                <div>
                    <div className="follow">
                        <span>{user?.followers?.length}</span>
                        <span>Followers</span>
                    </div>
                    <div className="vl"></div>
                    <div className="follow">
                        <span>{user?.following?.length}</span>
                        <span>Following</span>
                    </div>
                    {location === "profilePage" && (
                        <>
                            <div className="vl"></div>
                            <div className="follow">
                                <span>{post?.length}</span>
                                <span>Posts</span>
                            </div>
                        </>
                    )}
                </div>
                <hr />
            </div>
            {location === "profilePage" ? (
                ""
            ) : (
                <span>
                    <Link style={{ textDecoration: "none", color: "inherit" }} to={`/profile/${user._id}`}>
                        My Profile
                    </Link>
                </span>
            )}
        </div>
    );
}

export default ProfileCard;
