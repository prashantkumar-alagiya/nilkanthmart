import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';

export const createOrder = createAsyncThunk('/api/orders', async (orderData, storeDetails) => {
    const {cartItems : orderItems, shippingAddress, taxPrice, itemsPrice, shippingPrice, totalPrice, paymentMethod} = orderData;
    const {getState}  = storeDetails;
    const state = getState();
    const token =  state?.userLogin?.userInfo?.token;
    const isPaid = false;
    const isDelivered = false;
    const config = {
        headers: {
            'Content-Type' : 'application/json',
            Authorization: `Bearer ${token}` 
        }
    }
    try {
        const {data} = await axios.post('/api/orders/',{isPaid, isDelivered, orderItems, shippingAddress, taxPrice, itemsPrice, shippingPrice, totalPrice, paymentMethod}, config);
        return data;
    }
    catch(e){
        return e.message;
    }
})


const orderSlice = createSlice({
    name: 'order',
    initialState: {},
    reducers: {
        resetCreatedOrder: (state, action) => {
            state = {};
            return state;
        }
    },
    extraReducers:{
        [createOrder.pending]: (state,action) => {
            state.isLoading  = true;
        },
        [createOrder.fulfilled]: (state,action) => {
            state.isLoading = false;
            state.order = action.payload;
            state.success = true;
        },
        [createOrder.rejected]: (state,action) => {
            state.isLoading = false;
            state.error = action.payload;
        }
    }
})

export default orderSlice.reducer;
const createOrderactions = orderSlice.actions;
export {createOrderactions}
