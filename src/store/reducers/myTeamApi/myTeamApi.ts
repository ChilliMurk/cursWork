import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '@/store/store';
import { teamApi } from '@/store/reducers/teamApi/teamApi';

export interface UserShortInfoResponse {
    id: number;
    username: string;
}

export interface TeamInfoResponse {
    id: number;
    name: string;
    description: string;
    created_date: string;
    contacts: string;
    requirements: string;
    game: string;
    members: UserShortInfoResponse[];
    team_roles: Record<string, string>;
    captain_id: number;
    captain_name: string;
}

export type MyTeamInfoResponse = TeamInfoResponse;

export interface UpdateTeamRequest {
    name: string;
    description: string;
    contacts: string;
    requirements: string;
    game: string;
}

export interface TeamRequestInfoResponse {
    id: number;
    user_id: number;
    user_name: string;
    message: string;
    created_date: string;
    status: string;
}

export interface TeamRoleChangesRequest {
    role: string;
}

export const gameToFrontend: Record<string, string> = {
    "CS": "Counter-Strike 2",
    "DOTA": "Dota 2",
    "VALORANT": "Valorant",
    "MOBILE_LEGEND": "Mobile Legend",
};

export const gameToBackend: Record<string, string> = {
    "Counter-Strike 2": "CS",
    "Dota 2": "DOTA",
    "Valorant": "VALORANT",
    "Mobile Legend": "MOBILE_LEGEND",
};

export const myTeamApi = createApi({
    reducerPath: 'myTeamApi',
    baseQuery: fetchBaseQuery({
        baseUrl: '/api',
        prepareHeaders: (headers, { getState }) => {
            const token = (getState() as RootState).authReducer?.user?.token;
            if (token) {
                headers.set('Authorization', `Bearer ${token}`);
            }
            return headers;
        },
    }),
    tagTypes: ['MyTeam', 'MyTeamMembers', 'TeamRequests'],
    endpoints: (builder) => ({
        getMyTeam: builder.query<TeamInfoResponse | null, void>({
            query: () => '/teams/my_team',
            transformResponse: (response: TeamInfoResponse | null) => {
                if (!response) return null;
                return {
                    ...response,
                    game: gameToFrontend[response.game] || response.game,
                    members: response.members || [],
                    team_roles: response.team_roles || {},
                };
            },
            providesTags: ['MyTeam'],
        }),

        updateMyTeam: builder.mutation<TeamInfoResponse, UpdateTeamRequest>({
            query: (body) => {
                const backendGame = gameToBackend[body.game];
                return {
                    url: '/teams/my_team',
                    method: 'PUT',
                    body: {
                        name: body.name,
                        description: body.description,
                        contacts: body.contacts,
                        requirements: body.requirements,
                        game: backendGame || body.game,
                    },
                };
            },
            invalidatesTags: ['MyTeam'],
            async onQueryStarted(_, { dispatch, queryFulfilled }) {
                try {
                    await queryFulfilled;
                    dispatch(teamApi.util.invalidateTags(['Teams']));
                } catch (error) {
                    console.error('Update failed:', error);
                }
            },
        }),

        deleteMyTeam: builder.mutation<void, void>({
            query: () => ({
                url: '/teams/my_team',
                method: 'DELETE',
            }),
            invalidatesTags: ['MyTeam'],
            async onQueryStarted(_, { dispatch, queryFulfilled }) {
                try {
                    await queryFulfilled;
                    dispatch(teamApi.util.invalidateTags(['Teams']));
                } catch (error) {
                    console.error('Delete failed:', error);
                }
            },
        }),

        getMyTeamMembers: builder.query<UserShortInfoResponse[], void>({
            query: () => '/teams/my_team/members',
            providesTags: ['MyTeamMembers'],
        }),

        kickMember: builder.mutation<void, number>({
            query: (userId) => ({
                url: `/teams/my_team/members/${userId}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['MyTeam', 'MyTeamMembers'],
            async onQueryStarted(_, { dispatch, queryFulfilled }) {
                try {
                    await queryFulfilled;
                    dispatch(teamApi.util.invalidateTags(['Teams']));
                } catch (error) {
                    console.error('Kick member failed:', error);
                }
            },
        }),

        getTeamRequests: builder.query<TeamRequestInfoResponse[], void>({
            query: () => '/teams/my_team/requests',
            providesTags: ['TeamRequests'],
        }),

        acceptTeamRequest: builder.mutation<void, number>({
            query: (teamRequestId) => ({
                url: `/teams/my_team/requests/${teamRequestId}`,
                method: 'POST',
            }),
            invalidatesTags: ['MyTeam', 'MyTeamMembers', 'TeamRequests'],
            async onQueryStarted(_, { dispatch, queryFulfilled }) {
                try {
                    await queryFulfilled;
                    dispatch(teamApi.util.invalidateTags(['Teams']));
                } catch (error) {
                    console.error('Accept request failed:', error);
                }
            },
        }),

        declineTeamRequest: builder.mutation<void, number>({
            query: (teamRequestId) => ({
                url: `/teams/my_team/requests/${teamRequestId}`,
                method: 'PUT',
            }),
            invalidatesTags: ['TeamRequests'],
        }),

        changeMemberRole: builder.mutation<void, { userId: number; role: string }>({
            query: ({ userId, role }) => ({
                url: `/teams/my_team/members/${userId}/role`,
                method: 'PUT',
                body: { role },
            }),
            invalidatesTags: ['MyTeam', 'MyTeamMembers'],
        }),

        leaveTeam: builder.mutation<void, void>({
            query: () => ({
                url: '/teams/my_team/leave',
                method: 'POST',
            }),
            invalidatesTags: ['MyTeam'],
            async onQueryStarted(_, { dispatch, queryFulfilled }) {
                try {
                    await queryFulfilled;
                    dispatch(teamApi.util.invalidateTags(['Teams']));
                } catch (error) {
                    console.error('Leave team failed:', error);
                }
            },
        }),
    }),
});

export const {
    useGetMyTeamQuery,
    useUpdateMyTeamMutation,
    useDeleteMyTeamMutation,
    useGetMyTeamMembersQuery,
    useKickMemberMutation,
    useGetTeamRequestsQuery,
    useAcceptTeamRequestMutation,
    useDeclineTeamRequestMutation,
    useChangeMemberRoleMutation,
    useLeaveTeamMutation,
} = myTeamApi;
