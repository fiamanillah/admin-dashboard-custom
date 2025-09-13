import { axiosBaseQuery } from '@/app/axiosBaseQuery';
import { createApi } from '@reduxjs/toolkit/query/react';

export const authApi = createApi({
    reducerPath: 'api', // unique key for the store
    baseQuery: axiosBaseQuery(),
    tagTypes: ['Auth'], // used for caching & invalidation
    endpoints: builder => ({
        login: builder.mutation({
            query: credentials => ({
                url: '/auth/login',
                method: 'POST',
                data: credentials,
            }),
            invalidatesTags: ['Auth'],
        }),
    }),
});

export const { useLoginMutation } = authApi;
