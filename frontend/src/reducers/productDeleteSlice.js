import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const productDelete = createAsyncThunk('api/products/delete', async (id, data) => {
    const {getState} = data;
    const state  = getState();
    const token = state?.userLogin?.userInfo?.token;
    console.log("token is  ", token, " id is ", id)

    try {
        const config = {
            headers: {
                Authorization : `Bearer ${token}`
            }
        }
        const {data} = await axios.delete(`/api/products/${id}`,config);
        //localStorage.setItem('userInfo', JSON.stringify(data));
        //dispatch({type: 'userLogin/fulfilled', payload : data});
        
        return data;
    }
    catch (e){
        return e;
    }
   
})  

const productDeleteSlice =  createSlice({
    name: 'productdelete',
    initialState: {},
    reducers: {
        resetProductDeleteState:(state) => {
            state = {};
            return state;
        }
    },
    extraReducers:{
        [productDelete.pending]: (state,action) => {
            state.isLoading = true;
        },
        [productDelete.fulfilled] : (state, action)  => {
            state.isLoading = false;
            state.success = true;
        },
        [productDelete.rejected]: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        } 
    }
})

export default productDeleteSlice.reducer;

const productDeleteactions = productDeleteSlice.actions;

export {productDeleteactions}