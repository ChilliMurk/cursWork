import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {RootState} from '@/store/store';

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

export interface TrainingInfoResponse {
    id: number;
    title: string;
    description: string;
    date: string;
    time: string;
    type: 'training';
    team_id: number;
    team_name: string;
    status: 'upcoming' | 'ongoing' | 'completed';
}

export interface AttendanceInfoResponse {
    id: number;
    user_id: number;
    user_name: string;
    event_id: number;
    event_title: string;
    attended: boolean;
    attended_date: string;
}

export interface AttendanceCreatingRequest {
    attended: boolean;
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

export const transformTraining = (serverTraining: TrainingInfoResponse): Training => {
    return {
        id: serverTraining.id,
        title: serverTraining.title,
        description: serverTraining.description,
        date: serverTraining.date,
        time: serverTraining.time,
        type: 'training',
        teamId: serverTraining.team_id,
        teamName: serverTraining.team_name,
        status: serverTraining.status
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

export interface Training {
    id: number;
    title: string;
    description: string;
    date: string;
    time: string;
    type: 'training';
    teamId: number;
    teamName: string;
    status: 'upcoming' | 'ongoing' | 'completed';
}

export const eventsApi = createApi({
    reducerPath: 'eventsApi',
    tagTypes: ['Events', 'Trainings', 'Attendance'],
    baseQuery: fetchBaseQuery({
        baseUrl: '/api',
        prepareHeaders: (headers, {getState}) => {
            const state = getState() as RootState;
            // Исправлено: правильный путь к токену
            const token = state.authReducer?.user?.token;

            console.log('Events API - Token exists:', !!token);

            if (token) {
                headers.set('Authorization', `Bearer ${token}`);
            } else {
                console.warn('Events API - No token found!');
            }

            headers.set('Content-Type', 'application/json');
            return headers;
        },
    }),
    endpoints: (builder) => ({
        getAvailableEvents: builder.query<Event[], { month: number; year: number }>({
            query: ({month, year}) => `/events/all_available?month=${month}&year=${year}`,
            transformResponse: (response: EventInfoResponse[]) => response.map(transformEvent),
            providesTags: ['Events'],
        }),

        getAllEvents: builder.query<Event[], void>({
            query: () => '/events/all',
            transformResponse: (response: EventInfoResponse[]) => response.map(transformEvent),
            providesTags: ['Events'],
        }),

        getParticipatingEvents: builder.query<Event[], { month: number; year: number }>({
            query: ({month, year}) => `/events/participating?month=${month}&year=${year}`,
            transformResponse: (response: EventInfoResponse[]) => response.map(transformEvent),
            providesTags: ['Events'],
        }),

        getEventsOrganizedByMe: builder.query<Event[], void>({
            query: () => '/events/events_organized_by_me',
            transformResponse: (response: EventInfoResponse[]) => response.map(transformEvent),
            providesTags: ['Events'],
        }),

        getTeamEvents: builder.query<Event[], { month: number; year: number }>({
            query: ({month, year}) => `/events/team_events?month=${month}&year=${year}`,
            transformResponse: (response: EventInfoResponse[]) => response.map(transformEvent),
            providesTags: ['Events'],
        }),

        getCommonEvents: builder.query<Event[], { month: number; year: number }>({
            query: ({month, year}) => `/events/common_events?month=${month}&year=${year}`,
            transformResponse: (response: EventInfoResponse[]) => response.map(transformEvent),
            providesTags: ['Events'],
        }),

        getEventById: builder.query<Event, number>({
            query: (eventId) => `/events/${eventId}`,
            transformResponse: (response: EventInfoResponse) => transformEvent(response),
            providesTags: (_result, _error, id) => [{type: 'Events', id}],
        }),

        createCommonEvent: builder.mutation<EventInfoResponse, EventCreatingRequest>({
            query: (eventData) => ({
                url: '/events/new_common_event',
                method: 'POST',
                body: eventData,
            }),
            invalidatesTags: ['Events'],
        }),

        createTeamEvent: builder.mutation<EventInfoResponse, EventCreatingRequest>({
            query: (eventData) => ({
                url: '/events/new_team_event',
                method: 'POST',
                body: eventData,
            }),
            invalidatesTags: ['Events'],
        }),

        participateInEvent: builder.mutation<void, number>({
            query: (eventId) => ({
                url: `/events/${eventId}/participate`,
                method: 'POST',
            }),
            invalidatesTags: ['Events'],
        }),

        unparticipateFromEvent: builder.mutation<void, number>({
            query: (eventId) => ({
                url: `/events/${eventId}/participate`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Events'],
        }),

        getTeamTrainings: builder.query<Training[], { month: number; year: number }>({
            query: ({month, year}) => `/events/trainings?month=${month}&year=${year}`,
            transformResponse: (response: TrainingInfoResponse[]) => response.map(transformTraining),
            providesTags: ['Trainings'],
        }),

        getTrainingAttendance: builder.query<AttendanceInfoResponse[], number>({
            query: (eventId) => `/events/trainings/${eventId}/attendance`,
            providesTags: (_result, _error, eventId) => [{type: 'Attendance', id: eventId}],
        }),

        getTeamAttendance: builder.query<AttendanceInfoResponse[], void>({
            query: () => '/events/trainings/attendance',
            providesTags: ['Attendance'],
        }),

        getUserAttendance: builder.query<AttendanceInfoResponse[], number>({
            query: (userId) => `/events/trainings/attendance/${userId}`,
            providesTags: (_result, _error, userId) => [{type: 'Attendance', id: userId}],
        }),

        markAttendance: builder.mutation<void, { eventId: number; userId: number; attended: boolean }>({
            query: ({eventId, userId, attended}) => ({
                url: `/events/trainings/${eventId}/attendance/${userId}`,
                method: 'POST',
                body: {attended} as AttendanceCreatingRequest,
            }),
            invalidatesTags: (_result, _error, {eventId}) => ['Attendance', {type: 'Attendance', id: eventId}],
        }),
    }),
});

export const {
    useGetAllEventsQuery,
    useGetAvailableEventsQuery,
    useGetParticipatingEventsQuery,
    useGetEventsOrganizedByMeQuery,
    useGetTeamEventsQuery,
    useGetCommonEventsQuery,
    useGetEventByIdQuery,
    useCreateCommonEventMutation,
    useCreateTeamEventMutation,
    useParticipateInEventMutation,
    useUnparticipateFromEventMutation,
    useGetTeamTrainingsQuery,
    useGetTrainingAttendanceQuery,
    useGetTeamAttendanceQuery,
    useGetUserAttendanceQuery,
    useMarkAttendanceMutation,
} = eventsApi;
