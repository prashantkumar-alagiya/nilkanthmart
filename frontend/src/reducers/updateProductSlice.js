import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const updateProduct = createAsyncThunk('api/products/update', async (product, data) => {
    const {getState} = data;
    const state  = getState();
    const token = state?.userLogin?.userInfo?.token;
    const {id} = product;

    try {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization : `Bearer ${token}`
            }
        }
        const {data} = await axios.put(`/api/products/${id}`,product,config);
        
        return data;
    }
    catch (e){
        return e;
    }
   
})  

const updateProductSlice =  createSlice({
    name: 'updateProduct',
    initialState: {},
    reducers: {
        resetProductUpdate: (state, action) => {
            state = {};
            return state
        }
    },
    extraReducers:{
        [updateProduct.pending]: (state,action) => {
            state.isLoading = true;
        },
        [updateProduct.fulfilled] : (state, action)  => {
            state.isLoading = false;
            state.success = true;
            state.product = action.payload;
        },
        [updateProduct.rejected]: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        } 
    }
})

export default updateProductSlice.reducer;

const updateProductactions = updateProductSlice.actions;

export {updateProductactions}