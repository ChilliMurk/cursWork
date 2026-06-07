import { FC, useState, useEffect } from 'react';
import {Team} from "@/modules/user/teams/components/mockTeams.tsx";
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

const mockUserTeam: Team = {
    id: 1,
    name: "Пушистые лапки",
    game: "Counter-Strike 2",
    description: "Команда для начинающих и опытных игроков. Участвуем в турнирах и регулярно тренируемся.",
    created: "15 марта 2024",
    captain: "CurrentUser",
    membersList: ["CurrentUser", "Player456", "Gamer789", "ProGamer", "NewRecruit"],
    requirements: "Опыт игры от 6 месяцев, наличие микрофона, готовность к регулярным тренировкам",
    contact: "Discord: team.leader#1234 | Telegram: @team_channel",
    rating: 4.8
};

const HAS_TEAM = true;
const IS_CAPTAIN = true;

interface MyTeamPageProps {
    onTeamDeleted?: () => void;
}

export const MyTeamPage: FC<MyTeamPageProps> = ({ onTeamDeleted }) => {
    const [team, setTeam] = useState<Team | null>(null);
    const [isCaptain, setIsCaptain] = useState(false);
    const [loading, setLoading] = useState(true);
    const [showRequests, setShowRequests] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showEditMode, setShowEditMode] = useState(false);

    useEffect(() => {
        const loadTeamData = () => {
            setLoading(true);
            setTimeout(() => {
                if (HAS_TEAM) {
                    setTeam(mockUserTeam);
                    setIsCaptain(IS_CAPTAIN);
                } else {
                    setTeam(null);
                    setIsCaptain(false);
                }
                setLoading(false);
            }, 500);
        };

        loadTeamData();
    }, []);

    const handleEditTeam = () => {
        setShowEditMode(true);
    };

    const handleSaveTeam = (updatedTeam: Team) => {
        setTeam(updatedTeam);
        setShowEditMode(false);
        alert(`Команда "${updatedTeam.name}" успешно обновлена!`);
    };

    const handleLeaveTeam = () => {
        if (window.confirm("Вы уверены, что хотите покинуть команду?")) {
            alert("Вы покинули команду");
            setTeam(null);
            setIsCaptain(false);
        }
    };

    const handleDeleteTeam = () => {
        setShowDeleteModal(true);
    };

    const handleConfirmDelete = async () => {
        if (!team) return;

        await new Promise(resolve => setTimeout(resolve, 500));

        setTeam(null);
        setIsCaptain(false);
        setShowDeleteModal(false);

        if (onTeamDeleted) {
            onTeamDeleted();
        }
    };

    const handleCancelDelete = () => {
        setShowDeleteModal(false);
    };

    const handleKickMember = (memberName: string) => {
        if (window.confirm(`Вы уверены, что хотите исключить ${memberName} из команды?`)) {
            alert(`${memberName} исключен из команды`);
            setTeam(prev => {
                if (!prev) return null;
                return {
                    ...prev,
                    membersList: prev.membersList.filter(m => m !== memberName)
                };
            });
        }
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
                teamId={team.id}
                onBack={() => setShowRequests(false)}
                onRequestAccepted={(request) => {
                    console.log('Принят игрок:', request);
                    setTeam(prev => {
                        if (!prev) return null;
                        return {
                            ...prev,
                            membersList: [...prev.membersList, request.nickname]
                        };
                    });
                }}
            />
        );
    }

    if (loading) {
        return (
            <MyTeamContainer>
                <div style={{ textAlign: 'center', padding: '50px', color: '#00e6ff' }}>
                    <i className="fas fa-spinner fa-spin" style={{ fontSize: '2rem' }}></i>
                    <p>Загрузка информации о команде...</p>
                </div>
            </MyTeamContainer>
        );
    }

    if (!team) {
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
                            <LeaveTeamButton onClick={handleLeaveTeam}>
                                <i className="fas fa-sign-out-alt"></i>
                                Покинуть команду
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
                                {team.membersList.map((member, index) => (
                                    <MemberItem key={index}>
                                        <MemberAvatar>
                                            {member.charAt(0).toUpperCase()}
                                        </MemberAvatar>
                                        <MemberName className={member === team.captain ? 'captain' : ''}>
                                            {member}
                                            {member === team.captain && (
                                                <CaptainBadge>
                                                    <i className="fas fa-crown"></i> Капитан
                                                </CaptainBadge>
                                            )}
                                        </MemberName>
                                        <MemberRole>
                                            {member === team.captain ? 'Лидер' : 'Игрок'}
                                        </MemberRole>
                                        {isCaptain && member !== team.captain && (
                                            <KickButton onClick={() => handleKickMember(member)}>
                                                <i className="fas fa-user-minus"></i>
                                            </KickButton>
                                        )}
                                    </MemberItem>
                                ))}
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
                                <div style={{ marginTop: '20px', padding: '15px', background: 'rgba(0, 180, 216, 0.1)', borderRadius: '8px' }}>
                                    <div style={{ color: '#00e6ff', fontWeight: '600', marginBottom: '10px' }}>
                                        <i className="fas fa-info-circle"></i> Для капитана
                                    </div>
                                    <div style={{ color: '#e0e0e0', fontSize: '0.9rem' }}>
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
