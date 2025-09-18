interface UserProfile {
    id: number;
    username: string;
    email: string;
    avatar: string;
    level: number;
    experience: number;
    nextLevelExp: number;
    gamesPlayed: number;
    wins: number;
    losses: number;
    winRate: number;
    favoriteGame: string;
    joinDate: string;
    lastOnline: string;
    achievements: number;
    friends: number;
    bio: string;
    rank: string;
}

export const mockUser: UserProfile = {
    id: 1,
    username: "TestUser",
    email: "testuser@example.com",
    avatar: "TU",
    level: 15,
    experience: 3450,
    nextLevelExp: 4000,
    gamesPlayed: 142,
    wins: 89,
    losses: 53,
    winRate: 62.7,
    favoriteGame: "Counter-Strike 2",
    joinDate: "15.03.2023",
    lastOnline: "Сегодня, 14:30",
    achievements: 12,
    friends: 27,
    bio: "Опытный игрок с фокусом на тактические шутеры. Люблю командную игру и стратегическое планирование. Всегда открыт для новых знакомств и совместных игр!",
    rank: "Золотой ранг"
};

export const mockActivities = [
    {
        id: 1,
        icon: "fa-trophy",
        text: "Победа в матче Counter-Strike 2",
        date: "2 часа назад"
    },
    {
        id: 2,
        icon: "fa-users",
        text: "Вступил в команду 'Пушистые лапки'",
        date: "Вчера"
    },
    {
        id: 3,
        icon: "fa-calendar",
        text: "Зарегистрировался на турнир 'Еженедельный кубок'",
        date: "2 дня назад"
    },
    {
        id: 4,
        icon: "fa-level-up",
        text: "Достиг 15 уровня",
        date: "3 дня назад"
    }
];
