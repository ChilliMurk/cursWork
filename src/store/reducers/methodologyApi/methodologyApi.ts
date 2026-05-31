// store/reducers/methodologyApi/methodologyApi.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '@/store/store';

export interface MethodologyInfoResponse {
    id: number;
    title: string;
    description: string;
    image_url: string;
    author_id: number;
    author_name: string;
    duration: string;
    category: string;
    level: string;  // <-- ИЗМЕНЕНО: теперь string, а не конкретные значения
    team_id: number;
}

export interface BlockInfoResponse {
    id: number;
    order_index?: number;
    orderIndex?: number;
    type: string;
    content: string;
}

export interface MethodologyContentResponse extends MethodologyInfoResponse {
    blocks?: BlockInfoResponse[];
    content?: BlockInfoResponse[];
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

export interface MethodologyEditRequest {
    info: {
        title: string;
        level: string;
    };
    content: BlockEditRequest[];
}

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
export const transformMethodology = (serverMethodology: any): Methodology | null => {
    if (!serverMethodology) {
        console.error('Server methodology is null');
        return null;
    }

    // Получаем данные из info, так как сервер возвращает { info: {...}, content: [...] }
    const info = serverMethodology.info || serverMethodology;
    const contentArray = serverMethodology.content || serverMethodology.blocks || [];

    const typeMap: Record<string, 'heading' | 'text' | 'image'> = {
        'HEADER': 'heading',
        'TEXT': 'text',
        'IMAGE': 'image'
    };

    const levelMap: Record<string, 'beginner' | 'intermediate' | 'advanced'> = {
        'EASY': 'beginner',
        'INTERMEDIATE': 'intermediate',
        'ADVANCED': 'advanced'
    };

    const blocks = contentArray.map((block: any, index: number) => ({
        id: block.id || index,
        order_index: block.order_index !== undefined ? block.order_index : (block.orderIndex !== undefined ? block.orderIndex : index),
        type: typeMap[block.type] || 'text',
        content: block.content || ''
    }));

    return {
        id: info.id,
        title: info.title || '',
        description: info.description || '',
        image_url: info.image_url || '',
        author_id: info.author_id || 0,
        author_name: info.author_name || '',
        duration: info.duration || '',
        category: info.category || '',
        level: levelMap[info.level] || 'beginner',
        team_id: info.team_id || 0,
        blocks: blocks
    };
};

export const transformMethodologyList = (serverMethodology: MethodologyInfoResponse): MethodologyList => {
    const levelMap: Record<string, 'beginner' | 'intermediate' | 'advanced'> = {
        'EASY': 'beginner',
        'INTERMEDIATE': 'intermediate',
        'ADVANCED': 'advanced'
    };

    return {
        id: serverMethodology.id,
        title: serverMethodology.title || '',
        description: serverMethodology.description || '',
        image_url: serverMethodology.image_url || '',
        author_id: serverMethodology.author_id || 0,
        author_name: serverMethodology.author_name || '',
        duration: serverMethodology.duration || '',
        category: serverMethodology.category || '',
        level: levelMap[serverMethodology.level] || 'beginner',
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

        getMethodologyById: builder.query<Methodology | null, number>({
            query: (methodologyId) => `/methodologies/${methodologyId}`,
            transformResponse: (response: any) => {
                console.log('Methodology by ID response:', response);
                // response уже имеет структуру { info: {...}, content: [...] }
                return transformMethodology(response);
            },
            transformErrorResponse: (response) => {
                console.error('Error fetching methodology by ID:', response);
                return response;
            },
            providesTags: (_result, _error, id) => [{ type: 'Methodology', id }],
        }),

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
