import axios from "axios";
// import { setAlert } from "./alert_actions";
import {
    GET_PROFILE_REQUEST,
    GET_PROFILE_SUCCESS,
    GET_PROFILE_FAIL
} from "./profile_constants";

const URL = "http://localhost:5000/api";

const getCurrentUserProfile = () => async (dispatch, getState) => {
    try {
        dispatch({ type: GET_PROFILE_REQUEST });

        const config = {
            headers: {
                "x-auth-token": getState().auth.token
            }
        };

        const res = await axios.get(`${URL}/profile/me`, config);

        dispatch({ type: GET_PROFILE_SUCCESS, payload: res.data });
    } catch (err) {
        dispatch({
            type: GET_PROFILE_FAIL,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
};

export { getCurrentUserProfile };