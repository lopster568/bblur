import { configureStore } from '@reduxjs/toolkit'
import thunk from 'redux-thunk'
// import logger from 'redux-logger'
import persistedReducer from './root-persist-reducer'
import { persistStore } from 'redux-persist'

export const store = configureStore({
    reducer: persistedReducer,
    middleware: [thunk]
})

export const persistor = persistStore(store)
