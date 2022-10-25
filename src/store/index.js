import { configureStore } from '@reduxjs/toolkit'
import settingsReducer from "./reducers/settings"
import productsReducer from "./reducers/products";

export const store = configureStore({
    reducer: {
        settings:settingsReducer,
        products:productsReducer
    },
})
