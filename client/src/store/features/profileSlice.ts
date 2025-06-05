import { createSlice } from '@reduxjs/toolkit';
import { tempUser } from './userSlice';

interface otherUserState {
    user : User;
    loading: boolean;
    error: string | null;
}

const tempOtherUser: User = JSON.parse(tempUser);

const initialState : otherUserState = {
    user : tempOtherUser,
    loading: false,
    error: null,
}

const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {
        setUser(state, action) {
            state.user = action.payload;
        },
        setLoading(state, action) {
            state.loading = action.payload;
        },
        setError(state, action) {
            state.error = action.payload;
        },
    },
});

export const { setUser, setLoading, setError } = profileSlice.actions;
export const selectOtherUser = (state: { profile: otherUserState }) => state.profile.user;
export const selectLoading = (state: { profile: otherUserState }) => state.profile.loading;
export const selectError = (state: { profile: otherUserState }) => state.profile.error;
export default profileSlice.reducer;