import { configureStore } from '@reduxjs/toolkit'
import settingsReducer from "./reducers/settings"
import booksReducer from "./reducers/books";

export const store = configureStore({
    reducer: {
        settings:settingsReducer,
        books:booksReducer,
    },
})
