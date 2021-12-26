import axios from "axios";

import {
    AUTH_REG_REQUEST,
    AUTH_REG_SUCCESS,
    AUTH_REG_ERROR
} from "./auth_constants";
import { setAlert } from "./alert_actions";

const register = formData => async (dispatch) => {
    try {
        dispatch({ type: AUTH_REG_REQUEST });

        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        };

        const { data } = await axios.post("http://localhost:5000/api/auth/register", formData, config);

        dispatch({
            type: AUTH_REG_SUCCESS,
            payload: { token: data.token, user: data.user }
        });
    } catch (err) {
        const errors = err.response.data.errors;

        if (errors) {
            errors.map(error => dispatch(setAlert(error.msg, "danger")));
        }

        dispatch({ type: AUTH_REG_ERROR });
    }
};

export { register };