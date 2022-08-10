import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const userDetails = createAsyncThunk('api/userdetails', async (id, data) => {
    const {getState} = data;
    const state  = getState();
    const token = state?.userLogin?.userInfo?.token;
    console.log("token is  ", token, " id is ", id)

    try {
        const config = {
            headers: {
                Authorization : `Bearer ${token}`
            }
        }
        const {data} = await axios.get(`/api/users/${id}`,config);
        //localStorage.setItem('userInfo', JSON.stringify(data));
        //dispatch({type: 'userLogin/fulfilled', payload : data});
        
        return data;
    }
    catch (e){
        return e;
    }
   
})  

const userDetailsSlice =  createSlice({
    name: 'userdetails',
    initialState: {user : {}},
    reducers: {
        resetOrderDetails: (state, action) => {
            state = {};
            return state
        }
    },
    extraReducers:{
        [userDetails.pending]: (state,action) => {
            state.isLoading = true;
        },
        [userDetails.fulfilled] : (state, action)  => {
            state.isLoading = false;
            state.user = action.payload;
        },
        [userDetails.rejected]: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        } 
    }
})

export default userDetailsSlice.reducer;

const userDetailsactions = userDetailsSlice.actions;

export {userDetailsactions}