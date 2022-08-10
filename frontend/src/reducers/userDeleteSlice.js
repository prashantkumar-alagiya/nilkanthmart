import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const userDelete = createAsyncThunk('api/users/delete', async (id, data) => {
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
        const {data} = await axios.delete(`/api/users/${id}`,config);
        //localStorage.setItem('userInfo', JSON.stringify(data));
        //dispatch({type: 'userLogin/fulfilled', payload : data});
        
        return data;
    }
    catch (e){
        return e;
    }
   
})  

const userListSlice =  createSlice({
    name: 'userdelete',
    initialState: {},
    reducers: {
    },
    extraReducers:{
        [userDelete.pending]: (state,action) => {
            state.isLoading = true;
        },
        [userDelete.fulfilled] : (state, action)  => {
            state.isLoading = false;
            state.success = true;
        },
        [userDelete.rejected]: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        } 
    }
})

export default userListSlice.reducer;

const userDeleteactions = userListSlice.actions;

export {userDeleteactions}