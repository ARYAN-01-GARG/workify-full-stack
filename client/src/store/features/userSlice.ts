import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { loginUser, logoutUser, registerUser, resendOtp, VerifyOTP } from './auth/authSlice';
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