// import TwitterIcon from "@mui/icons-material/Twitter";
import React, { useRef } from "react";
import "./Auth.css";
import Logo from "../../img/logo.png";
import { useState } from "react";
import { useEffect } from "react";
// import { login, signUp } from "../../redux/apiCalls";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useLoginMutation, useSignUpMutation } from "../../features/auth/authApiSlice";
import { setCredentials } from "../../features/auth/authSlice";
const Auth = () => {
    // change signUp and login page
    const [isSignUp, setIsSignUp] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const userRef = useRef();
    useEffect(() => {
        userRef.current.focus();
    }, []);

    const [signUpError, setSignUpError] = useState(null);
    const [login, { isLoading }] = useLoginMutation();
    const [signUp, { isLoading: loading, isError, error, isSuccess }] = useSignUpMutation();

    const [loginError, setLoginError] = useState("");
    // console.log(loginError);
    
    const [formData, setFormData] = useState({
        firstname: "",
        lastname: "",
        username: "",
        password: "",
        confirmpass: "",
    });
    const [confirmPassword, setConfirmPassword] = useState(true);

    useEffect(() => {
        setLoginError("");
    }, [formData.username, formData.password]);
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

    const username = formData.username;
    const password = formData.password;
    const firstname = formData.firstname;
    const lastname = formData.lastname;

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (isSignUp) {
            const res = await signUp({ username, password, firstname, lastname });
            console.log(res);
            !error && setIsSignUp(!isSignUp);
            // isSuccess && navigate("/login");
            console.log(isSignUp);
        } else {
            try {
                const res = await login({ username, password });

                if (res?.data?.accessToken) {
                    dispatch(setCredentials({ accessToken: res?.data?.accessToken }));
                    navigate("/home");
                } else if (res?.error?.status === 400 || res?.error?.status === 404) {
                    setLoginError(res.error?.data?.message);
                }
            } catch (error) {
                console.log(error);
            }
        }
    };
    useEffect(() => {
        setSignUpError("");
    }, [formData.username]);

    useEffect(() => {
        if (isError) {
            setSignUpError("username already in use");
        }
    }, [isError]);
    return (
        <div className="Auth">
            {/* left side */}
            <div className="a-left">
                <img src={Logo} alt="" />
                <div className="Webname">
                    <h1>Media</h1>
                    <h6>Explore the ideas throughout the world</h6>
                </div>
            </div>

            {/* right side */}
            <div className="a-right">
                <form className="infoForm authForm" onSubmit={handleSubmit}>
                    <h3>{isSignUp ? "Sign up" : "Log in"} </h3>
                    <span className="auth__error">{loginError}</span>

                    {isSignUp && (
                        <>
                            <span>{isError && signUpError}</span>
                            <div>
                                <input
                                    type="text"
                                    placeholder="First Name"
                                    className="infoInput"
                                    name="firstname"
                                    onChange={handleChange}
                                    value={formData.firstname}
                                    required
                                />
                                <input
                                    type="text"
                                    placeholder="Last Name"
                                    className="infoInput"
                                    name="lastname"
                                    onChange={handleChange}
                                    value={formData.lastname}
                                    required
                                />
                            </div>
                        </>
                    )}

                    <div>
                        <input
                            type="text"
                            className="infoInput"
                            name="username"
                            ref={userRef}
                            placeholder="Username"
                            onChange={handleChange}
                            value={formData.username}
                            required
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
                            required
                        />
                        {isSignUp && (
                            <input
                                type="password"
                                className="infoInput"
                                name="confirmpass"
                                placeholder="Confirm Password"
                                onChange={handleChange}
                                value={formData.confirmpass}
                                required
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
                    <button className="button infoButton" type="submit" disabled={isLoading}>
                        {isSignUp ? "Signup" : "Login"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Auth;
