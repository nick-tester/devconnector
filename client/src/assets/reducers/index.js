import { combineReducers } from "redux";

import { alertReducers } from "./alert_reducers";
import authReducers from "./auth_reducers";
import { profileReducers } from "./profile_reducers";

export default combineReducers({
    alerts: alertReducers,
    auth: authReducers,
    user: profileReducers
});