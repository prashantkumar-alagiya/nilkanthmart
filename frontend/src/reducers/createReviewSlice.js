import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const createReview = createAsyncThunk('api/product/review', async (review, data) => {
    const {getState} = data;
    const state  = getState();
    const token = state?.userLogin?.userInfo?.token;
    const {id} = review;

    try {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization : `Bearer ${token}`
            }
        }
        const {data} = await axios.post(`/api/products/${id}/review`,review,config);
        
        return data;
    }
    catch (e){
        return data.rejectWithValue(e.response.data);
    }
   
})  

const createReviewSlice =  createSlice({
    name: 'createReview',
    initialState: {},
    reducers: {
        resetCreateReview: (state, action) => {
            state = {};
            return state
        }
    },
    extraReducers:{
        [createReview.pending]: (state,action) => {
            state.isLoading = true;
        },
        [createReview.fulfilled] : (state, action)  => {
            state.isLoading = false;
            state.success = true;
            state.product = action.payload;
        },
        [createReview.rejected]: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        } 
    }
})

export default createReviewSlice.reducer;

const createReviewactions = createReviewSlice.actions;

export {createReviewactions}