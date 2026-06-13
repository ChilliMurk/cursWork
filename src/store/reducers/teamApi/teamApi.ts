import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {RootState} from '@/store/store';

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

export interface TeamCreatingRequest {
    name: string;
    description: string;
    contacts: string;
    requirements: string;
    game: string;
}

export const gameToBackend: Record<string, string> = {
    "Counter-Strike 2": "CS",
    "Dota 2": "DOTA",
    "Valorant": "VALORANT",
    "Mobile Legend": "MOBILE_LEGEND",
};

export const gameToFrontend: Record<string, string> = {
    "CS": "Counter-Strike 2",
    "DOTA": "Dota 2",
    "VALORANT": "Valorant",
    "MOBILE_LEGEND": "Mobile Legend",
};

export const teamApi = createApi({
    reducerPath: 'teamApi',
    baseQuery: fetchBaseQuery({
        baseUrl: '/api',
        prepareHeaders: (headers, {getState}) => {
            const token = (getState() as RootState).authReducer?.user?.token;
            if (token) {
                headers.set('Authorization', `Bearer ${token}`);
            }
            return headers;
        },
    }),
    tagTypes: ['Teams', 'Team', 'TeamMembers'],
    endpoints: (builder) => ({
        getAllTeams: builder.query<TeamInfoResponse[], string | undefined>({
            query: (game) => {
                if (game && game !== 'Все' && game !== '') {
                    const backendGame = gameToBackend[game];
                    if (backendGame) {
                        return `/teams/all?game=${backendGame}`;
                    }
                    return `/teams/all?game=${encodeURIComponent(game)}`;
                }
                return '/teams/all';
            },
            transformResponse: (response: TeamInfoResponse[]) => {
                return response.map(team => ({
                    ...team,
                    game: gameToFrontend[team.game] || team.game,
                    members: team.members || [],
                    team_roles: team.team_roles || {},
                }));
            },
            providesTags: ['Teams'],
        }),
        getTeamById: builder.query<TeamInfoResponse, number>({
            query: (teamId) => `/teams/${teamId}`,
            transformResponse: (response: TeamInfoResponse) => ({
                ...response,
                game: gameToFrontend[response.game] || response.game,
                members: response.members || [],
                team_roles: response.team_roles || {},
            }),
            providesTags: (_result, _error, teamId) => [{type: 'Team', id: teamId}],
        }),
        getTeamMembers: builder.query<UserShortInfoResponse[], number>({
            query: (teamId) => `/teams/${teamId}/members`,
            providesTags: (_result, _error, teamId) => [{type: 'TeamMembers', id: teamId}],
        }),
        createTeam: builder.mutation<TeamInfoResponse, TeamCreatingRequest>({
            query: (body) => {
                const backendGame = gameToBackend[body.game];
                return {
                    url: '/teams/new',
                    method: 'POST',
                    body: {
                        ...body,
                        game: backendGame || body.game,
                    },
                };
            },
            invalidatesTags: ['Teams'],
        }),
        deleteTeam: builder.mutation<void, number>({
            query: (teamId) => ({
                url: `/teams/${teamId}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Teams'],
        }),
    }),
});

export const {
    useGetAllTeamsQuery,
    useGetTeamByIdQuery,
    useGetTeamMembersQuery,
    useCreateTeamMutation,
    useDeleteTeamMutation,
} = teamApi;
