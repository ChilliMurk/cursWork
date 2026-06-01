import {combineReducers, configureStore} from '@reduxjs/toolkit';
import {rememberReducer, rememberEnhancer} from 'redux-remember';
import {authReducer} from "@/store/reducers/authSlice.ts";
import {userReducer} from "@/store/reducers/userSlice.ts";
import {methodologyReducer} from "@/store/reducers/methodologySlice.ts";
import {authApi} from "@/store/reducers/auth/auth.ts";
import {eventsApi} from "@/store/reducers/eventApi/eventApi.ts";
import {methodologyApi} from "@/store/reducers/methodologyApi/methodologyApi.ts";
import {uploadApi} from "@/store/reducers/uploadApi/uploadApi.ts";
import {userApi} from "@/store/reducers/userApi/userApi.ts";

const rememberedReducers = [
    'authReducer',
    'userReducer',
    'methodologyReducer',
    'authApi',
    'eventsApi',
    'methodologyApi',
    'uploadApi',
    'userApi',
];

const rootReducer = combineReducers({
    authReducer,
    userReducer,
    methodologyReducer,
    [authApi.reducerPath]: authApi.reducer,
    [eventsApi.reducerPath]: eventsApi.reducer,
    [methodologyApi.reducerPath]: methodologyApi.reducer,
    [uploadApi.reducerPath]: uploadApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
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
            eventsApi.middleware,
            methodologyApi.middleware,
            uploadApi.middleware,
            userApi.middleware,
        ),
    enhancers: (getDefaultEnhancer) =>
        getDefaultEnhancer().concat(rememberEnhancer(window.localStorage, rememberedReducers)),
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = typeof store;
export type AppDispatch = AppStore['dispatch'];
