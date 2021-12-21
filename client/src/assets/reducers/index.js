import { combineReducers } from "redux";

import { alertReducers } from "./alert_reducers";

export default combineReducers({
    alerts: alertReducers
});