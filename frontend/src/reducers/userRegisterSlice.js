import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const registerUser = createAsyncThunk('api/register', async (userData, data) => {
    const {email, name, password} = userData;
    const {dispatch} = data;
    try {
        const config = {
            headers: {
                'Content-Type' : 'application/json'
            }
        }
        const {data} = await axios.post('/api/users',{email, name, password},config);
        localStorage.setItem('userInfo', JSON.stringify(data));
        dispatch({type: 'userLogin/fulfilled', payload : data});
        
        return data;
    }
    catch (e){
        return e;
    }
   
})  

const userRegisterSlice =  createSlice({
    name: 'userregister',
    initialState: {},
    reducers: {
        resetUserRegister: (state,action) => {
            state = {};
            return state;
        }
    },
    extraReducers:{
        [registerUser.pending]: (state,action) => {
            state.isLoading = true;
        },
        [registerUser.fulfilled] : (state, action)  => {
            state.isLoading = false;
            state.userInfo = action.payload;
        },
        [registerUser.rejected]: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        } 
    }
})

export default userRegisterSlice.reducer;

const userRegisteractions = userRegisterSlice.actions;

export {userRegisteractions}