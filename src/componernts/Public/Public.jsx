import React from "react";
import { Link } from "react-router-dom";
import "./public.css";
const Public = () => {
    return (
        <div className="welcome__container">
            <h1>Welcom to the Page</h1>
            <Link to="/login">
                <span>Please Login Or SignUp</span>
            </Link>
        </div>
    );
};

export default Public;
