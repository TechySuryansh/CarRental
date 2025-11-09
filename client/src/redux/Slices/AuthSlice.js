import { createSlice , createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const  loginUser = createAsyncThunk(
    'auth/loginUser',
    async (userData, rejectWithValue) => {
        try {
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/user/login`, userData);
            console.log("Response ", response);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);


const AuthSlice=createSlice({
    name:"auth",
    initialState:{
        user: localStorage.getItem('token') || null,
        loading : false,
        error : null
    },
    reducers:{
        logout: (state) => {
            state.user = null;
            state.error = null;
            localStorage.removeItem('token');
        },
    },
    extraReducers:(builder)=>{
        builder.addCase(loginUser.fulfilled,(state,action)=>{
            state.user = action.payload.token;
            localStorage.setItem('token', action.payload.token);
            state.error = null;
            state.loading = false
        })
        builder.addCase(loginUser.rejected,(state,action)=>{
            state.error=action.payload
            state.user=null
            state.loading=false
        })  
        builder.addCase(loginUser.pending,(state)=>{ 
            state.user=null
            state.error=null
            state.loading=true
        })
    }
    })

export default AuthSlice.reducer;
export const {logout}=AuthSlice.actions;

