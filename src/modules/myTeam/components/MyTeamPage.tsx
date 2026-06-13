import {FC, useState} from 'react';
import {
    ActionButtonsContainer, CaptainBadge,
    CardTitle, ContactInfo,
    ContentCard,
    ContentGrid,
    CreateTeamButton,
    EditTeamButton, KickButton,
    LeaveTeamButton, ManageButton, ManageButtons,
    MemberAvatar,
    MemberItem, MemberName, MemberRole,
    MembersList,
    MetaItem,
    MetaLabel,
    MetaValue,
    MyTeamContainer,
    NoTeamContainer,
    NoTeamIcon,
    NoTeamText,
    NoTeamTitle,
    Rating, RequirementText,
    TeamDescription,
    TeamGameBadge,
    TeamHeaderSection,
    TeamInfoCard,
    TeamMetaGrid,
    TeamName,
    DeleteTeamButton
} from "@/modules/myTeam/components/style.ts";
import {TeamRequestsPage} from "@/modules/myTeam/components/teamRequestsPage/TeamRequestsPage.tsx";
import {DeleteConfirmModal} from "@/modules/user/teams/DeleteConfirmModal.tsx";
import {EditTeamPage} from "./editTeamPage/EditTeamPage";
import {
    useGetMyTeamQuery,
    useGetMyTeamMembersQuery,
    useLeaveTeamMutation,
    useKickMemberMutation,
    useDeleteMyTeamMutation,
    TeamInfoResponse,
    myTeamApi
} from "@/store/reducers/myTeamApi/myTeamApi";
import {useGetCurrentUserQuery} from "@/store/reducers/userApi/userApi";
import {UserShortInfoResponse} from "@/store/reducers/teamApi/teamApi";

interface TeamMemberUI {
    id: number;
    username: string;
}

interface UITeam {
    id: number;
    name: string;
    game: string;
    description: string;
    created: string;
    captain: string;
    captainId: number;
    membersList: TeamMemberUI[];
    requirements: string;
    contact: string;
    rating: number;
    isCaptain: boolean;
}

const transformTeamForUI = (apiTeam: TeamInfoResponse | null, currentUserId?: number, members?: UserShortInfoResponse[]): UITeam | null => {
    if (!apiTeam) return null;

    let membersList: TeamMemberUI[] = [];

    if (members && members.length > 0) {
        membersList = members.map((m) => ({
            id: m.id,
            username: m.username || 'Неизвестный'
        }));
    } else if (apiTeam.members && apiTeam.members.length > 0) {
        membersList = apiTeam.members.map((m) => ({
            id: m.id,
            username: m.username || 'Неизвестный'
        }));
    }

    return {
        id: apiTeam.id,
        name: apiTeam.name,
        game: apiTeam.game,
        description: apiTeam.description,
        created: new Date(apiTeam.created_date).toLocaleDateString('ru-RU'),
        captain: apiTeam.captain_name,
        captainId: apiTeam.captain_id,
        membersList: membersList,
        requirements: apiTeam.requirements || "Требования не указаны",
        contact: apiTeam.contacts || "Контактная информация не указана",
        rating: 4.5,
        isCaptain: currentUserId === apiTeam.captain_id
    };
};

interface MyTeamPageProps {
    onTeamDeleted?: () => void;
}

