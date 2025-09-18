

interface Event {
    id: number;
    title: string;
    game: string;
    participants: number;
    maxParticipants: number;
    description: string;
    date: string;
    status: 'upcoming' | 'ongoing' | 'completed';
    prize: string;
}

export const mockEvents: Event[] = [
    {
        id: 1,
        title: "Еженедельный турнир по CS2",
        game: "Counter-Strike 2",
        participants: 24,
        maxParticipants: 32,
        description: "Еженедельный турнир для команд любого уровня. Призовой фонд распределяется между топ-3 командами.",
        date: "15.12.2023 в 19:00",
        status: "upcoming",
        prize: "10 000 ₽"
    },
    {
        id: 2,
        title: "Кубок Дракона по Dota 2",
        game: "Dota 2",
        participants: 40,
        maxParticipants: 48,
        description: "Крупный турнир по Dota 2 с призовым фондом. Регистрация открыта для всех желающих команд.",
        date: "20.12.2023 в 17:00",
        status: "upcoming",
        prize: "25 000 ₽"
    },
    {
        id: 3,
        title: "Valorant Open Cup",
        game: "Valorant",
        participants: 28,
        maxParticipants: 32,
        description: "Открытый кубок по Valorant. Участие индивидуальное, команды формируются автоматически.",
        date: "17.12.2023 в 16:00",
        status: "upcoming",
        prize: "15 000 ₽"
    },
    {
        id: 4,
        title: "Mobile Legend Championship",
        game: "Mobile Legend",
        participants: 36,
        maxParticipants: 40,
        description: "Чемпионат по Mobile Legend. Требуется предварительная регистрация команды из 5 человек.",
        date: "22.12.2023 в 15:00",
        status: "upcoming",
        prize: "20 000 ₽"
    },
    {
        id: 5,
        title: "Ежедневный CS2 матчмейкинг",
        game: "Counter-Strike 2",
        participants: 120,
        maxParticipants: 128,
        description: "Ежедневные матчи с автоматическим подбором команд по рейтингу. Награды за каждую победу.",
        date: "Ежедневно в 20:00",
        status: "ongoing",
        prize: "Бонусные очки"
    },
    {
        id: 6,
        title: "Осенний кубок по Dota 2",
        game: "Dota 2",
        participants: 32,
        maxParticipants: 32,
        description: "Турнир завершен. Поздравляем победителей! Следующий кубок уже скоро.",
        date: "05.12.2023",
        status: "completed",
        prize: "30 000 ₽"
    }
];
