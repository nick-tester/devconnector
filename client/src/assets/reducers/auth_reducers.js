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

const initialState = {
    loading: false,
    token: null,
    isAuthenticated: null,
    user: null
};

const authReducers = (state = initialState, action) => {
    const { type, payload } = action;

    switch (type) {
        case AUTH_SIGNUP_REQUEST:
        case AUTH_SIGNIN_REQUEST:
            return { ...state, loading: true };

        case AUTH_SIGNUP_SUCCESS:
        case AUTH_SIGNIN_SUCCESS:
            return {
                ...state,
                loading: false,
                token: payload,
                isAuthenticated: true
            };

        case AUTH_USER_DETAILS:
            return { ...state, user: payload };

        case AUTH_SIGNUP_ERROR:
        case AUTH_SIGNIN_ERROR:
        case AUTH_USER_LOGOUT:
            localStorage.removeItem("token");
            return {
                ...state,
                loading: false,
                token: null,
                isAuthenticated: false,
                user: {}
            };

        default:
            return state;
    }
};

export default authReducers;