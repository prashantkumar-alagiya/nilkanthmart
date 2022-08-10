import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchProducts = createAsyncThunk('fetch/products', async({keyword = '', pageNumber = ''}) => {
    try{
        const {data} = await axios.get(`/api/products?keyword=${keyword}&pageNumber=${pageNumber}`);
        return data;
    }
    catch(e){
        return e.message
    }
})

const productListSlice = createSlice({
    name: 'productList',
    initialState: {
        isLoading: false,
        productList: [],
        error:''
    },
    reducers: {
    },
    extraReducers: {
        [fetchProducts.pending] : (state,action) => {
            state.isLoading = true;
        },
        [fetchProducts.fulfilled] : (state,action) => {
            state.productList = action.payload.products;
            state.page = action.payload.page;
            state.pages = action.payload.pages;
            state.isLoading = false
        },
        [fetchProducts.rejected] : (state,action) => {
            state.isLoading = false;
            state.error = action.payload
        }
    }
    
})

export default productListSlice.reducer