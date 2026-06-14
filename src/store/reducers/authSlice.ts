import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface User {
    id: string;
    email: string;
    username?: string;
    name?: string;
    login?: string;
    role?: 'admin' | 'user';
    roles?: string[];
    token?: string;
}

interface AuthState {
    isAuthenticated: boolean;
    user: null | User;
    isLoading: boolean;
    error: string | null;
}

const initialState: AuthState = {
    isAuthenticated: false,
    user: null,
    isLoading: false,
    error: null,
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loginStart: (state) => {
            state.isLoading = true;
            state.error = null;
        },
        loginSuccess: (state, action: PayloadAction<{ user: User; token: string }>) => {
            console.log('loginSuccess called with user:', action.payload.user.username);
            state.isLoading = false;
            state.isAuthenticated = true;
            state.user = {...action.payload.user, token: action.payload.token};
            state.error = null;
        },
        loginFailure: (state, action: PayloadAction<string>) => {
            state.isLoading = false;
            state.isAuthenticated = false;
            state.user = null;
            state.error = action.payload;
        },
        logout: (state) => {
            console.log('logout called');
            state.isAuthenticated = false;
            state.user = null;
            state.error = null;
        },
        registerStart: (state) => {
            state.isLoading = true;
            state.error = null;
        },
        registerSuccess: (state, action: PayloadAction<{ user: User; token: string }>) => {
            console.log('registerSuccess called with user:', action.payload.user.username);
            state.isLoading = false;
            state.isAuthenticated = true;
            state.user = {...action.payload.user, token: action.payload.token};
            state.error = null;
        },
        registerFailure: (state, action: PayloadAction<string>) => {
            state.isLoading = false;
            state.isAuthenticated = false;
            state.user = null;
            state.error = action.payload;
        },
        setToken: (state, action: PayloadAction<string>) => {
            if (state.user) {
                state.user.token = action.payload;
            }
        },
        clearAuth: (state) => {
            state.isAuthenticated = false;
            state.user = null;
            state.error = null;
            state.isLoading = false;
        },
    },
});

export const {
    loginStart,
    loginSuccess,
    loginFailure,
    logout,
    registerStart,
    registerSuccess,
    registerFailure,
    setToken,
    clearAuth,
} = authSlice.actions;

export const authReducer = authSlice.reducer;

