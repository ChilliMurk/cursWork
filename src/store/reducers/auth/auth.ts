import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Интерфейс для регистрации (оставляем как есть)
export interface RegisterRequest {
    login: string;
    email: string;
    password: string;
}

// Добавляем интерфейс для логина
export interface LoginRequest {
    login: string; // Может быть как email, так и логин
    password: string;
}

export interface LoginResponse {
    id: string;
    login: string;
    email: string;
    name?: string;
    token?: string; // Если API возвращает токен
}

export interface RegisterResponse {
    id: string;
    login: string;
    email: string;
}

export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://192.168.1.103:8080/api/',
        prepareHeaders: (headers) => {
            headers.set('Content-Type', 'application/json');
            return headers;
        },
    }),
    endpoints: (builder) => ({
        register: builder.mutation<RegisterResponse, RegisterRequest>({
            query: (credentials) => ({
                url: 'auth/register',
                method: 'POST',
                body: credentials,
            }),
        }),
        // Добавляем endpoint для логина
        login: builder.mutation<LoginResponse, LoginRequest>({
            query: (credentials) => ({
                url: 'auth/login', // Уточните правильный endpoint у вашего бэкенда
                method: 'POST',
                body: credentials,
            }),
        }),
    }),
});

// Экспортируем оба хука
export const { useRegisterMutation, useLoginMutation } = authApi;

