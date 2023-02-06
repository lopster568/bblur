import { AlertTypes } from "./alert.types";

const INITIAL_STATE = {
    open: false,
    message: ""
}

const alertReducer = (state = INITIAL_STATE , action) => {
    switch (action.type) {
        case AlertTypes.SET_ALERT:
           return {
                ...state, 
                open: true,
                message: action.payload
           }
        case AlertTypes.CLOSE_ALERT:
           return {
                ...state, 
                open: false,
                message: ""
           }
        default:
            return state
    }
}

export default alertReducer