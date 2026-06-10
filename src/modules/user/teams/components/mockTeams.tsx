export interface Team {
    id: number;
    name: string;
    game: string;
    description: string;
    created: string;
    captain: string;
    membersList: string[];
    requirements: string;
    contact: string;
    rating: number;
}

export const mockTeams: Team[] = [
    {
        id: 1,
        name: "Пушистые лапки",
        game: "Counter-Strike 2",
        description: "Комната для начинающих и опытных игроков. Ищем активных участников для участия в турнирах.",
        created: "2 дня назад",
        captain: "User123",
        membersList: ["User123", "Player456", "Gamer789"],
        requirements: "Опыт игры от 6 месяцев, наличие микрофона, готовность к регулярным тренировкам",
        contact: "Discord: User123#1234",
        rating: 4.8
    },
    {
        id: 2,
        name: "Драконы Севера",
        game: "Dota 2",
        description: "Серьёзная команда с опытом участия в онлайн-турнирах. Требуются позиции 4 и 5.",
        created: "5 дней назад",
        captain: "DragonLord",
        membersList: ["DragonLord", "IceMage", "FireWarrior", "WindRanger"],
        requirements: "MMR от 4000, знание меты, опыт командной игры",
        contact: "Telegram: @DragonLord",
        rating: 4.5
    },
    {
        id: 3,
        name: "Тигры Ночи",
        game: "Valorant",
        description: "Новая команда ищет игроков для участия в лигах и развития вместе.",
        created: "1 день назад",
        captain: "ShadowHunter",
        membersList: ["ShadowHunter", "NightStalker", "MoonRider"],
        requirements: "Ранг Platinum и выше, знание карт, наличие микрофона",
        contact: "Discord: ShadowHunter#5678",
        rating: 4.2
    },
    {
        id: 4,
        name: "Фениксы",
        game: "Mobile Legend",
        description: "Опытная команда ищет одного игрока для завершения состава перед турниром.",
        created: "3 дня назад",
        captain: "PhoenixKing",
        membersList: ["PhoenixKing", "FireWing", "FlameDancer", "AshBringer"],
        requirements: "Ранг Mythic, опыт турнирной игры",
        contact: "Telegram: @PhoenixKing",
        rating: 4.7
    },
    {
        id: 5,
        name: "Волки Одиночки",
        game: "Counter-Strike 2",
        description: "Собираем команду мечты. Присоединяйтесь, если готовы к регулярным тренировкам.",
        created: "неделю назад",
        captain: "LoneWolf",
        membersList: ["LoneWolf", "SilentHunter"],
        requirements: "Ранг Master Guardian и выше, знание тактик, командный игрок",
        contact: "Discord: LoneWolf#9012",
        rating: 4.3
    },
];
