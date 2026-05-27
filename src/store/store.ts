import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { rememberReducer, rememberEnhancer } from 'redux-remember';
import { authReducer } from "@/store/reducers/authSlice.ts";
import { userReducer } from "@/store/reducers/userSlice.ts";
import { authApi } from "@/store/reducers/auth/auth.ts";
import {eventsApi} from "@/store/reducers/eventApi/eventApi.ts";
//import { eventsApi } from "@/store/reducers/events/eventsApi.ts"; // Импортируем новый API

const rememberedReducers = [
    'authReducer',
    'userReducer',
    'authApi',
    'eventsApi',
];

const rootReducer = combineReducers({
    authReducer,
    userReducer,
    [authApi.reducerPath]: authApi.reducer,
    [eventsApi.reducerPath]: eventsApi.reducer, // Добавляем eventsApi
});

const rememberedReducer = rememberReducer(rootReducer);

export const store = configureStore({
    reducer: rememberedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: ['persist/PERSIST'],
            },
        }).concat(
            authApi.middleware,
            eventsApi.middleware // Добавляем middleware для eventsApi
        ),
    enhancers: (getDefaultEnhancer) =>
        getDefaultEnhancer().concat(rememberEnhancer(window.localStorage, rememberedReducers)),
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = typeof store;
export type AppDispatch = AppStore['dispatch'];
