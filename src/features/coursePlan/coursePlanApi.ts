import { axiosBaseQuery } from '@/app/axiosBaseQuery';
import { createApi } from '@reduxjs/toolkit/query/react';

export const coursePlanApi = createApi({
    reducerPath: 'coursePlanApi',
    baseQuery: axiosBaseQuery(),
    tagTypes: ['CoursePlan', 'Courses'],
    endpoints: builder => ({
        createCoursePlan: builder.mutation({
            query: data => ({
                url: '/course-plans',
                method: 'POST',
                data,
            }),
            invalidatesTags: ['CoursePlan', 'Courses'],
        }),
        getCoursePlans: builder.query({
            query: params => ({
                url: '/course-plans',
                method: 'GET',
                params: { ...params },
            }),
            providesTags: ['CoursePlan', 'Courses'],
        }),
        getCoursePlan: builder.query({
            query: id => ({
                url: `/course-plans/${id}`,
                method: 'GET',
            }),
            providesTags: ['CoursePlan', 'Courses'],
        }),
        updateCoursePlan: builder.mutation({
            query: ({ id, data }) => ({
                url: `/course-plans/${id}`,
                method: 'PATCH',
                data,
            }),
            invalidatesTags: ['CoursePlan', 'Courses'],
        }),
        deleteCoursePlan: builder.mutation({
            query: id => ({
                url: `/course-plans/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['CoursePlan', 'Courses'],
        }),
    }),
});

export const {
    useCreateCoursePlanMutation,
    useGetCoursePlansQuery,
    useGetCoursePlanQuery,
    useUpdateCoursePlanMutation,
    useDeleteCoursePlanMutation,
} = coursePlanApi;
