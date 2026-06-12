import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {RootState} from '@/store/store';

export interface FaceItConnectRequest {
    faceit_nickname: string;
}

export interface FaceItConnectResponse {
    success: boolean;
    message?: string;
}

export const faceItApi = createApi({
    reducerPath: 'faceItApi',
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
        responseHandler: async (response) => {
            const text = await response.text();
            try {
                return JSON.parse(text);
            } catch {
                return {message: text, success: response.ok};
            }
        },
    }),
    tagTypes: ['FaceIt'],
    endpoints: (builder) => ({
        connectFaceIt: builder.mutation<FaceItConnectResponse, FaceItConnectRequest>({
            query: (body) => ({
                url: '/auth/me/connect_faceit',
                method: 'PUT',
                body,
            }),
            invalidatesTags: ['FaceIt'],
            // Трансформируем ответ в единый формат
            transformResponse: (response: any) => {
                if (response.message || typeof response === 'string') {
                    return {
                        success: true,
                        message: response.message || response,
                    };
                }
                return response;
            },
        }),
        getFaceItStats: builder.query<any, void>({
            query: () => '/auth/me/faceit_stats',
            providesTags: ['FaceIt'],
        }),
    }),
});

export const {
    useConnectFaceItMutation,
    useGetFaceItStatsQuery,
} = faceItApi;
