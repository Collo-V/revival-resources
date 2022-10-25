import { createSlice } from "@reduxjs/toolkit";
import {insertKey} from "../../commons/objects";
export const productSlice = createSlice({
    name:'products',
    initialState:{
        products:{} ,
        offers:{}  ,
        categories:[],
        brands:[]
    },
    reducers:{
        writeProducts(state,action){
            const products = action.payload
            state.products = insertKey(products,'id')

        } ,
        writeOffers(state,action){
            state.offers = action.payload

        },
        writeCategories(state,action){
            state.categories = action.payload

        },
        writeBrands(state,action){
            state.brands = action.payload

        }

    }

})
export const {writeProducts,writeOffers,writeCategories,writeBrands} = productSlice.actions
export default productSlice.reducer
