import { axiosBaseQuery } from '@/app/axiosBaseQuery';
import { createApi } from '@reduxjs/toolkit/query/react';

export const lessonsApi = createApi({
    reducerPath: 'lessonsApi',
    baseQuery: axiosBaseQuery(),
    tagTypes: ['Lessons'],
    endpoints: builder => ({
        getLessons: builder.query({
            query: query => ({
                url: '/lessons',
                method: 'GET',
                params: { ...query },
            }),
            providesTags: ['Lessons'],
        }),
        getLesson: builder.query({
            query: id => ({
                url: `/lessons/${id}`,
                method: 'GET',
            }),
            providesTags: ['Lessons'],
        }),
        updateLesson: builder.mutation({
            query: ({ id, data }) => ({
                url: `/lessons/${id}`,
                method: 'PATCH',
                data,
            }),
            invalidatesTags: ['Lessons'],
        }),
        deleteLesson: builder.mutation({
            query: id => ({
                url: `/lessons/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Lessons'],
        }),
        createLesson: builder.mutation({
            query: data => ({
                url: '/lessons',
                method: 'POST',
                data,
            }),
            invalidatesTags: ['Lessons'],
        }),
    }),
});

export const {
    useGetLessonsQuery,
    useGetLessonQuery,
    useUpdateLessonMutation,
    useDeleteLessonMutation,
    useCreateLessonMutation,
} = lessonsApi;
