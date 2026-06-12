import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '@/store/store';

export interface EventInfoResponse {
    id: number;
    title: string;
    description: string;
    type: string;
    date: string;
    organizer_id: number;
    organizer_name: string;
    team_id: number;
    team_name: string;
    max_amount_of_participants: number;
    amount_of_participants: number;
    status: string;
    prize: string;
}

export interface EventCreatingRequest {
    title: string;
    description: string;
    type: string;
    date: string;
    max_amount_of_participants: number;
    prize: string;
}

export const transformEvent = (serverEvent: EventInfoResponse): Event => {
    return {
        id: serverEvent.id,
        name: serverEvent.title,
        title: serverEvent.title,
        description: serverEvent.description,
        participants: serverEvent.amount_of_participants,
        maxParticipants: serverEvent.max_amount_of_participants,
        date: serverEvent.date,
        status: serverEvent.status as 'upcoming' | 'ongoing' | 'completed',
        prize: serverEvent.prize,
        game: serverEvent.type,
        organizerId: serverEvent.organizer_id,
        organizerName: serverEvent.organizer_name,
        teamId: serverEvent.team_id,
        teamName: serverEvent.team_name
    };
};

export interface Event {
    id: number;
    name: string;
    title: string;
    description: string;
    participants: number;
    maxParticipants: number;
    date: string;
    status: 'upcoming' | 'ongoing' | 'completed';
    prize: string;
    game: string;
    organizerId: number;
    organizerName: string;
    teamId: number;
    teamName: string;
}

export const eventsApi = createApi({
    reducerPath: 'eventsApi',
    tagTypes: ['Events'],
    baseQuery: fetchBaseQuery({
        baseUrl: '/api',
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
        getAvailableEvents: builder.query<Event[], { month: number; year: number }>({
            query: ({ month, year }) => `/events/all_available?month=${month}&year=${year}`,
            transformResponse: (response: EventInfoResponse[]) => {
                return response.map(transformEvent);
            },
            providesTags: ['Events'],
        }),

        getAllEvents: builder.query<Event[], void>({
            query: () => '/events/all',
            transformResponse: (response: EventInfoResponse[]) => {
                return response.map(transformEvent);
            },
            providesTags: ['Events'],
        }),

        getParticipatingEvents: builder.query<Event[], void>({
            query: () => '/events/participating',
            transformResponse: (response: EventInfoResponse[]) => {
                return response.map(transformEvent);
            },
            providesTags: ['Events'],
        }),

        getEventsOrganizedByMe: builder.query<Event[], void>({
            query: () => '/events/events_organized_by_me',
            transformResponse: (response: EventInfoResponse[]) => {
                return response.map(transformEvent);
            },
            providesTags: ['Events'],
        }),

        getTeamEvents: builder.query<Event[], { month: number; year: number }>({
            query: ({ month, year }) => `/events/team_events?month=${month}&year=${year}`,
            transformResponse: (response: EventInfoResponse[]) => {
                return response.map(transformEvent);
            },
            providesTags: ['Events'],
        }),

        getCommonEvents: builder.query<Event[], { month: number; year: number }>({
            query: ({ month, year }) => `/events/common_events?month=${month}&year=${year}`,
            transformResponse: (response: EventInfoResponse[]) => {
                return response.map(transformEvent);
            },
            providesTags: ['Events'],
        }),

        getEventById: builder.query<Event, number>({
            query: (eventId) => `/events/${eventId}`,
            transformResponse: (response: EventInfoResponse) => {
                return transformEvent(response);
            },
            providesTags: (_result, _error, id) => [{ type: 'Events', id }],
        }),

        createCommonEvent: builder.mutation<EventInfoResponse, EventCreatingRequest>({
            query: (eventData) => {
                console.log('Sending common event data:', JSON.stringify(eventData, null, 2));
                return {
                    url: '/events/new_common_event',
                    method: 'POST',
                    body: eventData,
                };
            },
            invalidatesTags: ['Events'],
            transformResponse: (response: EventInfoResponse) => {
                console.log('Common event created:', response);
                return response;
            },
        }),

        createTeamEvent: builder.mutation<EventInfoResponse, EventCreatingRequest>({
            query: (eventData) => {
                console.log('Sending team event data:', JSON.stringify(eventData, null, 2));
                return {
                    url: '/events/new_team_event',
                    method: 'POST',
                    body: eventData,
                };
            },
            invalidatesTags: ['Events'],
            transformResponse: (response: EventInfoResponse) => {
                console.log('Team event created:', response);
                return response;
            },
        }),
    }),
});

export const {
    useGetAllEventsQuery,
    useGetAvailableEventsQuery,
    useGetTeamEventsQuery,
    useGetCommonEventsQuery,
    useGetEventByIdQuery,
    useGetParticipatingEventsQuery,
    useGetEventsOrganizedByMeQuery,
    useCreateCommonEventMutation,
    useCreateTeamEventMutation,
} = eventsApi;
