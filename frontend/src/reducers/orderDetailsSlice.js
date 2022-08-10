import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';

export const orderDetails = createAsyncThunk('/api/orders/id', async (id, storeDetails) => {
    const {getState}  = storeDetails;
    const state = getState();
    const token =  state?.userLogin?.userInfo?.token;
    const config = {
        headers: {
            Authorization: `Bearer ${token}` 
        }
    }
    console.log("reducer id is ", id);
    try {
        const {data} = await axios.get(`/api/orders/${id}`, config);
        console.log("response data is ",data);
        return data;
    }
    catch(e){
        console.log("error occured order details ",e.message);
        return e.message;
    }
})


const orderDetailsSlice = createSlice({
    name: 'orderdetails',
    initialState: {isLoading: true},
    reducers: {
        resetOrderDetails: (state, action) => {
            state = {};
            return state;
        }
    },
    extraReducers:{
        [orderDetails.pending]: (state,action) => {
            state.isLoading  = true;
        },
        [orderDetails.fulfilled]: (state,action) => {
            state.isLoading = false;
            state.order = action.payload;
        },
        [orderDetails.rejected]: (state,action) => {
            state.isLoading = false;
            state.error = action.payload;
        }
    }
})

export default orderDetailsSlice.reducer;

const orderDetailsactions = orderDetailsSlice.actions;
export {orderDetailsactions}
