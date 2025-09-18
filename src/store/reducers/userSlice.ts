import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
    profile: any;
    preferences: any;
}

const initialState: UserState = {
    profile: null,
    preferences: {},
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUserProfile: (state, action: PayloadAction<any>) => {
            state.profile = action.payload;
        },
        setUserPreferences: (state, action: PayloadAction<any>) => {
            state.preferences = action.payload;
        },
    },
});

export const { setUserProfile, setUserPreferences } = userSlice.actions;
export const userReducer = userSlice.reducer;
