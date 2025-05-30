import { configureStore } from '@reduxjs/toolkit';
import userReducer from './features/userSlice';
import profileReducer from './features/profileSlice';
import postsReducer from './features/postsSlice';
import middlewareReducer from './features/middlewareSlice';

const store = configureStore({
    reducer: {
        middleware: middlewareReducer,
        user: userReducer,
        profile: profileReducer,
        posts: postsReducer,
    },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;