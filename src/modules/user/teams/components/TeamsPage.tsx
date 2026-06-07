import { FC, useState } from 'react';
import {
    CreateTeamButton, EmptyIcon, EmptyState, EmptyText,
    GameButton,
    GameFilter, JoinButton, TeamCard, TeamGame, TeamInfo, TeamMeta, TeamName,
    TeamsContainer,
    TeamsGrid, LoadingSpinner
} from "@/modules/user/teams/components/style.ts";
import { CreateTeamPage } from "@/modules/user/teams/components/сreateTeamPage/CreateTeamPage.tsx";
import { JoinTeamModal } from "@/modules/user/events/components/eventDetailsPage/modals/joinTeamModal/JoinTeamModal.tsx";
import { TeamDetailsPage } from "@/modules/user/teams/components/teamDetailsPage/TeamDetailsPage.tsx";
import { useGetAllTeamsQuery, useDeleteTeamMutation, TeamInfoResponse, gameToBackend } from "@/store/reducers/teamApi/teamApi.ts";
import { useGetCurrentUserQuery } from "@/store/reducers/userApi/userApi.ts";

interface TeamsPageProps {
    onTeamSelect?: (team: TeamInfoResponse) => void;
}

const games = ["Все", "Counter-Strike 2", "Dota 2", "Valorant", "Mobile Legend"];

const transformTeam = (apiTeam: TeamInfoResponse) => ({
    id: apiTeam.id,
    name: apiTeam.name,
    game: apiTeam.game,
    description: apiTeam.description,
    created: new Date(apiTeam.created_date).toLocaleDateString('ru-RU'),
    captain: apiTeam.captain_name,
    membersList: apiTeam.members?.map(m => m.username) || [],
    requirements: apiTeam.requirements || "Требования не указаны",
    contact: apiTeam.contacts || "Контактная информация не указана",
    rating: 4.5,
});

export const TeamsPage: FC<TeamsPageProps> = ({ onTeamSelect }) => {
    const [selectedGame, setSelectedGame] = useState("Все");
    const [selectedTeam, setSelectedTeam] = useState<TeamInfoResponse | null>(null);
    const [isCreating, setIsCreating] = useState(false);
    const [joinModal, setJoinModal] = useState({
        isOpen: false,
        teamId: 0,
        teamName: ''
    });

    const backendGame = selectedGame === "Все" ? undefined : gameToBackend[selectedGame];

    const { data: teamsData, isLoading, refetch } = useGetAllTeamsQuery(backendGame);
    const [deleteTeam] = useDeleteTeamMutation();
    const { data: currentUser } = useGetCurrentUserQuery();

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

    const handleTeamClick = (team: TeamInfoResponse) => {
        setSelectedTeam(team);
        if (onTeamSelect) {
            onTeamSelect(team);
        }
    };

    const handleBackToList = () => {
        setSelectedTeam(null);
        refetch();
    };

    const handleDeleteTeam = async (teamId: number) => {
        try {
            await deleteTeam(teamId).unwrap();
            alert('Команда успешно удалена!');
            refetch();
            setSelectedTeam(null);
        } catch (error) {
            console.error('Error deleting team:', error);
            alert('Ошибка при удалении команды');
        }
    };

    const handleCreateTeam = () => {
        setIsCreating(false);
        refetch();
        alert('Команда успешно создана!');
    };

    if (selectedTeam) {
        const transformedTeam = transformTeam(selectedTeam);
        return (
            <TeamDetailsPage
                team={transformedTeam}
                onBack={handleBackToList}
                onDelete={handleDeleteTeam}
                currentTeamId={selectedTeam.id}
                currentUserId={currentUser?.id}
                captainId={selectedTeam.captain_id}
            />
        );
    }

    if (isCreating) {
        return <CreateTeamPage onCreateTeam={handleCreateTeam} onCancel={handleCancelCreate} />;
    }

    if (isLoading) {
        return (
            <TeamsContainer>
                <LoadingSpinner>
                    <i className="fas fa-spinner fa-spin"></i>
                    <span>Загрузка команд...</span>
                </LoadingSpinner>
            </TeamsContainer>
        );
    }

    const teams = teamsData || [];

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

            {teams.length > 0 ? (
                <TeamsGrid>
                    {teams.map(team => (
                        <TeamCard key={team.id} onClick={() => handleTeamClick(team)}>
                            <TeamGame>{team.game}</TeamGame>
                            <TeamName>{team.name}</TeamName>
                            <TeamInfo>{team.description}</TeamInfo>
                            <TeamMeta>
                                <span>Участников: {team.members?.length || 0}</span>
                                <span>Создана: {new Date(team.created_date).toLocaleDateString('ru-RU')}</span>
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
