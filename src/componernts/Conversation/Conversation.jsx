import React, { useState } from "react";
import { useGetUserQuery } from "../../features/users/usersApiSlice";

const Conversation = ({ data, currentUserId, online }) => {
    //? userData == other person --chat  not current user
    const [userData, setUserData] = useState(null);
    const receiverId = data.members.find((ids) => currentUserId !== ids);
    const { data: receiver, isLoading, isSuccess, isError, error } = useGetUserQuery(receiverId);
    const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER;
    return (
        <>
            <div className="follower conversation">
                <div>
                    <div style={{ position: "relative" }}>
                        {online && <div className="online-dot"></div>}
                        <img
                            src={
                                receiver?.profilePicture
                                    ? serverPublic + receiver?.profilePicture
                                    : serverPublic + "defaultProfile.png"
                            }
                            alt="profilepic"
                            className="followerImage"
                            style={{ width: "50px", height: "50px" }}
                        />
                    </div>
                    <div className="name" style={{ fontSize: "0.8rem" }}>
                        <span>
                            {receiver?.firstname} {receiver?.lastname}
                        </span>
                        <span>{online ? "Online" : "Offline"}</span>
                    </div>
                </div>
            </div>
            <hr style={{ width: "85%", border: "0.1px solid #ececec" }} />
        </>
    );
};

export default Conversation;
