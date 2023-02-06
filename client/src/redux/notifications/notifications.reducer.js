import NotificationsTypes from "./notifications.types";

const notificationsReducer = (state = [] , action ) => {
    switch (action.type) {
        case NotificationsTypes.SET_NOTIFICATION:
            return (
                [...state, action.payload]
            )
        default:
            return state
    }
}

export default notificationsReducer