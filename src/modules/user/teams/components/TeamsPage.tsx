import {FC, useState, useCallback} from 'react';
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
import {getTeamMembersCount} from "@/modules/user/teams/hook/getTeamMembersCount.tsx";
import {TeamDetailsPage} from "@/modules/user/teams/components/teamDetailsPage/TeamDetailsPage.tsx";

interface TeamsPageProps {
    onTeamSelect?: (team: Team) => void;
}

const games = ["Все", "Counter-Strike 2", "Dota 2", "Valorant", "Mobile Legend"];

export const TeamsPage: FC<TeamsPageProps> = ({onTeamSelect}) => {
    const [selectedGame, setSelectedGame] = useState("Все");
    const [teams, setTeams] = useState<Team[]>(() => {
        const savedTeams = localStorage.getItem('teams');
        if (savedTeams) {
            try {
                return JSON.parse(savedTeams);
            } catch {
                return [...mockTeams];
            }
        }
        return [...mockTeams];
    });
    const [isCreating, setIsCreating] = useState(false);
    const [selectedTeam, setSelectedTeam] = useState<Team | null>(null);
    const [joinModal, setJoinModal] = useState({
        isOpen: false,
        teamId: 0,
        teamName: ''
    });

    const saveTeamsToLocalStorage = useCallback((newTeams: Team[]) => {
        localStorage.setItem('teams', JSON.stringify(newTeams));
    }, []);

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

    const handleCreateTeam = (teamData: Omit<Team, 'id' | 'created' | 'membersList'>) => {
        // TODO: Добавить валидацию позже
        // if (!teamData.name.trim()) {
        //     alert("Название команды обязательно");
        //     return;
        // }
        // if (!teamData.game) {
        //     alert("Выберите игру");
        //     return;
        // }

        const newTeam: Team = {
            ...teamData,
            id: Math.max(...teams.map(t => t.id), 0) + 1,
            created: "Только что",
            membersList: ["CurrentUser"],
            captain: "CurrentUser"
        };

        const updatedTeams = [...teams, newTeam];
        setTeams(updatedTeams);
        saveTeamsToLocalStorage(updatedTeams);
        setIsCreating(false);
        alert(`Команда "${newTeam.name}" успешно создана!`);
    };

    const handleTeamClick = (team: Team) => {
        setSelectedTeam(team);
        if (onTeamSelect) {
            onTeamSelect(team);
        }
    };

    const handleBackToList = () => {
        setSelectedTeam(null);
    };

    const handleDeleteTeam = useCallback((teamId: number) => {
        // TODO: Добавить проверку прав позже
        // const team = teams.find(t => t.id === teamId);
        // if (team?.captain !== "CurrentUser") {
        //     alert("Только капитан может удалить команду");
        //     return;
        // }

        const deletedTeam = teams.find(t => t.id === teamId);
        const updatedTeams = teams.filter(team => team.id !== teamId);

        setTeams(updatedTeams);
        saveTeamsToLocalStorage(updatedTeams);

        // Сообщение об успешном удалении
        setTimeout(() => {
            alert(`Команда "${deletedTeam?.name}" успешно удалена!`);
        }, 100);

        // Возвращаемся к списку команд
        setSelectedTeam(null);
    }, [teams, saveTeamsToLocalStorage]);

    if (selectedTeam) {
        return (
            <TeamDetailsPage
                team={selectedTeam}
                onBack={handleBackToList}
                onDelete={handleDeleteTeam}
                currentUser="CurrentUser"
            />
        );
    }

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
                                <span>Участников: {getTeamMembersCount(team)}</span>
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
