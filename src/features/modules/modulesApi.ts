import { axiosBaseQuery } from '@/app/axiosBaseQuery';
import { createApi } from '@reduxjs/toolkit/query/react';

export const modulesApi = createApi({
    reducerPath: 'modulesApi',
    baseQuery: axiosBaseQuery(),
    tagTypes: ['Modules'],
    endpoints: builder => ({
        getModules: builder.query({
            query: query => ({
                url: '/modules',
                method: 'GET',
                params: { ...query },
            }),
            providesTags: ['Modules'],
        }),
    }),
});

export const { useGetModulesQuery } = modulesApi;
