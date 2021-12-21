import { randomBytes } from "crypto";

import { SET_ALERT, REMOVE_ALERT } from "./alert_constants";

const setAlert = (msg, alertType) => (dispatch) => {
    const id = randomBytes(4).toString("hex");

    dispatch({
        type: SET_ALERT,
        payload: { id, msg, alertType }
    });

    setTimeout(() => {
        dispatch({ type: REMOVE_ALERT, payload: id });
    }, 3000);
};

export { setAlert };
