import React from "react";
import "./RightSide.css";
import HomeIcon from "@mui/icons-material/Home";
import NotificationsIcon from "@mui/icons-material/NotificationsNone";
import SettingsIcon from "@mui/icons-material/Settings";
import CommentIcon from "@mui/icons-material/MarkUnreadChatAlt";
import TrendCard from "../TrendCard/TrendCard";

const RightSide = () => {
    return (
        <div className="rightSide">
            <div className="navIcons">
                <div className="icon">
                    <HomeIcon />
                </div>
                <div className="icon">
                    <SettingsIcon />
                </div>
                <div className="icon">
                    <NotificationsIcon />
                </div>
                <div className="icon">
                    <CommentIcon />
                </div>
            </div>

            <TrendCard/>

            <button className="button r-button">Share</button>
        </div>
    );
};

export default RightSide;
