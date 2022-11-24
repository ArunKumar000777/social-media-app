import React from "react";
import { useSelector } from "react-redux";
import jwtDecode from "jwt-decode";
import { selectCurrentToken } from "../features/auth/authSlice";

const useAuth = () => {
    const token = useSelector(selectCurrentToken);
    // console.log(token)
    let status = "User";
    let isAdmin = false
    if (token) {
        const decoded = jwtDecode(token);
        const { username, isAdmin,userId,user } = decoded.userInfo;
        if (isAdmin) status = "Admin";
        return {username,isAdmin,status,userId,user}
    }

    return {username:'',isAdmin,status};
};

export default useAuth;
