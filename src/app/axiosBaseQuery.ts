// src/app/axiosBaseQuery.ts
import axios, { type AxiosRequestConfig, AxiosError } from 'axios';
import { type BaseQueryFn } from '@reduxjs/toolkit/query/react';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:3030/api',
    headers: { 'Content-Type': 'application/json' },
    timeout: 10000,
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

interface AxiosRequest {
    url: string;
    method: AxiosRequestConfig['method'];
    data?: Record<string, unknown>;
    params?: Record<string, unknown>;
    headers?: Record<string, string>;
}

export const axiosBaseQuery =
    (): BaseQueryFn<AxiosRequest, unknown, unknown> =>
    async ({ url, method, data, params, headers }) => {
        try {
            const result = await axiosInstance({
                url,
                method,
                data,
                params,
                headers,
            });
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
