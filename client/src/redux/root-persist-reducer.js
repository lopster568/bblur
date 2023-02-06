import userReducer from './user/user.reducers'
import themeReducer from './theme/theme.reducers'
import notificationsReducer from './notifications/notifications.reducer'
import { persistReducer } from 'redux-persist'
import { combineReducers } from 'redux'
import storage from 'redux-persist/lib/storage'
import postLoadingReducer from './post-loading/post-loading.reducer'
import settingsReducer from './settings/settings.reducer'
import alertReducer from './alert/alert.reducer'


const rootReducer = combineReducers({
    user: userReducer,
    theme: themeReducer,
    notifcations: notificationsReducer,
    post_loading: postLoadingReducer,
    settings: settingsReducer,
    alert: alertReducer
})

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['theme', 'user']
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export default persistedReducer