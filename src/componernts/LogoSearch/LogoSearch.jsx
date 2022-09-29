import React from "react";
import "./LogoSearch.css";
import Logo from "../../img/logo.png";
import SearchIcon from "@mui/icons-material/Search";

const LogoSearch = () => {
    return (
        <div className="logoSearch">
            <img src={Logo} alt="" />
            <div className="search">
                <input type="text" placeholder="#Explore" className="leftSearch" />
                <div className="search__icon">
                    <SearchIcon />
                </div>
            </div>
        </div>
    );
};

export default LogoSearch;
