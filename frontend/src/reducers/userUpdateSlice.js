import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const userUpdate = createAsyncThunk('api/userupdate', async (user, data) => {
    const {getState, dispatch} = data;
    const state  = getState();
    const token = state?.userLogin?.userInfo?.token;
    const {id} = user;

    try {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization : `Bearer ${token}`
            }
        }
        const {data} = await axios.put(`/api/users/${id}`,user,config);
        dispatch({type: 'api/userdetails/fulfilled',payload: data});
        return data;
    }
    catch (e){
        return e;
    }
   
})  

const userUpdateSlice =  createSlice({
    name: 'userupdate',
    initialState: {},
    reducers: {
        resetUserUpdate: (state, action) => {
            state = {};
            return state;
        }
    },
    extraReducers:{
        [userUpdate.pending]: (state,action) => {
            state.isLoading = true;
        },
        [userUpdate.fulfilled] : (state, action)  => {
            state.isLoading = false;
            state.success = true;
        },
        [userUpdate.rejected]: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        } 
    }
})

var userUpdateactions = userUpdateSlice.actions

export {userUpdateactions}

export default userUpdateSlice.reducer;