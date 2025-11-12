// Register thunk
export const registerUser = createAsyncThunk(
    'auth/registerUser',
    async (userData, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/user/register`, userData);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || { message: error.message });
        }
    }
);
import { createSlice , createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const loginUser = createAsyncThunk(
    'auth/loginUser',
    async (userData, { rejectWithValue }) => {
        try {
            console.log('Sending login request with:', userData);
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/user/login`, userData);
            console.log('Login success response:', response.data);
            if (!response.data.token) {
                throw new Error("user not found first sign up");
            }
            return response.data;
        } catch (error) {
            console.log('Login error:', error.response?.data || error.message);
            return rejectWithValue(error.response?.data || { message: error.message });
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
        // Login
        builder.addCase(loginUser.pending, (state) => {
            state.loading = true;
            state.error = null;
            state.user = null;
        });
        builder.addCase(loginUser.fulfilled, (state, action) => {
            state.loading = false;
            state.error = null;
            state.user = action.payload.token;
            localStorage.setItem('token', action.payload.token);
        });
        builder.addCase(loginUser.rejected, (state, action) => {
            state.loading = false;
            state.user = null;
            state.error = action.payload;
        });

        // Register
        builder.addCase(registerUser.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(registerUser.fulfilled, (state, action) => {
            state.loading = false;
            state.error = null;
            // Optionally, auto-login after register:
            state.user = action.payload.token;
            if (action.payload.token) {
                localStorage.setItem('token', action.payload.token);
            }
        });
        builder.addCase(registerUser.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
    }
    })

export default AuthSlice.reducer;
export const {logout}=AuthSlice.actions;

