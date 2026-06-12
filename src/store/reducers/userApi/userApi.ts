import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '@/store/store';

export interface UserInfoResponse {
    id: number;
    username: string;
    roles: string[];
    bio: string;
    avatar_url: string | null;
    last_online: string;
    join_date: string;
    email: string;
    team_role: string | null;
    team_id: number | null;
    team_name: string | null;
    faceit_nickname: string | null;
}

export interface UserChangesRequest {
    bio?: string;
    avatar_url?: string | null;
}

export const userApi = createApi({
    reducerPath: 'userApi',
    baseQuery: fetchBaseQuery({
        baseUrl: '/api',
        prepareHeaders: (headers, { getState }) => {
            const state = getState() as RootState;
            const token = state.authReducer?.user?.token;
            if (token) {
                headers.set('Authorization', `Bearer ${token}`);
            }
            return headers;
        },
    }),
    tagTypes: ['User'],
    endpoints: (builder) => ({
        getCurrentUser: builder.query<UserInfoResponse, void>({
            query: () => '/auth/me',
            providesTags: ['User'],
        }),
        getUserById: builder.query<UserInfoResponse, number>({
            query: (userId) => `/users/${userId}`,
            providesTags: (_result, _error, userId) => [{ type: 'User', id: userId }],
        }),
        updateCurrentUser: builder.mutation<UserInfoResponse, UserChangesRequest>({
            query: (body) => ({
                url: '/users/me',
                method: 'PUT',
                body,
            }),
            invalidatesTags: ['User'],
        }),
    }),
});

export const {
    useGetCurrentUserQuery,
    useGetUserByIdQuery,
    useUpdateCurrentUserMutation,
} = userApi;
