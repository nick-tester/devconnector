import {
    AUTH_REG_REQUEST,
    AUTH_REG_SUCCESS,
    AUTH_REG_ERROR
} from "./auth_constants";

const initialState = {
    loading: false,
    token: localStorage.getItem("token") ? JSON.parse(localStorage.getItem("token")) : null,
    isAuthenticated: null,
    user: null
};

const registerReducer = (state = initialState, action) => {
    const { type, payload } = action;

    switch (type) {
        case AUTH_REG_REQUEST:
            return { ...state, loading: true };

        case AUTH_REG_SUCCESS:
            return {
                ...state,
                loading: false,
                isAuthenticated: true,
                token: localStorage.setItem("token", JSON.stringify(payload.token)),
                user: payload.user
            };

        case AUTH_REG_ERROR:
            localStorage.removeItem("token");
            return { ...state, loading: false };

        default:
            return state;
    }
};

const authReducers = {
    register: registerReducer
}

export default authReducers;