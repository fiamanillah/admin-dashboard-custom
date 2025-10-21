// src/app/store.ts
import { configureStore } from '@reduxjs/toolkit';
import { authApi } from '@/features/auth/authApi';
import authReducer from '@/features/auth/authSlice';
import { userApi } from '@/features/users/userApi';
import { coursesApi } from '@/features/courses/coursesApi';
import { modulesApi } from '@/features/modules/modulesApi';
import { contentApi } from '@/features/content/contentApi';
import { coursePlanApi } from '@/features/coursePlan/coursePlanApi';
import { lessonsApi } from '@/features/lessons/lessonsApi';
import { quizApi } from '@/features/quize/quizeApi';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        [authApi.reducerPath]: authApi.reducer,
        [userApi.reducerPath]: userApi.reducer,
        [coursesApi.reducerPath]: coursesApi.reducer,
        [modulesApi.reducerPath]: modulesApi.reducer,
        [contentApi.reducerPath]: contentApi.reducer,
        [coursePlanApi.reducerPath]: coursePlanApi.reducer,
        [lessonsApi.reducerPath]: lessonsApi.reducer,
        [quizApi.reducerPath]: quizApi.reducer,
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
            },
        }).concat([
            authApi.middleware,
            userApi.middleware,
            coursesApi.middleware,
            modulesApi.middleware,
            contentApi.middleware,
            coursePlanApi.middleware,
            lessonsApi.middleware,
            quizApi.middleware,
        ]),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
