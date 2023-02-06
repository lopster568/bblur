import { AlertTypes } from "./alert.types";

export const setAlert = (message) => ({
    type: AlertTypes.SET_ALERT,
    payload: message
})
export const closeAlert = () => ({
    type: AlertTypes.CLOSE_ALERT
})