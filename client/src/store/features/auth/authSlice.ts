import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import { setOtpActivation } from "../middlewareSlice";

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