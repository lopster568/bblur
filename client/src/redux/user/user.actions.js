import UserTypes from "./user.types";
import * as api from '../../api/user.js'

export const getCurrentUser = () => async (dispatch) => {
    try {
        const { data } = await api.currentUser()
        dispatch({
            type: UserTypes.GET_CURRENT_USER,
            paylaod: data
        })
    } catch (error) {
        console.log(error.message)
    }
}

export const setCurrentUser = (user) => ({
    type: UserTypes.SET_CURRENT_USER,
    payload: user
})

export const updateCurrentUser = (user) => ({
    type: UserTypes.UPDATE_CURRENT_USER,
    payload: user
})

export const refreshUser = () => async(dispatch) => {
    try {
        const { data } = await api.refreshUser()
        dispatch({
            type: UserTypes.UPDATE_CURRENT_USER,
            payload: data
        })
    } catch (error) {
        console.log(error)
    }
}