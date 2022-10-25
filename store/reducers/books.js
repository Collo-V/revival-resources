import { createSlice } from "@reduxjs/toolkit";
import {insertKey} from "../../commons/objects";
export const productSlice = createSlice({
    name:'products',
    initialState:{
        books:{} ,
        categories:[],
        authors:[],
        deletedIds:[]
    },
    reducers:{
        writeBooks(state,action){
            const books = action.payload
            state.books = books

        } ,
       riteCategories(state,action){
            state.categories = action.payload

        },
        writeAuthors(state,action){
            state.authors = action.payload

        }

    }

})
export const {writeBooks,writeCategories,writeAuthors} = productSlice.actions
export default productSlice.reducer
