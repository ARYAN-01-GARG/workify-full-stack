import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';

interface User {
    id : string;
    name : string;
    email : string;
    role : 'CANDIDATE' | 'ADMIN' | 'RECRUITER';
    profileImage : string | null;
}

interface UserSliceState {
    user : User;
    loading : boolean;
    token : string | null;
}


const initialState : UserSliceState = {
    user: {
        id: '',
        name: '',
        email: '',
        role: 'CANDIDATE',
        profileImage: null,
    },
    loading: false,
    token: null,
};

export const registerUser = createAsyncThunk(
    'user/registerUser',
    async (userData: { name: string; email: string; password: string }) => {
        if (!userData) {
            throw new Error('User data is required');
        }
        try {
            const response = await axios.post('http://localhost:3000/api/v1/auth/register', userData);
            toast.success('OTP has been sent to your email');
            return response.data;
        } catch (error) {
            const err = error as { response: { data: { error: string } } };
            console.error('Error:', error);
            toast.error(err.response?.data?.error || 'Failed to register user');
            throw error;
        }
    }
);

export const loginUser = createAsyncThunk(
    'user/loginUser',
    async (userData: { email: string; password: string }) => {
        if (!userData) {
            throw new Error('User data is required');
        }
        try {
            const response = await axios.post('http://localhost:3000/api/v1/auth/login', userData);
            toast.success('Logged in successfully');
            console.log('Login response:', response.data);
            return response.data;
        } catch (error) {
            const err = error as { response: { data: { error: string } } };
            console.error('Error:', error);
            toast.error(err.response?.data?.error || 'Login failed');
            throw error;
        }
    }
);

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser(state, action) {
            state.user = action.payload;
        },
        setLoading(state, action) {
            state.loading = action.payload;
        },
        setToken(state, action) {
            state.token = action.payload;
        },
        clearUser(state) {
            state.user = { id: '', name: '', email: '', role: 'CANDIDATE', profileImage: null };
            state.loading = false;
            state.token = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(registerUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.user;
            })
            .addCase(registerUser.rejected, (state) => {
                state.loading = false;
            })
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.user;
                state.token = action.payload.token;
            })
            .addCase(loginUser.rejected, (state) => {
                state.loading = false;
            });
    }
});

export const {
    setUser,
    setLoading,
    setToken,
    clearUser,
} = userSlice.actions;

export const selectUser = (state : { user : UserSliceState}) => state.user.user;
export const selectLoading = (state : { user : UserSliceState}) => state.user.loading;
export const selectToken = (state : { user : UserSliceState}) => state.user.token;

export default userSlice.reducer;