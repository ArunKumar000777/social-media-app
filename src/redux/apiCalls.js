import { publicRequest } from "../requestMethods";
import { loginFailure, loginStart, loginSuccess } from "./userRedux";


// LOGIN
export const login = async (dispatch, user) => {
    dispatch(loginStart());
    try {
        const res = await publicRequest.post("auth/login", user);
        dispatch(loginSuccess(res.data));
        console.log(res.data);
    } catch (error) {
        dispatch(loginFailure());
        console.log(error);
    }
};

// SINGNUP
export const signUp = async (dispatch, user) => {
    dispatch(loginStart());
    try {
        const res = await publicRequest.post("auth/register", user);
        dispatch(loginSuccess(res.data));
        console.log(res.data);
    } catch (error) {
        dispatch(loginFailure());
        console.log(error);
    }
};

