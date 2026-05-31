// store/reducers/methodologyApi/methodologyApi.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '@/store/store';

// Интерфейсы для ответов от сервера
export interface MethodologyInfoResponse {
    id: number;
    title: string;
    description: string;
    image_url: string;
    author_id: number;
    author_name: string;
    duration: string;
    category: string;
    level: 'beginner' | 'intermediate' | 'advanced';
    team_id: number;
}

export interface BlockInfoResponse {
    id: number;
    order_index: number;
    type: 'heading' | 'text' | 'image';
    content: string;
}

export interface MethodologyContentResponse extends MethodologyInfoResponse {
    blocks: BlockInfoResponse[];
}

export interface MethodologyInfoEditRequest {
    title: string;
    description: string;
    image_url: string;
    duration: string;
    category: string;
    level: string;
}

export interface BlockEditRequest {
    orderIndex: number;
    type: string;
    content: string;
}

// Правильная структура для создания методички
export interface MethodologyEditRequest {
    info: {
        title: string;
        level: string;
        // description?: string;
        // image_url?: string;
        // duration?: string;
        // category?: string;
    };
    content: BlockEditRequest[];
}

// Интерфейсы для фронта
export interface MethodologyBlock {
    id?: number;
    order_index: number;
    type: 'heading' | 'text' | 'image';
    content: string;
}

export interface Methodology {
    id: number;
    title: string;
    description: string;
    image_url: string;
    author_id: number;
    author_name: string;
    duration: string;
    category: string;
    level: 'beginner' | 'intermediate' | 'advanced';
    team_id: number;
    blocks: MethodologyBlock[];
}

// Трансформация данных с проверками
export const transformMethodology = (serverMethodology: MethodologyContentResponse | null): Methodology | null => {
    if (!serverMethodology) {
        console.error('Server methodology is null');
        return null;
    }

    return {
        id: serverMethodology.id,
        title: serverMethodology.title || '',
        description: serverMethodology.description || '',
        image_url: serverMethodology.image_url || '',
        author_id: serverMethodology.author_id || 0,
        author_name: serverMethodology.author_name || '',
        duration: serverMethodology.duration || '',
        category: serverMethodology.category || '',
        level: serverMethodology.level || 'beginner',
        team_id: serverMethodology.team_id || 0,
        blocks: (serverMethodology.blocks || []).map(block => ({
            id: block.id,
            order_index: block.order_index,
            type: block.type,
            content: block.content
        }))
    };
};

export const transformMethodologyList = (serverMethodology: MethodologyInfoResponse): MethodologyList => {
    return {
        id: serverMethodology.id,
        title: serverMethodology.title || '',
        description: serverMethodology.description || '',
        image_url: serverMethodology.image_url || '',
        author_id: serverMethodology.author_id || 0,
        author_name: serverMethodology.author_name || '',
        duration: serverMethodology.duration || '',
        category: serverMethodology.category || '',
        level: serverMethodology.level || 'beginner',
        team_id: serverMethodology.team_id || 0
    };
};

export interface MethodologyList {
    id: number;
    title: string;
    description: string;
    image_url: string;
    author_id: number;
    author_name: string;
    duration: string;
    category: string;
    level: 'beginner' | 'intermediate' | 'advanced';
    team_id: number;
}

export const methodologyApi = createApi({
    reducerPath: 'methodologyApi',
    tagTypes: ['Methodologies', 'Methodology'],
    baseQuery: fetchBaseQuery({
        baseUrl: '/api',
        prepareHeaders: (headers, { getState }) => {
            const token = (getState() as RootState).authReducer.user?.token;
            if (token) {
                headers.set('Authorization', `Bearer ${token}`);
            }
            headers.set('Content-Type', 'application/json');
            return headers;
        },
    }),
    endpoints: (builder) => ({
        // Получение доступных методичек (методичек команды)
        getAvailableMethodologies: builder.query<MethodologyList[], void>({
            query: () => '/methodologies/all_available',
            transformResponse: (response: MethodologyInfoResponse[]) => {
                if (!response || !Array.isArray(response)) {
                    console.error('Available methodologies response is not an array:', response);
                    return [];
                }
                return response.map(transformMethodologyList);
            },
            providesTags: ['Methodologies'],
        }),

        // Получение всех методичек админом
        getAllMethodologies: builder.query<MethodologyList[], void>({
            query: () => '/methodologies/all',
            transformResponse: (response: MethodologyInfoResponse[]) => {
                if (!response || !Array.isArray(response)) {
                    console.error('All methodologies response is not an array:', response);
                    return [];
                }
                return response.map(transformMethodologyList);
            },
            providesTags: ['Methodologies'],
        }),

        // Получение методички по ID
        getMethodologyById: builder.query<Methodology | null, number>({
            query: (methodologyId) => `/methodologies/${methodologyId}`,
            transformResponse: (response: MethodologyContentResponse) => {
                console.log('Methodology by ID response:', response);
                return transformMethodology(response);
            },
            transformErrorResponse: (response) => {
                console.error('Error fetching methodology by ID:', response);
                return response;
            },
            providesTags: (_result, _error, id) => [{ type: 'Methodology', id }],
        }),

        // Создание методички
        createMethodology: builder.mutation<MethodologyContentResponse, MethodologyEditRequest>({
            query: (methodologyData) => {
                console.log('Creating methodology with data:', JSON.stringify(methodologyData, null, 2));
                return {
                    url: '/methodologies/new',
                    method: 'POST',
                    body: methodologyData,
                };
            },
            invalidatesTags: ['Methodologies'],
        }),

        // Редактирование методички
        updateMethodology: builder.mutation<MethodologyContentResponse, { methodologyId: number; data: MethodologyEditRequest }>({
            query: ({ methodologyId, data }) => ({
                url: `/methodologies/${methodologyId}`,
                method: 'PUT',
                body: data,
            }),
            invalidatesTags: (_result, _error, { methodologyId }) => [
                'Methodologies',
                { type: 'Methodology', id: methodologyId }
            ],
        }),

        // Удаление методички
        deleteMethodology: builder.mutation<void, number>({
            query: (methodologyId) => ({
                url: `/methodologies/${methodologyId}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Methodologies'],
        }),
    }),
});

export const {
    useGetAvailableMethodologiesQuery,
    useGetAllMethodologiesQuery,
    useGetMethodologyByIdQuery,
    useCreateMethodologyMutation,
    useUpdateMethodologyMutation,
    useDeleteMethodologyMutation,
} = methodologyApi;
