import { combineReducers } from "redux";

import { alertReducers } from "./alert_reducers";
import authReducers from "./auth_reducers";

export default combineReducers({
    alerts: alertReducers,
    auth: authReducers
});