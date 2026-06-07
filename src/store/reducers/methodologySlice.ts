import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Methodology } from '@/store/reducers/methodologyApi/methodologyApi.ts';

interface MethodologyState {
    methodologies: Methodology[];
    selectedMethodology: Methodology | null;
    isLoading: boolean;
    isMethodologyLoading: boolean;
    isCreating: boolean;
    isUpdating: boolean;
    error: string | null;
    filters: {
        category: string;
        level: string;
    };
}

const initialState: MethodologyState = {
    methodologies: [],
    selectedMethodology: null,
    isLoading: false,
    isMethodologyLoading: false,
    isCreating: false,
    isUpdating: false,
    error: null,
    filters: {
        category: 'Все',
        level: 'Все',
    },
};

export const methodologySlice = createSlice({
    name: 'methodologies',
    initialState,
    reducers: {
        // Загрузка списка методичек
        fetchMethodologiesStart: (state) => {
            state.isLoading = true;
            state.error = null;
        },
        fetchMethodologiesSuccess: (state, action: PayloadAction<Methodology[]>) => {
            state.isLoading = false;
            state.methodologies = action.payload;
            state.error = null;
        },
        fetchMethodologiesFailure: (state, action: PayloadAction<string>) => {
            state.isLoading = false;
            state.error = action.payload;
        },

        // Загрузка одной методички
        fetchMethodologyStart: (state) => {
            state.isMethodologyLoading = true;
            state.error = null;
        },
        fetchMethodologySuccess: (state, action: PayloadAction<Methodology>) => {
            state.isMethodologyLoading = false;
            state.selectedMethodology = action.payload;
            state.error = null;
        },
        fetchMethodologyFailure: (state, action: PayloadAction<string>) => {
            state.isMethodologyLoading = false;
            state.error = action.payload;
        },

        // Создание методички
        createMethodologyStart: (state) => {
            state.isCreating = true;
            state.error = null;
        },
        createMethodologySuccess: (state, action: PayloadAction<Methodology>) => {
            state.isCreating = false;
            state.methodologies.push(action.payload);
            state.error = null;
        },
        createMethodologyFailure: (state, action: PayloadAction<string>) => {
            state.isCreating = false;
            state.error = action.payload;
        },

        // Обновление методички
        updateMethodologyStart: (state) => {
            state.isUpdating = true;
            state.error = null;
        },
        updateMethodologySuccess: (state, action: PayloadAction<Methodology>) => {
            state.isUpdating = false;
            const index = state.methodologies.findIndex(m => m.id === action.payload.id);
            if (index !== -1) {
                state.methodologies[index] = action.payload;
            }
            if (state.selectedMethodology?.id === action.payload.id) {
                state.selectedMethodology = action.payload;
            }
            state.error = null;
        },
        updateMethodologyFailure: (state, action: PayloadAction<string>) => {
            state.isUpdating = false;
            state.error = action.payload;
        },

        // Удаление методички
        removeMethodologyStart: (state) => {
            state.isUpdating = true;
            state.error = null;
        },
        removeMethodologySuccess: (state, action: PayloadAction<number>) => {
            state.isUpdating = false;
            state.methodologies = state.methodologies.filter(m => m.id !== action.payload);
            if (state.selectedMethodology?.id === action.payload) {
                state.selectedMethodology = null;
            }
            state.error = null;
        },
        removeMethodologyFailure: (state, action: PayloadAction<string>) => {
            state.isUpdating = false;
            state.error = action.payload;
        },

        // Выбор методички для просмотра
        selectMethodology: (state, action: PayloadAction<Methodology | null>) => {
            state.selectedMethodology = action.payload;
        },

        // Установка фильтров
        setMethodologyFilters: (state, action: PayloadAction<Partial<MethodologyState['filters']>>) => {
            state.filters = { ...state.filters, ...action.payload };
        },

        // Очистка ошибки
        clearMethodologyError: (state) => {
            state.error = null;
        },

        // Сброс состояния
        resetMethodologiesState: () => initialState,
    },
});

export const {
    fetchMethodologiesStart,
    fetchMethodologiesSuccess,
    fetchMethodologiesFailure,
    fetchMethodologyStart,
    fetchMethodologySuccess,
    fetchMethodologyFailure,
    createMethodologyStart,
    createMethodologySuccess,
    createMethodologyFailure,
    updateMethodologyStart,
    updateMethodologySuccess,
    updateMethodologyFailure,
    removeMethodologyStart,
    removeMethodologySuccess,
    removeMethodologyFailure,
    selectMethodology,
    setMethodologyFilters,
    clearMethodologyError,
    resetMethodologiesState,
} = methodologySlice.actions;

export const methodologyReducer = methodologySlice.reducer;
