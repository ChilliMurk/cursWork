import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Event } from '@/store/reducers/eventApi/eventApi.ts';

interface EventState {
    events: Event[];
    selectedEvent: Event | null;
    isLoading: boolean;        // для загрузки списка
    isEventLoading: boolean;    // для загрузки конкретного события
    isCreating: boolean;        // для создания
    isUpdating: boolean;        // для обновления
    isParticipating: boolean;   // для участия
    error: string | null;
    filters: {
        game: string;
        status: string;
    };
}

const initialState: EventState = {
    events: [],
    selectedEvent: null,
    isLoading: false,
    isEventLoading: false,
    isCreating: false,
    isUpdating: false,
    isParticipating: false,
    error: null,
    filters: {
        game: 'Все',
        status: 'Все',
    },
};

export const eventSlice = createSlice({
    name: 'events',
    initialState,
    reducers: {
        // Загрузка списка событий
        fetchEventsStart: (state) => {
            state.isLoading = true;
            state.error = null;
        },
        fetchEventsSuccess: (state, action: PayloadAction<Event[]>) => {
            state.isLoading = false;
            state.events = action.payload;
            state.error = null;
        },
        fetchEventsFailure: (state, action: PayloadAction<string>) => {
            state.isLoading = false;
            state.error = action.payload;
        },

        // Загрузка одного события
        fetchEventStart: (state) => {
            state.isEventLoading = true;
            state.error = null;
        },
        fetchEventSuccess: (state, action: PayloadAction<Event>) => {
            state.isEventLoading = false;
            state.selectedEvent = action.payload;
            state.error = null;
        },
        fetchEventFailure: (state, action: PayloadAction<string>) => {
            state.isEventLoading = false;
            state.error = action.payload;
        },

        // Создание события
        createEventStart: (state) => {
            state.isCreating = true;
            state.error = null;
        },
        createEventSuccess: (state, action: PayloadAction<Event>) => {
            state.isCreating = false;
            state.events.push(action.payload);
            state.error = null;
        },
        createEventFailure: (state, action: PayloadAction<string>) => {
            state.isCreating = false;
            state.error = action.payload;
        },

        // Обновление события
        updateEventStart: (state) => {
            state.isUpdating = true;
            state.error = null;
        },
        updateEventSuccess: (state, action: PayloadAction<Event>) => {
            state.isUpdating = false;
            const index = state.events.findIndex(e => e.id === action.payload.id);
            if (index !== -1) {
                state.events[index] = action.payload;
            }
            if (state.selectedEvent?.id === action.payload.id) {
                state.selectedEvent = action.payload;
            }
            state.error = null;
        },
        updateEventFailure: (state, action: PayloadAction<string>) => {
            state.isUpdating = false;
            state.error = action.payload;
        },

        // Удаление события
        removeEventStart: (state) => {
            state.isUpdating = true;
            state.error = null;
        },
        removeEventSuccess: (state, action: PayloadAction<number>) => {
            state.isUpdating = false;
            state.events = state.events.filter(e => e.id !== action.payload);
            if (state.selectedEvent?.id === action.payload) {
                state.selectedEvent = null;
            }
            state.error = null;
        },
        removeEventFailure: (state, action: PayloadAction<string>) => {
            state.isUpdating = false;
            state.error = action.payload;
        },

        // Участие в событии
        toggleParticipateStart: (state) => {
            state.isParticipating = true;
            state.error = null;
        },
        toggleParticipateSuccess: (state, action: PayloadAction<{ eventId: number; isParticipating: boolean }>) => {
            state.isParticipating = false;
            const event = state.events.find(e => e.id === action.payload.eventId);
            if (event) {
                if (action.payload.isParticipating) {
                    event.participants += 1;
                } else {
                    event.participants = Math.max(0, event.participants - 1);
                }
            }
            state.error = null;
        },
        toggleParticipateFailure: (state, action: PayloadAction<string>) => {
            state.isParticipating = false;
            state.error = action.payload;
        },

        // Выбор события для просмотра (без загрузки)
        selectEvent: (state, action: PayloadAction<Event | null>) => {
            state.selectedEvent = action.payload;
        },

        // Установка фильтров
        setFilters: (state, action: PayloadAction<Partial<EventState['filters']>>) => {
            state.filters = { ...state.filters, ...action.payload };
        },

        // Очистка ошибки
        clearError: (state) => {
            state.error = null;
        },

        // Сброс состояния
        resetEventsState: () => initialState,
    },
});

export const {
    // Загрузка списка
    fetchEventsStart,
    fetchEventsSuccess,
    fetchEventsFailure,

    // Загрузка одного
    fetchEventStart,
    fetchEventSuccess,
    fetchEventFailure,

    // Создание
    createEventStart,
    createEventSuccess,
    createEventFailure,

    // Обновление
    updateEventStart,
    updateEventSuccess,
    updateEventFailure,

    // Удаление
    removeEventStart,
    removeEventSuccess,
    removeEventFailure,

    // Участие
    toggleParticipateStart,
    toggleParticipateSuccess,
    toggleParticipateFailure,

    // Базовые операции
    selectEvent,
    setFilters,
    clearError,
    resetEventsState,
} = eventSlice.actions;

export const eventReducer = eventSlice.reducer;
