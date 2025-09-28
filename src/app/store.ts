// src/app/store.ts
import { configureStore } from '@reduxjs/toolkit';
import { authApi } from '@/features/auth/authApi';
import authReducer from '@/features/auth/authSlice';
import { userApi } from '@/features/users/userApi';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        [authApi.reducerPath]: authApi.reducer,
        [userApi.reducerPath]: userApi.reducer,
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
            },
        }).concat([authApi.middleware, userApi.middleware]),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
