import React from "react";
import FollowersCard from "../FollewersCard/FollowersCard";
import LogoSearch from "../LogoSearch/LogoSearch";
import ProfileCard from "../ProfileCard/ProfileCard";

import "./ProfileSide.css";


const ProfileSide = () => {
    
    return (
        <div className="profileSide">
            <LogoSearch />
            <ProfileCard location='homePage'/>
            <FollowersCard/>
        </div>
    );
};

export default ProfileSide;
