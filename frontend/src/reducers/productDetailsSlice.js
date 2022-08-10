import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchProductDetails = createAsyncThunk('productdetails',async (id, {rejectWithValue}) => {
    try{
        const {data} = await axios.get(`/api/products/${id}`);
        return data;
    }
    catch(e){
        return rejectWithValue(e.response.data);
    }
})
const productDetailsSlice = createSlice({
    name:'productDetails',
    initialState:{
        isLoading:false,
        product:{},
        error:''
    },
    reducers:{

    },
    extraReducers:{
        [fetchProductDetails.pending]: (state,action) =>{
            state.isLoading = true;
        },
        [fetchProductDetails.fulfilled]: (state,action) => {
            state.isLoading = false;
            state.product = action.payload;
        },
        [fetchProductDetails.rejected]: (state,action) => {
            state.isLoading = false;
            state.error = action.payload;
        }
    }
})

export default productDetailsSlice.reducer;