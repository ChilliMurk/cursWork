import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { rememberReducer, rememberEnhancer } from 'redux-remember';
import { authReducer } from "@/store/reducers/authSlice.ts";
import { userReducer } from "@/store/reducers/userSlice.ts";
import { methodologyReducer } from "@/store/reducers/methodologySlice.ts";
import { myTeamReducer } from "@/store/reducers/myTeamSlice.ts"; // Добавить
import { authApi } from "@/store/reducers/auth/auth.ts";
import { eventsApi } from "@/store/reducers/eventApi/eventApi.ts";
import { methodologyApi } from "@/store/reducers/methodologyApi/methodologyApi.ts";
import { uploadApi } from "@/store/reducers/uploadApi/uploadApi.ts";
import { userApi } from "@/store/reducers/userApi/userApi.ts";
import { teamApi } from "@/store/reducers/teamApi/teamApi.ts";
import { myTeamApi } from "@/store/reducers/myTeamApi/myTeamApi.ts"; // Добавить

const rememberedReducers = [
    'authReducer',
    'userReducer',
    'methodologyReducer',
    'myTeamReducer',  // Добавить
    'authApi',
    'eventsApi',
    'methodologyApi',
    'uploadApi',
    'userApi',
    'teamApi',
    'myTeamApi',  // Добавить
];

const rootReducer = combineReducers({
    authReducer,
    userReducer,
    methodologyReducer,
    myTeamReducer,  // Добавить
    [authApi.reducerPath]: authApi.reducer,
    [eventsApi.reducerPath]: eventsApi.reducer,
    [methodologyApi.reducerPath]: methodologyApi.reducer,
    [uploadApi.reducerPath]: uploadApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [teamApi.reducerPath]: teamApi.reducer,
    [myTeamApi.reducerPath]: myTeamApi.reducer,
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
            teamApi.middleware,
            myTeamApi.middleware,  // Добавить
        ),
    enhancers: (getDefaultEnhancer) =>
        getDefaultEnhancer().concat(rememberEnhancer(window.localStorage, rememberedReducers)),
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = typeof store;
export type AppDispatch = AppStore['dispatch'];
