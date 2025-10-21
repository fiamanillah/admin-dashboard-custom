import { axiosBaseQuery } from '@/app/axiosBaseQuery';
import { createApi } from '@reduxjs/toolkit/query/react';

export const quizApi = createApi({
    reducerPath: 'quizApi',
    baseQuery: axiosBaseQuery(),
    tagTypes: ['Quiz', 'Attempt'],
    endpoints: builder => ({
        /** ------------------ QUIZZES ------------------ */
        getQuizzes: builder.query({
            query: params => ({
                url: '/quizzes',
                method: 'GET',
                params,
            }),
            providesTags: ['Quiz'],
        }),

        getQuizzesByCourse: builder.query({
            query: courseId => ({
                url: `/quizzes/course/${courseId}`,
                method: 'GET',
            }),
            providesTags: ['Quiz'],
        }),

        createQuiz: builder.mutation({
            query: data => ({
                url: '/quizzes',
                method: 'POST',
                data,
            }),
            invalidatesTags: ['Quiz'],
        }),

        updateQuiz: builder.mutation({
            query: ({ id, data }) => ({
                url: `/quizzes/${id}`,
                method: 'PATCH',
                data,
            }),
            invalidatesTags: ['Quiz'],
        }),

        deleteQuiz: builder.mutation({
            query: id => ({
                url: `/quizzes/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Quiz'],
        }),

        /** ------------------ QUESTIONS ------------------ */
        addQuestion: builder.mutation({
            query: ({ quizId, data }) => ({
                url: `/quizzes/${quizId}/questions`,
                method: 'POST',
                data,
            }),
            invalidatesTags: ['Quiz'],
        }),

        updateQuestion: builder.mutation({
            query: ({ questionId, data }) => ({
                url: `/quizzes/questions/${questionId}`,
                method: 'PATCH',
                data,
            }),
            invalidatesTags: ['Quiz'],
        }),

        deleteQuestion: builder.mutation({
            query: questionId => ({
                url: `/quizzes/questions/${questionId}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Quiz'],
        }),

        /** ------------------ ATTEMPTS ------------------ */
        submitAttempt: builder.mutation({
            query: ({ quizId, userId, data }) => ({
                url: `/quizzes/${quizId}/attempts/${userId}`,
                method: 'POST',
                data,
            }),
            invalidatesTags: ['Attempt'],
        }),

        getAttempts: builder.query({
            query: ({ quizId, userId }) => ({
                url: `/quizzes/${quizId}/attempts/${userId}`,
                method: 'GET',
            }),
            providesTags: ['Attempt'],
        }),
    }),
});

// Export the auto-generated hooks
export const {
    useGetQuizzesQuery,
    useGetQuizzesByCourseQuery,
    useCreateQuizMutation,
    useUpdateQuizMutation,
    useDeleteQuizMutation,
    useAddQuestionMutation,
    useUpdateQuestionMutation,
    useDeleteQuestionMutation,
    useSubmitAttemptMutation,
    useGetAttemptsQuery,
} = quizApi;
