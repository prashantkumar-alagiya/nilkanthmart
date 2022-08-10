import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const createProduct = createAsyncThunk('api/products/create', async (product, data) => {
    const {getState} = data;
    const state  = getState();
    const token = state?.userLogin?.userInfo?.token;
    console.log("product is ", product);

    try {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization : `Bearer ${token}`
            }
        }
        const {data} = await axios.post(`/api/products`,product,config);
        
        return data;
    }
    catch (e){
        return e;
    }
   
})  

const createProductSlice =  createSlice({
    name: 'productCreate',
    initialState: {},
    reducers: {
        resetProductCreate: (state, action) => {
            state = {};
            return state
        }
    },
    extraReducers:{
        [createProduct.pending]: (state,action) => {
            state.isLoading = true;
        },
        [createProduct.fulfilled] : (state, action)  => {
            state.isLoading = false;
            state.success = true;
            state.product = action.payload;
        },
        [createProduct.rejected]: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        } 
    }
})

export default createProductSlice.reducer;

const createProductactions = createProductSlice.actions;

export {createProductactions}