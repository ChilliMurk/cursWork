export interface Team {
    id: number;
    name: string;
    game: string;
    members: number;
    maxMembers: number;
    description: string;
    created: string;
    captain: string;
    membersList: string[];
    achievements: string[];
    requirements: string;
    contact: string;
    rating: number;
    practiceSchedule: string;
    lookingFor: string[];
}

export const mockTeams: Team[] = [
    {
        id: 1,
        name: "Пушистые лапки",
        game: "Counter-Strike 2",
        members: 3,
        maxMembers: 5,
        description: "Комната для начинающих и опытных игроков. Ищем активных участников для участия в турнирах.",
        created: "2 дня назад",
        captain: "User123",
        membersList: ["User123", "Player456", "Gamer789"],
        achievements: ["Победители недельного турнира", "Топ-5 в региональном чемпионате"],
        requirements: "Опыт игры от 6 месяцев, наличие микрофона, готовность к регулярным тренировкам",
        contact: "Discord: User123#1234",
        rating: 4.8,
        practiceSchedule: "Пн, Ср, Пт с 19:00 до 21:00",
        lookingFor: ["Rifler", "AWPer", "Support"]
    },
    {
        id: 2,
        name: "Драконы Севера",
        game: "Dota 2",
        members: 4,
        maxMembers: 5,
        description: "Серьёзная команда с опытом участия в онлайн-турнирах. Требуются позиции 4 и 5.",
        created: "5 дней назад",
        captain: "DragonLord",
        membersList: ["DragonLord", "IceMage", "FireWarrior", "WindRanger"],
        achievements: ["Финалисты Autumn Cup 2023", "Участники DreamLeague Qualifiers"],
        requirements: "MMR от 4000, знание меты, опыт командной игры",
        contact: "Telegram: @DragonLord",
        rating: 4.5,
        practiceSchedule: "Вт, Чт, Сб с 20:00 до 23:00",
        lookingFor: ["Support", "Hard Support"]
    },
    {
        id: 3,
        name: "Тигры Ночи",
        game: "Valorant",
        members: 2,
        maxMembers: 5,
        description: "Новая команда ищет игроков для участия в лигах и развития вместе.",
        created: "1 день назад",
        captain: "DragonLord",
        membersList: ["DragonLord", "IceMage", "FireWarrior", "WindRanger"],
        achievements: ["Финалисты Autumn Cup 2023", "Участники DreamLeague Qualifiers"],
        requirements: "MMR от 4000, знание меты, опыт командной игры",
        contact: "Telegram: @DragonLord",
        rating: 4.5,
        practiceSchedule: "Вт, Чт, Сб с 20:00 до 23:00",
        lookingFor: ["Support", "Hard Support"]
    },
    {
        id: 4,
        name: "Фениксы",
        game: "Mobile Legend",
        members: 4,
        maxMembers: 5,
        description: "Опытная команда ищет одного игрока для завершения состава перед турниром.",
        created: "3 дня назад",
        captain: "DragonLord",
        membersList: ["DragonLord", "IceMage", "FireWarrior", "WindRanger"],
        achievements: ["Финалисты Autumn Cup 2023", "Участники DreamLeague Qualifiers"],
        requirements: "MMR от 4000, знание меты, опыт командной игры",
        contact: "Telegram: @Tiger",
        rating: 4.7,
        practiceSchedule: "Вт, Пт, Сб с 20:00 до 23:00",
        lookingFor: ["Rifler", "AWPer", "Support"]
    },
    {
        id: 5,
        name: "Волки Одиночки",
        game: "Counter-Strike 2",
        members: 2,
        maxMembers: 5,
        description: "Собираем команду мечты. Присоединяйтесь, если готовы к регулярным тренировкам.",
        created: "неделю назад",
        captain: "DragonLord",
        membersList: ["DragonLord", "IceMage", "FireWarrior", "WindRanger"],
        achievements: ["Финалисты Autumn Cup 2023", "Участники DreamLeague Qualifiers"],
        requirements: "MMR от 4000, знание меты, опыт командной игры",
        contact: "Telegram: @Tiger",
        rating: 4.7,
        practiceSchedule: "Вт, Пт, Сб с 20:00 до 23:00",
        lookingFor: ["Rifler", "AWPer", "Support"]
    },
];
