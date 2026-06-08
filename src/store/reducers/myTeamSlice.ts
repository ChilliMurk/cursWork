import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { MyTeamInfoResponse } from '@/store/reducers/myTeamApi/myTeamApi';

interface MyTeamState {
    team: MyTeamInfoResponse | null;
    isLoading: boolean;
    isUpdating: boolean;
    error: string | null;
}

const initialState: MyTeamState = {
    team: null,
    isLoading: false,
    isUpdating: false,
    error: null,
};

export const myTeamSlice = createSlice({
    name: 'myTeam',
    initialState,
    reducers: {
        fetchMyTeamStart: (state) => {
            state.isLoading = true;
            state.error = null;
        },
        fetchMyTeamSuccess: (state, action: PayloadAction<MyTeamInfoResponse | null>) => {
            state.isLoading = false;
            state.team = action.payload;
            state.error = null;
        },
        fetchMyTeamFailure: (state, action: PayloadAction<string>) => {
            state.isLoading = false;
            state.error = action.payload;
        },

        // Обновление команды
        updateMyTeamStart: (state) => {
            state.isUpdating = true;
            state.error = null;
        },
        updateMyTeamSuccess: (state, action: PayloadAction<MyTeamInfoResponse>) => {
            state.isUpdating = false;
            state.team = action.payload;
            state.error = null;
        },
        updateMyTeamFailure: (state, action: PayloadAction<string>) => {
            state.isUpdating = false;
            state.error = action.payload;
        },

        // Выход из команды
        leaveTeamStart: (state) => {
            state.isUpdating = true;
            state.error = null;
        },
        leaveTeamSuccess: (state) => {
            state.isUpdating = false;
            state.team = null;
            state.error = null;
        },
        leaveTeamFailure: (state, action: PayloadAction<string>) => {
            state.isUpdating = false;
            state.error = action.payload;
        },

        // Исключение участника
        kickMemberStart: (state) => {
            state.isUpdating = true;
            state.error = null;
        },
        kickMemberSuccess: (state, action: PayloadAction<number>) => {
            state.isUpdating = false;
            if (state.team) {
                state.team.members = state.team.members.filter(
                    member => member.id !== action.payload
                );
            }
            state.error = null;
        },
        kickMemberFailure: (state, action: PayloadAction<string>) => {
            state.isUpdating = false;
            state.error = action.payload;
        },

        // Очистка ошибки
        clearMyTeamError: (state) => {
            state.error = null;
        },

        // Сброс состояния
        resetMyTeamState: () => initialState,
    },
});

export const {
    fetchMyTeamStart,
    fetchMyTeamSuccess,
    fetchMyTeamFailure,
    updateMyTeamStart,
    updateMyTeamSuccess,
    updateMyTeamFailure,
    leaveTeamStart,
    leaveTeamSuccess,
    leaveTeamFailure,
    kickMemberStart,
    kickMemberSuccess,
    kickMemberFailure,
    clearMyTeamError,
    resetMyTeamState,
} = myTeamSlice.actions;

export const myTeamReducer = myTeamSlice.reducer;
