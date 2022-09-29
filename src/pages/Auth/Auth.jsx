// import TwitterIcon from "@mui/icons-material/Twitter";
import React from "react";
import "./Auth.css";
import Logo from "../../img/logo.png";
import { useState } from "react";
import { useEffect } from "react";
import { login, signUp } from "../../redux/apiCalls";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

const Auth = () => {
    // change signUp and login page
    const [isSignUp, setIsSignUp] = useState(true);

    // store the user details temporoly using useState hook
    const [formData, setFormData] = useState({
        firstname: "",
        lastname: "",
        username: "",
        password: "",
        confirmpass: "",
    });
    const [confirmPassword, setConfirmPassword] = useState(true);

    // receiving user details via events
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // reset useStates
    const resetFormData = () => {
        setFormData({
            firstname: "",
            lastname: "",
            username: "",
            password: "",
            confirmpass: "",
        });
    };

    // confirm password feature
    useEffect(() => {
        const fire = () => {
            if (formData.password !== formData.confirmpass) {
                setConfirmPassword(false);
            } else {
                setConfirmPassword(true);
            }
        };
        fire();
    }, [formData.confirmpass]);

    // login
    const username = formData.username;
    const password = formData.password;
    const firstname = formData.firstname;
    const lastname = formData.lastname;
    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isSignUp) {
            signUp(dispatch, { username, password, firstname, lastname });
        } else {
            login(dispatch, { username, password });
        }
    };

    return (
        <div className="Auth">
            {/* left side */}
            <div className="a-left">
                <img src={Logo} alt="" />
                <div className="Webname">
                    <h1>ZKC Media</h1>
                    <h6>Explore the ideas throughout the world</h6>
                </div>
            </div>

            {/* right side */}
            <div className="a-right">
                <form className="infoForm authForm" onSubmit={handleSubmit}>
                    <h3>{isSignUp ? "Sign up" : "Log in"} </h3>

                    {isSignUp && (
                        <div>
                            <input
                                type="text"
                                placeholder="First Name"
                                className="infoInput"
                                name="firstname"
                                onChange={handleChange}
                                value={formData.firstname}
                            />
                            <input
                                type="text"
                                placeholder="Last Name"
                                className="infoInput"
                                name="lastname"
                                onChange={handleChange}
                                value={formData.lastname}
                            />
                        </div>
                    )}

                    <div>
                        <input
                            type="text"
                            className="infoInput"
                            name="username"
                            placeholder="Username"
                            onChange={handleChange}
                            value={formData.username}
                        />
                    </div>

                    <div>
                        <input
                            type="password"
                            className="infoInput"
                            name="password"
                            placeholder="Password"
                            onChange={handleChange}
                            value={formData.password}
                        />
                        {isSignUp && (
                            <input
                                type="password"
                                className="infoInput"
                                name="confirmpass"
                                placeholder="Confirm Password"
                                onChange={handleChange}
                                value={formData.confirmpass}
                            />
                        )}
                    </div>
                    <span
                        style={{
                            display: confirmPassword ? "none" : "block",
                            color: "red",
                            fontSize: "12px",
                            alignSelf: "flex-end",
                            marginRight: "17px",
                        }}
                    >
                        * Confirm password is not same
                    </span>

                    <div>
                        <span
                            style={{ fontSize: "12px", cursor: "pointer" }}
                            onClick={() => {
                                setIsSignUp(!isSignUp);
                                resetFormData();
                            }}
                        >
                            {isSignUp ? " Already have an account. Login!" : "Don't have an account. Sign up!"}
                        </span>
                    </div>
                    <button className="button infoButton" type="submit">
                        {isSignUp ? "Signup" : "Login"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Auth;
