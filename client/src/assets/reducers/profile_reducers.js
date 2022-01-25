import {
    GET_PROFILE_REQUEST,
    GET_PROFILE_SUCCESS,
    GET_PROFILE_FAIL
} from "./profile_constants";

const initialState = {
    profile: null,
    profiles: [],
    repos: [],
    loading: false,
    error: {}
};

const profileReducers = (state = initialState, action) => {
    const { type, payload } = action;

    switch (type) {
        case GET_PROFILE_REQUEST:
            return { ...state, loading: true };

        case GET_PROFILE_SUCCESS:
            return { ...state, loading: false, profile: payload };

        case GET_PROFILE_FAIL:
            return { ...state, loading: false };

        default:
            return state;
    }
};

export { profileReducers };