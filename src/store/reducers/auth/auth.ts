// import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
//
// // Интерфейс для регистрации (оставляем как есть)
// export interface RegisterRequest {
//     login: string;
//     email: string;
//     password: string;
// }
//
// // Добавляем интерфейс для логина
// export interface LoginRequest {
//     login: string; // Может быть как email, так и логин
//     password: string;
// }
//
// export interface LoginResponse {
//     id: string;
//     login: string;
//     email: string;
//     name?: string;
//     token?: string; // Если API возвращает токен
// }
//
// export interface RegisterResponse {
//     id: string;
//     login: string;
//     email: string;
// }
//
// export const authApi = createApi({
//     reducerPath: 'authApi',
//     baseQuery: fetchBaseQuery({
//         baseUrl: 'http://192.168.1.103:8080/api/',
//         prepareHeaders: (headers) => {
//             headers.set('Content-Type', 'application/json');
//             return headers;
//         },
//     }),
//     endpoints: (builder) => ({
//         register: builder.mutation<RegisterResponse, RegisterRequest>({
//             query: (credentials) => ({
//                 url: 'auth/register',
//                 method: 'POST',
//                 body: credentials,
//             }),
//         }),
//         // Добавляем endpoint для логина
//         login: builder.mutation<LoginResponse, LoginRequest>({
//             query: (credentials) => ({
//                 url: 'auth/login', // Уточните правильный endpoint у вашего бэкенда
//                 method: 'POST',
//                 body: credentials,
//             }),
//         }),
//     }),
// });
//
// // Экспортируем оба хука
// export const { useRegisterMutation, useLoginMutation } = authApi;
//

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export interface RegisterRequest {
    username: string;
    email: string;
    password: string;
}

export interface LoginRequest {
    username: string;
    password: string;
}

export interface LoginResponse {
    id: string;
    username?: string;
    login?: string;
    email: string;
    name?: string;
    token?: string;
}

export interface RegisterResponse {
    id: string;
    username: string;
    email: string;
}

export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({
        baseUrl: '/api',
        prepareHeaders: (headers) => {
            headers.set('Content-Type', 'application/json');
            return headers;
        },
    }),
    endpoints: (builder) => ({
        register: builder.mutation<RegisterResponse, RegisterRequest>({
            query: (credentials) => {
                console.log('Sending to:', '/auth/register');
                console.log('Data:', credentials);
                return {
                    url: '/auth/register',
                    method: 'POST',
                    body: credentials,
                };
            },
        }),
        login: builder.mutation<LoginResponse, LoginRequest>({
            query: (credentials) => ({
                url: '/auth/login',
                method: 'POST',
                body: credentials,
            }),
        }),
    }),
});

export const { useRegisterMutation, useLoginMutation } = authApi;
