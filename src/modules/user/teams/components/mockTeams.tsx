interface Team {
    id: number;
    name: string;
    game: string;
    members: number;
    maxMembers: number;
    description: string;
    created: string;
}

export const mockTeams: Team[] = [
    {
        id: 1,
        name: "Пушистые лапки",
        game: "Counter-Strike 2",
        members: 3,
        maxMembers: 5,
        description: "Комната для начинающих и опытных игроков. Ищем активных участников для участия в турнирах.",
        created: "2 дня назад"
    },
    {
        id: 2,
        name: "Драконы Севера",
        game: "Dota 2",
        members: 4,
        maxMembers: 5,
        description: "Серьёзная команда с опытом участия в онлайн-турнирах. Требуются позиции 4 и 5.",
        created: "5 дней назад"
    },
    {
        id: 3,
        name: "Тигры Ночи",
        game: "Valorant",
        members: 2,
        maxMembers: 5,
        description: "Новая команда ищет игроков для участия в лигах и развития вместе.",
        created: "1 день назад"
    },
    {
        id: 4,
        name: "Фениксы",
        game: "Mobile Legend",
        members: 4,
        maxMembers: 5,
        description: "Опытная команда ищет одного игрока для завершения состава перед турниром.",
        created: "3 дня назад"
    },
    {
        id: 5,
        name: "Волки Одиночки",
        game: "Counter-Strike 2",
        members: 2,
        maxMembers: 5,
        description: "Собираем команду мечты. Присоединяйтесь, если готовы к регулярным тренировкам.",
        created: "неделю назад"
    },
    {
        id: 6,
        name: "Берсерки",
        game: "Dota 2",
        members: 5,
        maxMembers: 5,
        description: "Полный состав. Возможно рассмотрение запасных игроков.",
        created: "2 недели назад"
    }
];
