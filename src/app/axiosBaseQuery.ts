// src/app/axiosBaseQuery.ts
import axios, { type AxiosProgressEvent, type AxiosRequestConfig, AxiosError } from 'axios';
import { type BaseQueryFn } from '@reduxjs/toolkit/query/react';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:3030/api',
    headers: { 'Content-Type': 'application/json' },
    timeout: 10000,
    withCredentials: true,
});

// Request interceptor to add auth token
axiosInstance.interceptors.request.use(
    config => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    error => Promise.reject(error)
);

// Response interceptor to handle token expiration
axiosInstance.interceptors.response.use(
    response => response,
    error => {
        if (error.response?.status === 401) {
            localStorage.removeItem('token');
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);
export interface AxiosRequest<TData = unknown> {
    url: string;
    method: AxiosRequestConfig['method'];
    data?: TData | FormData | File;
    params?: Record<string, unknown>;
    headers?: Record<string, string>;

    onUploadProgress?: (progressEvent: AxiosProgressEvent) => void;
}

export const axiosBaseQuery =
    <TData = unknown>(): BaseQueryFn<AxiosRequest<TData>, unknown, unknown> =>
    async ({ url, method, data, params, headers, onUploadProgress }) => {
        try {
            const result = await axiosInstance({
                url,
                method,
                data,
                params,
                headers,
                onUploadProgress,
            });
            return { data: result.data as TData };
        } catch (err) {
            const error = err as AxiosError;
            return {
                error: {
                    status: error.response?.status,
                    data: error.response?.data || error.message,
                },
            };
        }
    };
