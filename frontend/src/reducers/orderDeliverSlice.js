import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';

export const deliverOrder = createAsyncThunk('/api/orders/id/deliver', async (id, storeDetails) => {
    const {getState}  = storeDetails;
    const state = getState();
    const token =  state?.userLogin?.userInfo?.token;
    const config = {
        headers: {
            Authorization: `Bearer ${token}` 
        }
    }

    console.log("order deliver api call function");
    try {
        const {data} = await axios.put(`/api/orders/${id}/deliver`,{}, config);
        return data;
    }
    catch(e){
        console.log("error occured order details ",e.message);
        return e.message;
    }
})


const orderDeliverSlice = createSlice({
    name: 'orderDeliver',
    initialState: {},
    reducers: {
        orderDeliverReset: (state, action) => {
            state = {};
            return state;
        }
    },
    extraReducers:{
        [deliverOrder.pending]: (state,action) => {
            state.isLoading  = true;
        },
        [deliverOrder.fulfilled]: (state,action) => {
            state.isLoading = false;
            state.success = true;
        },
        [deliverOrder.rejected]: (state,action) => {
            state.isLoading = false;
            state.error = action.payload;
        }
    }
})

export default orderDeliverSlice.reducer;
const orderDeliveractions = orderDeliverSlice.actions;
export {orderDeliveractions}
