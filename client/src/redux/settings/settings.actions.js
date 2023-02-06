import SettingsTypes from "./settings.types";

export const changeSetting = (setting) => ({
    type: SettingsTypes.CHANGE_SETTINGS,
    payload: setting
})