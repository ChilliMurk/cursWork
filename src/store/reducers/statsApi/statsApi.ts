import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {RootState} from '@/store/store';

export interface RateInfoResponse {
    user_id: number;
    user_name: string;
    kd: number;
    average_headshots: number;
    win_rate: number;
    tournament_played: number;
    training_attendance: number;
    hours_played: number;
    z_score: number;
    rank_position: number;
}

export interface TeamRatesInfoResponse {
    team_id: number;
    team_name: string;
    rank_position: number;
    z_score: number;
}

export interface RateWeightsRequest {
    wKd?: number;
    wHs?: number;
    wWr?: number;
    wTa?: number;
    wTr?: number;
    wHp?: number;
}

export const statsApi = createApi({
    reducerPath: 'statsApi',
    baseQuery: fetchBaseQuery({
        baseUrl: '/api',
        prepareHeaders: (headers, {getState}) => {
            const token = (getState() as RootState).authReducer?.user?.token;
            if (token) {
                headers.set('Authorization', `Bearer ${token}`);
            }
            headers.set('Content-Type', 'application/json');
            return headers;
        },
    }),
    tagTypes: ['Stats', 'TeamStats'],
    endpoints: (builder) => ({
        getGlobalRating: builder.query<RateInfoResponse[], RateWeightsRequest | void>({
            query: (weights) => {
                if (weights && Object.values(weights).some(v => v !== undefined)) {
                    const params = new URLSearchParams();
                    if (weights.wKd !== undefined) params.append('wKd', String(weights.wKd));
                    if (weights.wHs !== undefined) params.append('wHs', String(weights.wHs));
                    if (weights.wWr !== undefined) params.append('wWr', String(weights.wWr));
                    if (weights.wTa !== undefined) params.append('wTa', String(weights.wTa));
                    if (weights.wTr !== undefined) params.append('wTr', String(weights.wTr));
                    if (weights.wHp !== undefined) params.append('wHp', String(weights.wHp));
                    return `/rates?${params.toString()}`;
                }
                return '/rates';
            },
            providesTags: ['Stats'],
        }),
        getTeamRating: builder.query<RateInfoResponse[], RateWeightsRequest | void>({
            query: (weights) => {
                if (weights && Object.values(weights).some(v => v !== undefined)) {
                    const params = new URLSearchParams();
                    if (weights.wKd !== undefined) params.append('wKd', String(weights.wKd));
                    if (weights.wHs !== undefined) params.append('wHs', String(weights.wHs));
                    if (weights.wWr !== undefined) params.append('wWr', String(weights.wWr));
                    if (weights.wTa !== undefined) params.append('wTa', String(weights.wTa));
                    if (weights.wTr !== undefined) params.append('wTr', String(weights.wTr));
                    if (weights.wHp !== undefined) params.append('wHp', String(weights.wHp));
                    return `/rates/team_rate?${params.toString()}`;
                }
                return '/rates/team_rate';
            },
            providesTags: ['TeamStats'],
        }),
        getTeamsRating: builder.query<TeamRatesInfoResponse[], RateWeightsRequest | void>({
            query: (weights) => {
                if (weights && Object.values(weights).some(v => v !== undefined)) {
                    const params = new URLSearchParams();
                    if (weights.wKd !== undefined) params.append('wKd', String(weights.wKd));
                    if (weights.wHs !== undefined) params.append('wHs', String(weights.wHs));
                    if (weights.wWr !== undefined) params.append('wWr', String(weights.wWr));
                    if (weights.wTa !== undefined) params.append('wTa', String(weights.wTa));
                    if (weights.wTr !== undefined) params.append('wTr', String(weights.wTr));
                    if (weights.wHp !== undefined) params.append('wHp', String(weights.wHp));
                    return `/rates/teams?${params.toString()}`;
                }
                return '/rates/teams';
            },
            providesTags: ['Stats'],
        }),
        getUserRating: builder.query<RateInfoResponse, number>({
            query: (userId) => `/rates/${userId}`,
            providesTags: (_result, _error, userId) => [{type: 'Stats', id: userId}],
        }),
    }),
});

export const {
    useGetGlobalRatingQuery,
    useGetTeamRatingQuery,
    useGetTeamsRatingQuery,
    useGetUserRatingQuery,
} = statsApi;
