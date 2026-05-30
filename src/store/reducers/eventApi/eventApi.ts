import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '@/store/store';

export interface ServerEvent {
    id: number;
    name: string;
    description: string;
}

export interface Event extends ServerEvent {
    participants: number;
    status: 'upcoming' | 'ongoing' | 'completed';
    game: string;
    maxParticipants: number;
    date: string;
    prize: string;
}

export const eventsApi = createApi({
    reducerPath: 'eventsApi',
    tagTypes: ['Events'],
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://192.168.1.103:8080/api/',
        prepareHeaders: (headers, { getState }) => {
            const token = (getState() as RootState).authReducer.user?.token;
            if (token) {
                headers.set('Authorization', `Bearer ${token}`);
            }
            headers.set('Content-Type', 'application/json');
            return headers;
        },
    }),
    endpoints: (builder) => ({
        getAdminEvents: builder.query<ServerEvent[], void>({
            query: () => 'admin/events/all',
            providesTags: ['Events'],
        }),
    }),
});

export const { useGetAdminEventsQuery } = eventsApi;
