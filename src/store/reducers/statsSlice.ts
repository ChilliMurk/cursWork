import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RateInfoResponse, TeamRatesInfoResponse } from '@/store/reducers/statsApi/statsApi';

interface StatsState {
    globalRating: RateInfoResponse[];
    teamRating: RateInfoResponse[];
    teamsRating: TeamRatesInfoResponse[];
    selectedUserStats: RateInfoResponse | null;
    isLoading: boolean;
    error: string | null;
    weights: {
        wKd: number;
        wHs: number;
        wWr: number;
        wTa: number;
        wTr: number;
        wHp: number;
    };
}

const initialState: StatsState = {
    globalRating: [],
    teamRating: [],
    teamsRating: [],
    selectedUserStats: null,
    isLoading: false,
    error: null,
    weights: {
        wKd: 5,
        wHs: 5,
        wWr: 5,
        wTa: 5,
        wTr: 5,
        wHp: 5,
    },
};

export const statsSlice = createSlice({
    name: 'stats',
    initialState,
    reducers: {
        setGlobalRating: (state, action: PayloadAction<RateInfoResponse[]>) => {
            state.globalRating = action.payload;
        },
        setTeamRating: (state, action: PayloadAction<RateInfoResponse[]>) => {
            state.teamRating = action.payload;
        },
        setTeamsRating: (state, action: PayloadAction<TeamRatesInfoResponse[]>) => {
            state.teamsRating = action.payload;
        },
        setSelectedUserStats: (state, action: PayloadAction<RateInfoResponse | null>) => {
            state.selectedUserStats = action.payload;
        },
        setStatsLoading: (state, action: PayloadAction<boolean>) => {
            state.isLoading = action.payload;
        },
        setStatsError: (state, action: PayloadAction<string | null>) => {
            state.error = action.payload;
        },
        setWeight: (state, action: PayloadAction<{ key: keyof StatsState['weights']; value: number }>) => {
            state.weights[action.payload.key] = action.payload.value;
        },
        setWeights: (state, action: PayloadAction<Partial<StatsState['weights']>>) => {
            state.weights = { ...state.weights, ...action.payload };
        },
        resetWeights: (state) => {
            state.weights = initialState.weights;
        },
        clearStats: (state) => {
            state.globalRating = [];
            state.teamRating = [];
            state.teamsRating = [];
            state.selectedUserStats = null;
            state.error = null;
        },
    },
});

export const {
    setGlobalRating,
    setTeamRating,
    setTeamsRating,
    setSelectedUserStats,
    setStatsLoading,
    setStatsError,
    setWeight,
    setWeights,
    resetWeights,
    clearStats,
} = statsSlice.actions;

export const statsReducer = statsSlice.reducer;
