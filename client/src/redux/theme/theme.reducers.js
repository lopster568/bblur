import ThemeTypes from "./theme.types";
const INITIAL_STATE = {
    mode: 'light'
}
const themeReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case ThemeTypes.TOGGLE_THEME:
            if(state.mode === 'light') {
                return ({
                    mode: 'dark'
                })
            } else {
                return ({
                    mode: 'light'
                })
            }
        default:
            return state
    }
}

export default themeReducer