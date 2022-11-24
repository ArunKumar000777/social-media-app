import React from "react";
import "./RightSide.css";
import HomeIcon from "@mui/icons-material/Home";
import NotificationsIcon from "@mui/icons-material/NotificationsNone";
import SettingsIcon from "@mui/icons-material/Settings";
import CommentIcon from "@mui/icons-material/MarkUnreadChatAlt";
import TrendCard from "../TrendCard/TrendCard";
import { NavLink } from "react-router-dom";
const RightSide = () => {
    let activeStyle = {
        textDecoration: "underline",
        color: "orange",
    };

    let activeClassName = {
        color: "gray",
    };
    return (
        <div className="rightSide">
            <div className="navIcons">
                <div className="icon">
                    <NavLink to={"/home"} end style={({ isActive }) => (isActive ? activeStyle : activeClassName)}>
                        <HomeIcon />
                    </NavLink>
                </div>
                <div className="icon">
                    <SettingsIcon />
                </div>
                <div className="icon">
                    <NotificationsIcon />
                </div>
                <div className="icon">
                    <NavLink to={'/chat'} style={({ isActive }) => (isActive ? activeStyle : activeClassName)}>
                        <CommentIcon />
                    </NavLink>
                </div>
            </div>

            <TrendCard />

            <button className="button r-button">Share</button>
        </div>
    );
};

export default RightSide;
