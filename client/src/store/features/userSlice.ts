import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';
import { setOtpActivation } from './middlewareSlice';
interface UserSliceState {
    user : User;
    loading : boolean;
    token : string | null;
    error : string | null;
}

export const tempUser = JSON.stringify({
    id: '',
    name: '',
    email: '',
    role: 'CANDIDATE',
    profileImage: null,
    createdAt: '',
    updatedAt: '',
    posts: [],
    candidate: null,
    recruiter: null,
    pastEmployer: [],
});

const initialState : UserSliceState = {
    user: JSON.parse(localStorage.getItem('user') || tempUser),
    loading: false,
    token: localStorage.getItem('token') || null,
    error: null,
};

export const getUser = createAsyncThunk(
    'user/getUser',
    async () => {
        try {
            const response = await axios.get('http://localhost:3000/api/v1/user/', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token') || ''}`,
                },
            });
            console.log('User data fetched:', response.data.user);

            return response.data.user;
        } catch (error) {
            console.error('Error fetching user:', error);
        }
    }
);

export const registerUser = createAsyncThunk(
    'user/registerUser',
    async (userData: { name: string; email: string; password: string } , { dispatch }) => {
        if (!userData) {
            throw new Error('User data is required');
        }
        try {
            const response = await axios.post('http://localhost:3000/api/v1/auth/register', userData);
            toast.success('OTP has been sent to your email');
            dispatch(setOtpActivation('/auth/register'));
            console.log('Register response:');
            return response.data;
        } catch (error) {
            const err = error as { status : number , response: { data: { error: string } } };
            console.error('Error:', error);
            if(err.status === 500) toast.error('Server error');
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
            const err = error as { status : number , response: { data: { error: string } } };
            console.error('Error:', error);
            if(err.status === 500) toast.error('Login Faild : Some Error Occured');
            else toast.error(err.response?.data?.error || 'Login failed');
            throw error;
        }
    }
);

export const resendOtp = createAsyncThunk(
    'user/resendOtp',
    async (email: string) => {
        if (!email) {
            throw new Error('Email is required');
        }
        try {
            console.log('Resending OTP to:', email);
            const response = await axios.post('http://localhost:3000/api/v1/auth/resend-otp', { email });
            toast.success('OTP has been sent to your email');
            console.log('Resend OTP response:', response.data);
            return response.data;
        } catch (error) {
            const err = error as { response: { data: { error: string } } };
            console.error('Error:', error);
            toast.error(err.response?.data?.error || 'Failed to resend OTP');
            throw error;
        }
    }
);

export const logoutUser = createAsyncThunk(
    'user/logoutUser',
    async () => {
        try {
            // await axios.post('http://localhost:3000/api/v1/auth/logout');
            // toast.success('Logged out successfully');
            console.log("logout");
            return true;
        } catch (error) {
            const err = error as { response: { data: { error: string } } };
            console.error('Error:', error);
            toast.error(err.response?.data?.error || 'Logout failed');
            throw error;
        }
    }
);

export const VerifyOTP = createAsyncThunk(
    'user/VerifyOTP',
    async ({otp,email}: { otp : string , email: string}) => {
        if (!otp || !email) {
            throw new Error('OTP and Email is required');
        }
        try {
            const response = await axios.post('http://localhost:3000/api/v1/auth/verify-otp', { email , otp});
            toast.success('OTP verified successfully');
            console.log('data:', response.data);
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
            localStorage.setItem('user', JSON.stringify(state.user));
        },
        setLoading(state, action) {
            state.loading = action.payload;
        },
        setError(state, action) {
            state.error = action.payload;
        },
        setToken(state, action) {
            state.token = action.payload;
            localStorage.setItem('token', action.payload);
        },
        clearUser(state) {
            state.user = JSON.parse(tempUser);
            state.loading = false;
            state.token = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(getUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
            })
            .addCase(getUser.rejected, (state) => {
                state.loading = false;
                state.error = 'Failed to fetch user data';
                console.error('Error fetching user data');
            })
            .addCase(registerUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.user;
                localStorage.setItem('user', JSON.stringify(state.user));
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
                localStorage.setItem('user', JSON.stringify(action.payload.user));
                localStorage.setItem('token', action.payload.token);
            })
            .addCase(loginUser.rejected, (state) => {
                state.loading = false;
            })
            .addCase(logoutUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(logoutUser.fulfilled, (state) => {
                state.loading = false;
                state.user = JSON.parse(tempUser);
                state.token = null;
                localStorage.removeItem('user');
                localStorage.removeItem('token');
            })
            .addCase(logoutUser.rejected, (state) => {
                state.loading = false;
            })
            .addCase(VerifyOTP.pending, (state) => {
                state.loading = true;
            })
            .addCase(VerifyOTP.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(VerifyOTP.rejected, (state) => {
                state.loading = false;
            })
            .addCase(resendOtp.pending, (state) => {
                state.loading = true;
            })
            .addCase(resendOtp.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(resendOtp.rejected, (state) => {
                state.loading = false;
            })
    }
});

export const {
    setUser,
    setLoading,
    setToken,
    setError,
    clearUser,
} = userSlice.actions;

export const selectUser = (state : { user : UserSliceState}) => state.user.user;
export const selectLoading = (state : { user : UserSliceState}) => state.user.loading;
export const selectError = (state : { user : UserSliceState}) => state.user.error;
export const selectToken = (state : { user : UserSliceState}) => state.user.token;

export default userSlice.reducer;