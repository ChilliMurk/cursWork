// // store/reducers/uploadApi/uploadApi.ts
// import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
// import { RootState } from '@/store/store';
//
// export interface ImageUploadResponse {
//     image_url: string;
// }
//
// export const uploadApi = createApi({
//     reducerPath: 'uploadApi',
//     baseQuery: fetchBaseQuery({
//         baseUrl: '/api',
//         prepareHeaders: (headers, { getState }) => {
//             const token = (getState() as RootState).authReducer.user?.token;
//             if (token) {
//                 headers.set('Authorization', `Bearer ${token}`);
//             }
//             return headers;
//         },
//     }),
//     endpoints: (builder) => ({
//         // Загрузка картинки на сервер
//         uploadImage: builder.mutation<ImageUploadResponse, File>({
//             query: (file) => {
//                 const formData = new FormData();
//                 formData.append('file', file);
//                 return {
//                     url: '/uploads/new',
//                     method: 'POST',
//                     body: formData,
//                 };
//             },
//         }),
//         // Получение картинки с сервера
//         getImage: builder.query<string, string>({
//             query: (imageUrl) => `/uploads/${imageUrl}`,
//         }),
//         // Удаление картинки
//         deleteImage: builder.mutation<void, string>({
//             query: (imageId) => ({
//                 url: `/uploads/${imageId}`,
//                 method: 'DELETE',
//             }),
//         }),
//     }),
// });
//
// export const {
//     useUploadImageMutation,
//     useGetImageQuery,
//     useDeleteImageMutation,
// } = uploadApi;



// store/reducers/uploadApi/uploadApi.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '@/store/store';

export interface ImageUploadResponse {
    image_url: string;
}

export const uploadApi = createApi({
    reducerPath: 'uploadApi',
    baseQuery: fetchBaseQuery({
        baseUrl: '/api',
        prepareHeaders: (headers, { getState }) => {
            const token = (getState() as RootState).authReducer.user?.token;
            if (token) {
                headers.set('Authorization', `Bearer ${token}`);
            }
            return headers;
        },
    }),
    endpoints: (builder) => ({
        uploadImage: builder.mutation<ImageUploadResponse, File>({
            query: (file) => {
                const formData = new FormData();
                formData.append('file', file);
                return {
                    url: '/uploads/new',
                    method: 'POST',
                    body: formData,
                };
            },
            transformResponse: (response: any) => {
                console.log('Raw upload response:', response);
                // Ожидаем, что response.image_url содержит только имя файла
                // Например: "497e0601-5154-4ba7-96c7-04cd4465c453.jpg"
                let imageUrl = response.image_url || response.url;

                // Если URL содержит полный путь, извлекаем только имя файла
                if (imageUrl && imageUrl.includes('/')) {
                    const parts = imageUrl.split('/');
                    imageUrl = parts[parts.length - 1];
                }

                console.log('Processed filename:', imageUrl);
                return { image_url: imageUrl };
            },
        }),
        getImage: builder.query<string, string>({
            query: (imageUrl) => `/uploads/${imageUrl}`,
        }),
        deleteImage: builder.mutation<void, string>({
            query: (imageId) => ({
                url: `/uploads/${imageId}`,
                method: 'DELETE',
            }),
        }),
    }),
});

export const {
    useUploadImageMutation,
    useGetImageQuery,
    useDeleteImageMutation,
} = uploadApi;
