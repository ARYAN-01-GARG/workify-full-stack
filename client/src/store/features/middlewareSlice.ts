import { createSlice } from "@reduxjs/toolkit";

interface middlewareSliceState{
    otpActivation: string;
}

const initialState : middlewareSliceState  = {
    otpActivation : '',
}

const middlewareSlice = createSlice({
    name: "middleware",
    initialState,
    reducers: {
        setOtpActivation: (state, action) => {
            state.otpActivation = action.payload;
        },
    },
});

export const { setOtpActivation } = middlewareSlice.actions;
export const selectOtpActivation = (state: { middleware: middlewareSliceState }) => state.middleware.otpActivation;

export default middlewareSlice.reducer;