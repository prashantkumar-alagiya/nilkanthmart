import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const userProfileUpdate = createAsyncThunk('api/userprofileupdate', async (user, data) => {
    const {getState, dispatch} = data;
    const state  = getState();
    const token = state?.userLogin?.userInfo?.token;

    try {
        const config = {
            headers: {
                Authorization : `Bearer ${token}`
            }
        }
        const {data} = await axios.put(`/api/users/profile`,user,config);
        //localStorage.setItem('userInfo', JSON.stringify(data));
        //dispatch({type: 'userLogin/fulfilled', payload : data});
        dispatch(userProfileactions.setSuccessUpdate(true));
        dispatch({type: 'userLogin/fulfilled', payload : data});
        //dispatch({type: 'userDetails/fulfilled', payload : data})
        
        return data;
    }
    catch (e){
        return e;
    }
   
})  

const userProfileUpdateSlice =  createSlice({
    name: 'userprofileupdate',
    initialState: {},
    reducers: {
        setSuccessUpdate: (state,action) => {
            state.success = action.payload;
        },
        resetUserProfile: (state, action) => {
            state = {};
            return state;
        }
    },
    extraReducers:{
        [userProfileUpdate.pending]: (state,action) => {
            state.isLoading = true;
        },
        [userProfileUpdate.fulfilled] : (state, action)  => {
            state.isLoading = false;
            state.userInfo = action.payload;
        },
        [userProfileUpdate.rejected]: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        } 
    }
})

var userProfileactions = userProfileUpdateSlice.actions

export {userProfileactions}

export default userProfileUpdateSlice.reducer;