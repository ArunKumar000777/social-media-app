import React from "react";
import "./InfoCard.css";
import Edit from "@mui/icons-material/EditOutlined";

const InfoCard = () => {
    return (
        <div className="infoCard">
            <div className="infoHeading">
                <h4>Your Info</h4>
                <div className="edit">
                    <Edit />
                </div>
            </div>
            <div className="info">
                <span>
                    <b>Status</b>
                </span>
                <span> in Relationship</span>
            </div>
            <div className="info">
                <span>
                    <b>Lives in</b>
                </span>
                <span> kerala</span>
            </div>
            <div className="info">
                <span>
                    <b>Works at</b>
                </span>
                <span> youtube</span>
            </div>

            <button className="button L-button">Logout</button>
        </div>
    );
};

export default InfoCard;
