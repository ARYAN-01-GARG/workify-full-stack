import { configureStore } from '@reduxjs/toolkit';
import userReducer from './features/userSlice';
import MiddlewareReducer from './features/middlewareSlice';

const store = configureStore({
    reducer: {
        middleware : MiddlewareReducer,
        user : userReducer,
    },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;