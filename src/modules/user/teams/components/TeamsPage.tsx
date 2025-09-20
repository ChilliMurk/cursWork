import {FC, useState} from 'react';
import {mockTeams, Team} from "@/modules/user/teams/components/mockTeams.tsx";
import {
    CreateTeamButton, EmptyIcon, EmptyState, EmptyText,
    GameButton,
    GameFilter, JoinButton, TeamCard, TeamGame, TeamInfo, TeamMeta, TeamName,
    TeamsContainer,
    TeamsGrid
} from "@/modules/user/teams/components/style.ts";
import {CreateTeamPage} from "@/modules/user/teams/components/сreateTeamPage/CreateTeamPage.tsx";
import {JoinTeamModal} from "@/modules/user/events/components/eventDetailsPage/modals/joinTeamModal/JoinTeamModal.tsx";

interface TeamsPageProps {
    onTeamSelect: (team: Team) => void;
}

const games = ["Все", "Counter-Strike 2", "Dota 2", "Valorant", "Mobile Legend"];

export const TeamsPage: FC<TeamsPageProps> = ({onTeamSelect}) => {
    const [selectedGame, setSelectedGame] = useState("Все");
    const [teams, setTeams] = useState<Team[]>(mockTeams);
    const [isCreating, setIsCreating] = useState(false);
    const [joinModal, setJoinModal] = useState({
        isOpen: false,
        teamId: 0,
        teamName: ''
    });

    const filteredTeams = selectedGame === "Все"
        ? teams
        : teams.filter(team => team.game === selectedGame);

    const handleJoinClick = (teamId: number, teamName: string, e: React.MouseEvent) => {
        e.stopPropagation();
        setJoinModal({
            isOpen: true,
            teamId,
            teamName
        });
    };

    const handleJoinTeam = (message: string) => {
        alert(`Запрос на вступление в команду "${joinModal.teamName}" отправлен!\nВаше сообщение: ${message}`);
        setJoinModal({
            isOpen: false,
            teamId: 0,
            teamName: ''
        });
    };

    const handleCloseModal = () => {
        setJoinModal({
            isOpen: false,
            teamId: 0,
            teamName: ''
        });
    };

    const handleCreateTeamClick = () => {
        setIsCreating(true);
    };

    const handleCancelCreate = () => {
        setIsCreating(false);
    };

    const handleCreateTeam = (teamData: Omit<Team, 'id' | 'created' | 'members' | 'membersList'>) => {
        const newTeam: Team = {
            ...teamData,
            id: Math.max(...teams.map(t => t.id)) + 1,
            created: "Только что",
            members: 1,
            membersList: ["CurrentUser"]
        };

        setTeams(prev => [...prev, newTeam]);
        setIsCreating(false);
        alert(`Команда "${newTeam.name}" успешно создана!`);
    };

    const handleTeamClick = (team: Team) => {
        onTeamSelect(team);
    };

    if (isCreating) {
        return <CreateTeamPage onCreateTeam={handleCreateTeam} onCancel={handleCancelCreate}/>;
    }

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

            <CreateTeamButton onClick={handleCreateTeamClick}>
                Создать свою команду
            </CreateTeamButton>

            <JoinTeamModal
                isOpen={joinModal.isOpen}
                teamName={joinModal.teamName}
                onClose={handleCloseModal}
                onJoin={handleJoinTeam}
            />

            {filteredTeams.length > 0 ? (
                <TeamsGrid>
                    {filteredTeams.map(team => (
                        <TeamCard key={team.id} onClick={() => handleTeamClick(team)}>
                            <TeamGame>{team.game}</TeamGame>
                            <TeamName>{team.name}</TeamName>
                            <TeamInfo>{team.description}</TeamInfo>
                            <TeamMeta>
                                <span>Участников: {team.members}/{team.maxMembers}</span>
                                <span>Создана: {team.created}</span>
                            </TeamMeta>
                            <JoinButton onClick={(e) => handleJoinClick(team.id, team.name, e)}>
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
                    <CreateTeamButton onClick={handleCreateTeamClick}>
                        Создать команду
                    </CreateTeamButton>
                </EmptyState>
            )}
        </TeamsContainer>
    );
};
