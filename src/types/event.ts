// Базовый интерфейс для данных с сервера
export interface ServerEvent {
    id: number;
    title: string;
    description: string;
}

// Полный интерфейс для отображения на фронтенде
export interface DisplayEvent extends ServerEvent {
    game: string;
    participants: number;
    maxParticipants: number;
    date: string;
    status: 'upcoming' | 'ongoing' | 'completed';
    prize: string;
}

// Функция для преобразования серверных данных в отображаемые
export const transformToDisplayEvent = (serverEvent: ServerEvent): DisplayEvent => {
    return {
        ...serverEvent,
        game: "Counter-Strike 2", // Здесь может быть логика определения игры
        participants: 0,
        maxParticipants: 10,
        date: new Date().toLocaleDateString(),
        status: 'upcoming',
        prize: '0 ₽'
    };
};