export const MyTeamPage: FC<MyTeamPageProps> = ({onTeamDeleted}) => {
    const {data: currentUser, refetch: refetchUser} = useGetCurrentUserQuery();
    const {data: apiTeam, isLoading, refetch: refetchMyTeam} = useGetMyTeamQuery();
    const {data: teamMembers, isLoading: membersLoading, refetch: refetchMembers} = useGetMyTeamMembersQuery();
    const [leaveTeam, {isLoading: isLeaving}] = useLeaveTeamMutation();
    const [kickMember, {isLoading: isKicking}] = useKickMemberMutation();
    const [deleteMyTeam] = useDeleteMyTeamMutation();

    const [showRequests, setShowRequests] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showEditMode, setShowEditMode] = useState(false);

    //const memberUIList: TeamMemberUI[] = teamMembers?.map(m => ({ id: m.id, username: m.username })) || [];
    const team = transformTeamForUI(apiTeam || null, currentUser?.id, teamMembers);
    const isCaptain = team?.isCaptain || false;

    const refreshData = async () => {
        myTeamApi.util.invalidateTags(['MyTeam', 'MyTeamMembers']);
        await refetchMyTeam();
        await refetchMembers();
        await refetchUser();
    };

    const handleEditTeam = () => {
        setShowEditMode(true);
    };

    const handleSaveTeam = async () => {
        setShowEditMode(false);
        await refreshData();
    };

    const handleLeaveTeam = async () => {
        if (window.confirm("Вы уверены, что хотите покинуть команду?")) {
            try {
                await leaveTeam().unwrap();
                alert("Вы покинули команду");
                await refreshData();
                if (onTeamDeleted) onTeamDeleted();
            } catch (error: any) {
                console.error('Error leaving team:', error);
                alert(error.data?.message || "Ошибка при выходе из команды");
            }
        }
    };

    const handleDeleteTeam = () => {
        setShowDeleteModal(true);
    };

    const handleConfirmDelete = async () => {
        if (!team) return;

        try {
            await deleteMyTeam().unwrap();
            alert("Команда успешно удалена");
            setShowDeleteModal(false);
            setShowEditMode(false);
            setShowRequests(false);
            await refreshData();
            if (onTeamDeleted) onTeamDeleted();
        } catch (error: any) {
            console.error('Error deleting team:', error);
            alert(error.data?.message || "Ошибка при удалении команды");
        }
    };

    const handleCancelDelete = () => {
        setShowDeleteModal(false);
    };

    const handleKickMember = async (userId: number, username: string) => {
        if (window.confirm(`Вы уверены, что хотите исключить ${username} из команды?`)) {
            try {
                await kickMember(userId).unwrap();
                alert(`${username} исключен из команды`);
                await refreshData();
            } catch (error: any) {
                console.error('Error kicking member:', error);
                alert(error.data?.message || "Ошибка при исключении участника");
            }
        }
    };

    const getFirstLetter = (username: string): string => {
        if (!username || username.length === 0) return '?';
        return username.charAt(0).toUpperCase();
    };

    if (showEditMode && team) {
        return (
            <EditTeamPage
                team={team}
                onSave={handleSaveTeam}
                onCancel={() => setShowEditMode(false)}
            />
        );
    }

    if (showRequests && team) {
        return (
            <TeamRequestsPage
                teamName={team.name}
                onBack={() => setShowRequests(false)}
                onRequestAccepted={async () => {
                    console.log('Заявка принята, обновляем данные');
                    await refreshData();
                }}
            />
        );
    }

    if (isLoading || membersLoading) {
        return (
            <MyTeamContainer>
                <div style={{textAlign: 'center', padding: '50px', color: '#00e6ff'}}>
                    <i className="fas fa-spinner fa-spin" style={{fontSize: '2rem'}}></i>
                    <p>Загрузка информации о команде...</p>
                </div>
            </MyTeamContainer>
        );
    }

    if (!team || (apiTeam === null && !isLoading)) {
        return (
            <MyTeamContainer>
                <NoTeamContainer>
                    <NoTeamIcon>
                        <i className="fas fa-users-slash"></i>
                    </NoTeamIcon>
                    <NoTeamTitle>Вы пока не состоите в команде</NoTeamTitle>
                    <NoTeamText>
                        Присоединитесь к существующей команде или создайте свою собственную,<br/>
                        чтобы начать путь к киберспортивным вершинам вместе с единомышленниками!
                    </NoTeamText>
                    <CreateTeamButton onClick={() => alert("Переход к созданию команды")}>
                        <i className="fas fa-plus"></i>
                        Создать команду
                    </CreateTeamButton>
                </NoTeamContainer>
            </MyTeamContainer>
        );
    }

    const membersCount = team.membersList.length;

    return (
        <>
            <MyTeamContainer>
                <TeamInfoCard>
                    <TeamHeaderSection>
                        <TeamGameBadge>{team.game}</TeamGameBadge>
                        <TeamName>{team.name}</TeamName>
                        <TeamDescription>{team.description}</TeamDescription>

                        <TeamMetaGrid>
                            <MetaItem>
                                <MetaLabel>Участников</MetaLabel>
                                <MetaValue>{membersCount}</MetaValue>
                            </MetaItem>

                            <MetaItem>
                                <MetaLabel>Рейтинг</MetaLabel>
                                <Rating>
                                    <i className="fas fa-star"></i>
                                    <span>{team.rating}</span>
                                </Rating>
                            </MetaItem>

                            <MetaItem>
                                <MetaLabel>Капитан</MetaLabel>
                                <MetaValue>{team.captain}</MetaValue>
                            </MetaItem>

                            <MetaItem>
                                <MetaLabel>Создана</MetaLabel>
                                <MetaValue>{team.created}</MetaValue>
                            </MetaItem>
                        </TeamMetaGrid>

                        <ActionButtonsContainer>
                            {isCaptain && (
                                <>
                                    <EditTeamButton onClick={handleEditTeam}>
                                        <i className="fas fa-edit"></i>
                                        Редактировать команду
                                    </EditTeamButton>
                                    <DeleteTeamButton onClick={handleDeleteTeam}>
                                        <i className="fas fa-trash-alt"></i>
                                        Удалить команду
                                    </DeleteTeamButton>
                                </>
                            )}
                            <LeaveTeamButton onClick={handleLeaveTeam} disabled={isLeaving}>
                                <i className="fas fa-sign-out-alt"></i>
                                {isLeaving ? 'Выход...' : 'Покинуть команду'}
                            </LeaveTeamButton>
                        </ActionButtonsContainer>
                    </TeamHeaderSection>

                    <ContentGrid>
                        <ContentCard>
                            <CardTitle>
                                <i className="fas fa-users"></i>
                                Участники команды ({membersCount})
                            </CardTitle>

                            <MembersList>
                                {team.membersList.length === 0 ? (
                                    <div style={{textAlign: 'center', padding: '20px', color: '#a0a0a0'}}>
                                        Нет участников
                                    </div>
                                ) : (
                                    team.membersList.map((member: TeamMemberUI) => (
                                        <MemberItem key={member.id}>
                                            <MemberAvatar>
                                                {getFirstLetter(member.username)}
                                            </MemberAvatar>
                                            <MemberName className={member.username === team.captain ? 'captain' : ''}>
                                                {member.username}
                                                {member.username === team.captain && (
                                                    <CaptainBadge>
                                                        <i className="fas fa-crown"></i> Капитан
                                                    </CaptainBadge>
                                                )}
                                            </MemberName>
                                            <MemberRole>
                                                {member.username === team.captain ? 'Лидер' : 'Игрок'}
                                            </MemberRole>
                                            {isCaptain && member.username !== team.captain && (
                                                <KickButton
                                                    onClick={() => handleKickMember(member.id, member.username)}
                                                    disabled={isKicking}
                                                >
                                                    <i className="fas fa-user-minus"></i>
                                                </KickButton>
                                            )}
                                        </MemberItem>
                                    ))
                                )}
                            </MembersList>

                            {isCaptain && (
                                <ManageButtons>
                                    <ManageButton onClick={() => setShowRequests(true)}>
                                        <i className="fas fa-users"></i>
                                        Управление заявками
                                    </ManageButton>
                                </ManageButtons>
                            )}
                        </ContentCard>

                        <ContentCard>
                            <CardTitle>
                                <i className="fas fa-list-alt"></i>
                                Требования
                            </CardTitle>

                            <RequirementText>{team.requirements}</RequirementText>
                        </ContentCard>

                        <ContentCard>
                            <CardTitle>
                                <i className="fas fa-envelope"></i>
                                Контакты
                            </CardTitle>

                            <ContactInfo>
                                {team.contact}
                            </ContactInfo>

                            {isCaptain && (
                                <div style={{
                                    marginTop: '20px',
                                    padding: '15px',
                                    background: 'rgba(0, 180, 216, 0.1)',
                                    borderRadius: '8px'
                                }}>
                                    <div style={{color: '#00e6ff', fontWeight: '600', marginBottom: '10px'}}>
                                        <i className="fas fa-info-circle"></i> Для капитана
                                    </div>
                                    <div style={{color: '#e0e0e0', fontSize: '0.9rem'}}>
                                        Вы можете изменить контактную информацию в настройках команды
                                    </div>
                                </div>
                            )}
                        </ContentCard>
                    </ContentGrid>
                </TeamInfoCard>
            </MyTeamContainer>

            <DeleteConfirmModal
                isOpen={showDeleteModal}
                teamName={team.name}
                onConfirm={handleConfirmDelete}
                onCancel={handleCancelDelete}
            />
        </>
    );
};
