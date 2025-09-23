import {combineReducers, configureStore} from '@reduxjs/toolkit';
import {rememberReducer, rememberEnhancer} from 'redux-remember';
import {authReducer} from "@/store/reducers/authSlice.ts";
import {userReducer} from "@/store/reducers/userSlice.ts";
import {authApi} from "@/store/reducers/auth/auth.ts";

const rememberedReducers = [
    'authReducer',
    'userReducer',
    'authApi',
];

const rootReducer = combineReducers({
    authReducer,
    userReducer,
    [authApi.reducerPath]: authApi.reducer,
});

const rememberedReducer = rememberReducer(rootReducer);

export const store = configureStore({
    reducer: rememberedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: ['persist/PERSIST'],
            },
        }).concat(authApi.middleware), // добавьте API middleware
    enhancers: (getDefaultEnhancer) =>
        getDefaultEnhancer().concat(rememberEnhancer(window.localStorage, rememberedReducers)),
});

export const clearApiCache = () => {
    // store.dispatch(authApi.util.resetApiState());
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = typeof store;
export type AppDispatch = AppStore['dispatch'];
