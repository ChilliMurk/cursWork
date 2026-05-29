// // // store/api/eventApi.ts
// // import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
// //
// // // Интерфейс события с бэкенда
// // export interface EventFromBackend {
// //     id: number;
// //     title: string;
// //     description: string;
// // }
// //
// // // Интерфейс для создания события
// // export interface CreateEventRequest {
// //     title: string;
// //     description: string;
// //     // добавьте другие поля по необходимости
// // }
// //
// // // Расширенный интерфейс для фронтенда
// // export interface Event extends EventFromBackend {
// //     participants: number;
// //     status: 'upcoming' | 'ongoing' | 'completed';
// //     game: string;
// //     maxParticipants: number;
// //     date: string;
// //     prize: string;
// // }
// //
// // export const eventApi = createApi({
// //     reducerPath: 'eventApi',
// //     baseQuery: fetchBaseQuery({
// //         baseUrl: 'http://localhost:8080/api/',
// //         prepareHeaders: (headers) => {
// //             headers.set('Content-Type', 'application/json');
// //             const token = localStorage.getItem('token');
// //             if (token) {
// //                 headers.set('Authorization', `Bearer ${token}`);
// //             }
// //             return headers;
// //         },
// //     }),
// //     endpoints: (builder) => ({
// //         getAllEvents: builder.query<Event[], void>({ // Меняем тип возврата на Event[]
// //             query: () => 'admin/events/all',
// //             transformResponse: (response: EventFromBackend[]): Event[] => {
// //                 return response.map(event => ({
// //                     ...event,
// //                     participants: 0,
// //                     status: 'upcoming',
// //                     game: 'Все',
// //                     maxParticipants: 100,
// //                     date: new Date().toLocaleDateString('ru-RU'),
// //                     prize: 'Уточняется',
// //                 }));
// //             },
// //         }),
// //         getEventById: builder.query<Event, number>({ // Меняем тип возврата на Event
// //             query: (id) => `admin/events/${id}`,
// //             transformResponse: (response: EventFromBackend): Event => ({
// //                 ...response,
// //                 participants: 0,
// //                 status: 'upcoming',
// //                 game: 'Все',
// //                 maxParticipants: 100,
// //                 date: new Date().toLocaleDateString('ru-RU'),
// //                 prize: 'Уточняется',
// //             }),
// //         }),
// //         createEvent: builder.mutation<EventFromBackend, CreateEventRequest>({
// //             query: (eventData) => ({
// //                 url: 'admin/events/create',
// //                 method: 'POST',
// //                 body: eventData,
// //             }),
// //         }),
// //     }),
// // });
// //
// // export const {
// //     useGetAllEventsQuery,
// //     useGetEventByIdQuery,
// //     useCreateEventMutation,
// // } = eventApi;
//
//
//
// // import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
// // import { RootState } from '@/store/store';
// //
// // // Интерфейс для события с сервера
// // export interface ServerEvent {
// //     id: number;
// //     title: string;
// //     description: string;
// //     // Добавьте другие поля, которые приходят с сервера
// // }
// //
// // // Интерфейс для события на фронтенде (с дополнительными полями)
// // export interface Event extends ServerEvent {
// //     game: string;
// //     participants: number;
// //     maxParticipants: number;
// //     date: string;
// //     status: 'upcoming' | 'ongoing' | 'completed';
// //     prize: string;
// // }
// //
// // export const eventsApi = createApi({
// //     reducerPath: 'eventsApi',
// //     baseQuery: fetchBaseQuery({
// //         baseUrl: 'http://192.168.0.12:8080/api/',
// //         prepareHeaders: (headers, { getState }) => {
// //             const token = (getState() as RootState).authReducer.user?.token;
// //             if (token) {
// //                 headers.set('Authorization', `Bearer ${token}`);
// //             }
// //             headers.set('Content-Type', 'application/json');
// //             return headers;
// //         },
// //     }),
// //     endpoints: (builder) => ({
// //         getAllEvents: builder.query<ServerEvent[], void>({
// //             query: () => 'events/all',
// //         }),
// //         getAdminEvents: builder.query<ServerEvent[], void>({
// //             query: () => 'admin/events/all',
// //         }),
// //     }),
// // });
// //
// // export const { useGetAllEventsQuery, useGetAdminEventsQuery } = eventsApi;
//
//
// // import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
// // import { RootState } from '@/store/store';
// //
// // // Исправленный интерфейс - сервер возвращает name, а не title!
// // export interface ServerEvent {
// //     id: number;
// //     name: string;        // было title, а сервер возвращает name
// //     description: string;
// // }
// //
// // export const eventsApi = createApi({
// //     reducerPath: 'eventsApi',
// //     baseQuery: fetchBaseQuery({
// //         baseUrl: 'http://192.168.0.12:8080/api/',
// //         prepareHeaders: (headers, { getState }) => {
// //             const token = (getState() as RootState).authReducer.user?.token;
// //             if (token) {
// //                 headers.set('Authorization', `Bearer ${token}`);
// //             }
// //             console.log('Token being sent:', token); // для отладки
// //             headers.set('Content-Type', 'application/json');
// //             return headers;
// //         },
// //     }),
// //     endpoints: (builder) => ({
// //         getAdminEvents: builder.query<ServerEvent[], void>({
// //             query: () => 'admin/events/all',
// //         }),
// //     }),
// // });
// //
// // export const { useGetAdminEventsQuery } = eventsApi;
//
//
// import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
// import { RootState } from '@/store/store';
//
// export interface ServerEvent {
//     id: number;
//     name: string;
//     description: string;
// }
//
// export const eventsApi = createApi({
//     reducerPath: 'eventsApi',
//     tagTypes: ['Events'],
//     baseQuery: fetchBaseQuery({
//         baseUrl: 'http://192.168.1.103:8080/api/',
//         prepareHeaders: (headers, { getState }) => {
//             const token = (getState() as RootState).authReducer.user?.token;
//             if (token) {
//                 headers.set('Authorization', `Bearer ${token}`);
//             }
//             headers.set('Content-Type', 'application/json');
//             return headers;
//         },
//     }),
//     endpoints: (builder) => ({
//         getAdminEvents: builder.query<ServerEvent[], void>({
//             query: () => 'admin/events/all',
//             providesTags: ['Events'],
//         }),
//     }),
// });
//
// export const { useGetAdminEventsQuery } = eventsApi;




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
