import {FC, useState} from 'react';
import {mockTeams} from "@/modules/user/teams/components/mockTeams.tsx";
import {
    CreateTeamButton, EmptyIcon, EmptyState, EmptyText,
    GameButton,
    GameFilter, JoinButton, TeamCard, TeamGame, TeamInfo, TeamMeta, TeamName,
    TeamsContainer,
    TeamsGrid
} from "@/modules/user/teams/components/style.ts";

interface Team {
    id: number;
    name: string;
    game: string;
    members: number;
    maxMembers: number;
    description: string;
    created: string;
}

const games = ["Все", "Counter-Strike 2", "Dota 2", "Valorant", "Mobile Legend"];

export const TeamsPage: FC = () => {
    const [selectedGame, setSelectedGame] = useState("Все");
    const [teams] = useState<Team[]>(mockTeams);

    const filteredTeams = selectedGame === "Все"
        ? teams
        : teams.filter(team => team.game === selectedGame);

    const handleJoinTeam = (teamId: number) => {
        alert(`Запрос на вступление в команду ${teamId} отправлен!`);
    };

    const handleCreateTeam = () => {
        alert("Переход к созданию команды");
    };

    return (
        <TeamsContainer>
            <GameFilter>
                {games.map(game => (
                    <GameButton
                        key={game}
                        isActive={selectedGame === game}
                        onClick={() => setSelectedGame(game)}
                    >
                        {game}
                    </GameButton>
                ))}
            </GameFilter>

            <CreateTeamButton onClick={handleCreateTeam}>
                Создать свою команду
            </CreateTeamButton>

            {filteredTeams.length > 0 ? (
                <TeamsGrid>
                    {filteredTeams.map(team => (
                        <TeamCard key={team.id}>
                            <TeamGame>{team.game}</TeamGame>
                            <TeamName>{team.name}</TeamName>
                            <TeamInfo>{team.description}</TeamInfo>
                            <TeamMeta>
                                <span>Участников: {team.members}/{team.maxMembers}</span>
                                <span>Создана: {team.created}</span>
                            </TeamMeta>
                            <JoinButton onClick={() => handleJoinTeam(team.id)}>
                                Вступить в команду
                            </JoinButton>
                        </TeamCard>
                    ))}
                </TeamsGrid>
            ) : (
                <EmptyState>
                    <EmptyIcon>
                        <i className="fas fa-users"></i>
                    </EmptyIcon>
                    <EmptyText>
                        {selectedGame === "Все"
                            ? "Пока нет созданных команд. Станьте первым, создав свою команду!"
                            : `Нет команд по игре ${selectedGame}. Станьте первым, создав команду!`}
                    </EmptyText>
                    <CreateTeamButton onClick={handleCreateTeam}>
                        Создать команду
                    </CreateTeamButton>
                </EmptyState>
            )}
        </TeamsContainer>
    );
};
