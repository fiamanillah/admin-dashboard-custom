import axios, { type AxiosRequestConfig, AxiosError } from 'axios';
import { type BaseQueryFn } from '@reduxjs/toolkit/query/react';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:3030/api',
    headers: { 'Content-Type': 'application/json' },
});

interface AxiosRequest {
    url: string;
    method: AxiosRequestConfig['method'];
    data?: Record<string, unknown>;
    params?: Record<string, unknown>;
}

export const axiosBaseQuery =
    (): BaseQueryFn<AxiosRequest, unknown, unknown> =>
    async ({ url, method, data, params }) => {
        try {
            const result = await axiosInstance({ url, method, data, params });
            return { data: result.data };
        } catch (axiosError) {
            const err = axiosError as AxiosError;
            return {
                error: {
                    status: err.response?.status,
                    data: err.response?.data || err.message,
                },
            };
        }
    };
