import PostLoadingTypes from "./post-loading.types";
 
const postLoadingReducer = (state = true , action) => {
    switch (action.type) {
        case PostLoadingTypes.TOGGLE_LOADING:
              return !state  
        default:
            return state
    }
}

export default postLoadingReducer