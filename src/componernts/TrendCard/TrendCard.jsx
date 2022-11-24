import React from "react";
import "./TrendCard.css";
import { TrendData } from "../../Data/TrendData";

const TrendCard = () => {
    return (
        <div className="trendCard">
            <h3>Trends for you</h3>
            {TrendData?.map((data) => {
                return (
                    <div className="trend" key={data.name}>
                        <span><b>#{data.name}</b></span>
                        <span>{data.shares}k shares</span>
                    </div>
                );
            })}
        </div>
    );
};

export default TrendCard;
