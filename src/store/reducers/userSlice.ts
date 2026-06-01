import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {UserInfoResponse} from '@/store/reducers/userApi/userApi.ts';

interface UserPreferences {
    theme?: 'light' | 'dark';
    language?: string;
    notifications?: boolean;

    [key: string]: any;
}

interface UserState {
    profile: UserInfoResponse | null;
    preferences: UserPreferences;
    isLoading: boolean;
    error: string | null;
}

const initialState: UserState = {
    profile: null,
    preferences: {
        theme: 'dark',
        language: 'ru',
        notifications: true,
    },
    isLoading: false,
    error: null,
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUserProfile: (state, action: PayloadAction<UserInfoResponse | null>) => {
            state.profile = action.payload;
        },
        setUserPreferences: (state, action: PayloadAction<UserPreferences>) => {
            state.preferences = {...state.preferences, ...action.payload};
        },
        setUserLoading: (state, action: PayloadAction<boolean>) => {
            state.isLoading = action.payload;
        },
        setUserError: (state, action: PayloadAction<string | null>) => {
            state.error = action.payload;
        },
        clearUser: (state) => {
            state.profile = null;
            state.error = null;
            state.isLoading = false;
        },
        updateUserBio: (state, action: PayloadAction<string>) => {
            if (state.profile) {
                state.profile.bio = action.payload;
            }
        },
        updateUserAvatar: (state, action: PayloadAction<string | null>) => {
            if (state.profile) {
                state.profile.avatar_url = action.payload;
            }
        },
    },
});

export const {
    setUserProfile,
    setUserPreferences,
    setUserLoading,
    setUserError,
    clearUser,
    updateUserBio,
    updateUserAvatar,
} = userSlice.actions;

export const userReducer = userSlice.reducer;
