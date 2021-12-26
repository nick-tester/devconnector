import axios from "axios";

import {
    AUTH_SIGNUP_REQUEST,
    AUTH_SIGNUP_SUCCESS,
    AUTH_SIGNUP_ERROR,
    AUTH_SIGNIN_REQUEST,
    AUTH_SIGNIN_SUCCESS,
    AUTH_SIGNIN_ERROR,
    AUTH_USER_DETAILS,
    AUTH_USER_LOGOUT
} from "./auth_constants";
import { setAlert } from "./alert_actions";

const register = formData => async (dispatch) => {
    try {
        dispatch({ type: AUTH_SIGNUP_REQUEST });

        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        };

        const { data } = await axios.post("http://localhost:5000/api/auth/register", formData, config);

        dispatch({
            type: AUTH_SIGNUP_SUCCESS,
            payload: data
        });

        localStorage.setItem("token", JSON.stringify(data));
    } catch (err) {
        const errors = err.response.data.errors;

        if (errors) {
            errors.map(error => dispatch(setAlert(error.msg, "danger")));
        }

        dispatch({ type: AUTH_SIGNUP_ERROR });
    }
};

const login = formData => async (dispatch) => {
    try {
        dispatch({ type: AUTH_SIGNIN_REQUEST });

        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        };

        const { data } = await axios.post("http://localhost:5000/api/auth/login", formData, config);

        dispatch({
            type: AUTH_SIGNIN_SUCCESS,
            payload: data
        });

        localStorage.setItem("token", JSON.stringify(data));
    } catch (err) {
        const errors = err.response.data.errors;

        if (errors) {
            errors.map(error => dispatch(setAlert(error.msg, "danger")));
        }

        dispatch({ type: AUTH_SIGNIN_ERROR });
    }
};

const getUserDetails = () => async (dispatch, getState) => {
    try {
        const { auth: { token } } = getState();

        const config = {
            headers: {
                "x-auth-token": `${token}`
            }
        };

        const { data } = await axios.get("http://localhost:5000/api/users", config);

        dispatch({ type: AUTH_USER_DETAILS, payload: data });

    } catch (err) {
        console.error(err.message);
    }
};

const logout = () => (dispatch) => {
    dispatch({ type: AUTH_USER_LOGOUT });
}

export { register, login, getUserDetails, logout };