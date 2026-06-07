export interface ServerEvent {
    id: number;
    title: string;
    description: string;
}

export interface DisplayEvent extends ServerEvent {
    game: string;
    participants: number;
    maxParticipants: number;
    date: string;
    status: 'upcoming' | 'ongoing' | 'completed';
    prize: string;
}

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
