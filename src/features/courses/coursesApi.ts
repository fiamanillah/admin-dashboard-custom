import { axiosBaseQuery } from '@/app/axiosBaseQuery';
import { createApi } from '@reduxjs/toolkit/query/react';

export const coursesApi = createApi({
    reducerPath: 'coursesApi',
    baseQuery: axiosBaseQuery(),
    tagTypes: ['Courses'],
    endpoints: builder => ({
        getCourses: builder.query({
            query: () => ({
                url: '/courses',
                method: 'GET',
            }),
            providesTags: ['Courses'],
        }),
    }),
});

export const { useGetCoursesQuery } = coursesApi;
