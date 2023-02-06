import SettingsTypes from "./settings.types"

const INITIAL_STATE = {

}

const settingsReducer = (state = INITIAL_STATE , action) => {
    switch (action.type) {
        case SettingsTypes.CHANGE_SETTINGS:
            return state
        default:
            return state
    }
}

export default settingsReducer