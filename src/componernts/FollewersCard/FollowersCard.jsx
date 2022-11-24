import React from "react";
import "./FollowersCard.css";
import { useGetUsersQuery } from "../../features/users/usersApiSlice";
import User from "../User/User";
import useAuth from "../../hooks/useAuth";

const FollowersCard = () => {
    const { data: users, isLoading, isSuccess, isError, error } = useGetUsersQuery("usersList");
    const { userId } = useAuth();
    console.log(userId);
    // {
    //     pollingInterval: 15000,
    //     refetchOnFocus: true,
    //     refetchOnMountOrArgChange: true,
    // }
    //     console.log(users);
    // const som = JSON.stringify(users)
    // console.log('som' ,som)
    // const par = JSON.parse(som)
    // console.log('par',par)
    // console.log(typeof null)
    return (
        <div className="FollowerCard">
            <h3>People you may know</h3>
            {users?.map((user, id) => {
                if (userId !== user._id) {
                    return <User user={user} key={id} />;
                }
            })}
        </div>
    );
};

export default FollowersCard;
