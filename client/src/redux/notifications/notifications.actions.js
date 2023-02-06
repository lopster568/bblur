import NotificationsTypes from "./notifications.types"

export const setNotifications = (data) =>  ({
    type: NotificationsTypes.SET_NOTIFICATION,
    payload : data
})