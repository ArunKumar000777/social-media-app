import React from "react";
import PostSide from "../../componernts/Postside/PostSide";
import ProfileCard from "../../componernts/ProfileCard/ProfileCard";
import ProfileLeft from "../../componernts/ProfileLeft/ProfileLeft";
import RightSide from "../../componernts/RightSide/RightSide";
import "./Profile.css";
const Profile = () => {
    return (
        <div className="profile">
            <ProfileLeft />
            <div className="profile-center">
                <ProfileCard  location='profilePage'/>
                <PostSide />
            </div>
            <RightSide/>
        </div>
    );
};

export default Profile;
