import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const usersList = createAsyncThunk('api/usersList', async (id, data) => {
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
        const {data} = await axios.get(`/api/users`,config);
        //localStorage.setItem('userInfo', JSON.stringify(data));
        //dispatch({type: 'userLogin/fulfilled', payload : data});
        
        return data;
    }
    catch (e){
        return e;
    }
   
})  

const userListSlice =  createSlice({
    name: 'userList',
    initialState: {users : []},
    reducers: {
        resetUserList: (state, action) => {
            state = {};
            return state
        }
    },
    extraReducers:{
        [usersList.pending]: (state,action) => {
            state.isLoading = true;
        },
        [usersList.fulfilled] : (state, action)  => {
            state.isLoading = false;
            state.users = action.payload;
        },
        [usersList.rejected]: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        } 
    }
})

export default userListSlice.reducer;

const userListactions = userListSlice.actions;

export {userListactions}