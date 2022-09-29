import React from "react";
import "./ProfileCard.css";
import cover from "../../img/cover.jpg";
import profile from "../../img/profileImg.jpg";

function ProfileCard() {

    const profilePage = true
    return (
        <div className="profileCard">
            <div className="profileImages">
                <div className="coverImage__container">
                    <img src={cover} alt="" className="coverImage" />
                </div>
                <div className="profileImage__container">
                    <img src={profile} alt="" className="profileImage" />
                </div>
            </div>

            <div className="profile__name">
                <span>zandra</span>
                <span>Senior developer</span>
            </div>

            <div className="followStatus__container">
                <hr />
                <div>
                    <div className="follow">
                        <span>7,000</span>
                        <span>Followers</span>
                    </div>
                    <div className="vl"></div>
                    <div className="follow">
                        <span>2</span>
                        <span>Following</span>
                    </div>
                    {profilePage && (
                        <>
                        <div className="vl"></div>
                    <div className="follow">
                        <span>3</span>
                        <span>Posts</span>
                    </div>
                        </>
                    )}
                </div>
                <hr />
            </div>
            {
                profilePage ? '' :<span>My Profile</span>
            }
            
        </div>
    );
}

export default ProfileCard;
