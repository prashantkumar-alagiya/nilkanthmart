import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchTopRatedProducts = createAsyncThunk('api/products/top',async () => {
    try{
        const {data} = await axios.get(`/api/products/top`);
        return data;
    }
    catch(e){
        return e.message;
    }
})
const topRatedProductsSlice = createSlice({
    name:'topRatedProducts',
    initialState:{
        isLoading:false,
        products:[],
        error:''
    },
    reducers:{

    },
    extraReducers:{
        [fetchTopRatedProducts.pending]: (state,action) =>{
            state.isLoading = true;
        },
        [fetchTopRatedProducts.fulfilled]: (state,action) => {
            state.isLoading = false;
            state.products = action.payload;
        },
        [fetchTopRatedProducts.rejected]: (state,action) => {
            state.isLoading = false;
            state.error = action.payload;
        }
    }
})

export default topRatedProductsSlice.reducer;