import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';

export const payOrder = createAsyncThunk('/api/orders/id/pay', async (data, storeDetails) => {
    const {getState}  = storeDetails;
    const state = getState();
    const token =  state?.userLogin?.userInfo?.token;
    const config = {
        headers: {
            'Content-Type': 'application/json', 
            Authorization: `Bearer ${token}` 
        }
    }
    const {id, paymentResult} = data;
    try {
        const {data} = await axios.put(`/api/orders/${id}/pay`, paymentResult, config);
        return data;
    }
    catch(e){
        console.log("error occured order details ",e.message);
        return e.message;
    }
})


const orderPaymentSlice = createSlice({
    name: 'orderPayment',
    initialState: {},
    reducers: {
        orderPaymentReset: (state, action) => {
            state = {};
            return state;
        }
    },
    extraReducers:{
        [payOrder.pending]: (state,action) => {
            state.isLoading  = true;
        },
        [payOrder.fulfilled]: (state,action) => {
            state.isLoading = false;
            state.success = true;
        },
        [payOrder.rejected]: (state,action) => {
            state.isLoading = false;
            state.error = action.payload;
        }
    }
})

export default orderPaymentSlice.reducer;
const actions = orderPaymentSlice.actions;
export {actions}
