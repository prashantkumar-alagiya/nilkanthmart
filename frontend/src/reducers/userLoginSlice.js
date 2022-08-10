import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';

export const userLogin = createAsyncThunk('userLogin', async (userData,{rejectWithValue}) => {
    const {email,password} = userData;
    try {
        const config = {
            headers: {
                'Content-Type' :'application/json'
            }
        }
        const {data} = await axios.post('/api/users/login', {email,password},config);
        localStorage.setItem('userInfo', JSON.stringify(data));
        return data;
    }
    catch(e){
        return rejectWithValue(e.response.data);
    }
})

const userLoginSlice = createSlice({
    name:'userLogin',
    initialState: {userInfo : JSON.parse(localStorage.getItem('userInfo')) || null },
    reducers:{
        logout: (state,action) => {
            console.log("logout called ");
            state.userInfo = null;
            localStorage.removeItem('userInfo');
        }
    },
    extraReducers:{
        [userLogin.pending]: (state, action) => {
            state.isLoading = true;
        },
        [userLogin.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.userInfo = action.payload;
            state.error = null
        },
        [userLogin.rejected]: (state,action) => {
            state.isLoading = false;
            state.userInfo = null;
            state.error = action.payload;
        }
    }
})

export default userLoginSlice.reducer;
const actions  = userLoginSlice.actions;
export {actions};