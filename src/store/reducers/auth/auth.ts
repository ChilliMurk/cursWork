import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

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
    roles?: string[];
}

export interface RegisterResponse {
    id: string;
    username: string;
    email: string;
    token?: string;
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

export const {useRegisterMutation, useLoginMutation} = authApi;
