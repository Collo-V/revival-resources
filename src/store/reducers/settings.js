import { createSlice } from '@reduxjs/toolkit'

export const setingsSlice = createSlice({
    name: 'settings',
    initialState:{
        darkMode:false

    },
    reducers: {
        writeDarkMode:((state,action) => {
            state.darkMode = action.payload
        }),


    },
})

// Action creators are generated for each case reducer function
export const {writeDarkMode } = setingsSlice.actions

export default setingsSlice.reducer
