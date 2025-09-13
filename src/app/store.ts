import { authApi } from '@/features/auth/authApi';
import { configureStore } from '@reduxjs/toolkit';
export const store = configureStore({
    reducer: {
        [authApi.reducerPath]: authApi.reducer,
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(authApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
