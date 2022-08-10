import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';

export const myOrders = createAsyncThunk('/api/orders/myorders', async (data, storeDetails) => {
    const {getState}  = storeDetails;
    const state = getState();
    const token =  state?.userLogin?.userInfo?.token;
    const config = {
        headers: {
            Authorization: `Bearer ${token}` 
        }
    }

    try {
        const {data} = await axios.get(`/api/orders/getmyorders`, config);
        return data;
    }
    catch(e){
        console.log("error occured order details ",e.message);
        return e.message;
    }
})


const myOrdersSlice = createSlice({
    name: 'myorders',
    initialState: {},
    reducers: {
        resetMyOrderlist: (state, action) => {
            state = {};
            return state;
        }
    },
    extraReducers:{
        [myOrders.pending]: (state,action) => {
            state.isLoading  = true;
        },
        [myOrders.fulfilled]: (state,action) => {
            state.isLoading = false;
            state.orders = action.payload;
        },
        [myOrders.rejected]: (state,action) => {
            state.isLoading = false;
            state.error = action.payload;
        }
    }
})

export default myOrdersSlice.reducer;
const myOrderListactions = myOrdersSlice.actions;
export {myOrderListactions}
