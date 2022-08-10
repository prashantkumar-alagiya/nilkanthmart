import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';

export const allOrders = createAsyncThunk('/api/orders/allorders', async (data, storeDetails) => {
    const {getState}  = storeDetails;
    const state = getState();
    const token =  state?.userLogin?.userInfo?.token;
    const config = {
        headers: {
            Authorization: `Bearer ${token}` 
        }
    }

    try {
        const {data} = await axios.get(`/api/orders`, config);
        return data;
    }
    catch(e){
        console.log("error occured order details ",e.message);
        return e.message;
    }
})


const allOrdersSlice = createSlice({
    name: 'allorders',
    initialState: {},
    reducers: {
        resetAllOrderlist: (state, action) => {
            state = {};
            return state;
        }
    },
    extraReducers:{
        [allOrders.pending]: (state,action) => {
            state.isLoading  = true;
        },
        [allOrders.fulfilled]: (state,action) => {
            state.isLoading = false;
            state.orders = action.payload;
        },
        [allOrders.rejected]: (state,action) => {
            state.isLoading = false;
            state.error = action.payload;
        }
    }
})

export default allOrdersSlice.reducer;
const allOrderListactions = allOrdersSlice.actions;
export {allOrderListactions}
