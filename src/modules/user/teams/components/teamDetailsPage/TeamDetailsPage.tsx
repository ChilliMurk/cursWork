import { FC, useState, useEffect } from 'react';
import {
    BackButton, ContactInfo,
    ContentCard,
    ContentGrid, MemberAvatar,
    MemberItem, MemberName,
    MembersList,
    MetaItem,
    MetaLabel,
    MetaValue,
    Rating, RequirementText,
    TeamDescription,
    TeamDetailsContainer,
    TeamGameBadge,
    TeamHeader,
    TeamTitle,
    DeleteButton
} from "@/modules/user/teams/components/teamDetailsPage/style.ts";
import { TeamMeta } from "@/modules/user/teams/components/style.ts";
import { ActionButtons, CardTitle, PrimaryButton, SecondaryButton } from "@/modules/user/profile/components/style.ts";
import { DeleteConfirmModal } from "@/modules/user/teams/DeleteConfirmModal.tsx";
import { useGetTeamMembersQuery } from "@/store/reducers/teamApi/teamApi";

interface TeamDetailsPageProps {
    team: {
        id: number;
        name: string;
        game: string;
        description: string;
        created: string;
        captain: string;
        membersList?: string[];
        requirements: string;
        contact: string;
        rating: number;
    };
    onBack: () => void;
    onDelete?: (teamId: number) => void;
    currentTeamId?: number;
    currentUserId?: number;
    captainId?: number;
}

export const TeamDetailsPage: FC<TeamDetailsPageProps> = ({
                                                              team,
                                                              onBack,
                                                              onDelete,
                                                              currentTeamId,
                                                              currentUserId,
                                                              captainId
                                                          }) => {
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const isCaptain = currentUserId === captainId;

    const { data: membersData, isLoading: membersLoading, error: membersError } = useGetTeamMembersQuery(team.id);

    // Отладка
    useEffect(() => {
        console.log('=== TeamDetailsPage Debug ===');
        console.log('Team ID:', team.id);
        console.log('Members data from API:', membersData);
        console.log('Members loading:', membersLoading);
        console.log('Members error:', membersError);
    }, [team.id, membersData, membersLoading, membersError]);

    // Получаем имена участников
    const membersList = membersData?.map(m => m.username) || [];

    const handleJoinTeam = () => {
        alert(`Запрос на вступление в команду ${team.name} отправлен!`);
    };

    const handleContact = () => {
        alert(`Контактная информация: ${team.contact}`);
    };

    const handleDeleteClick = () => {
        setShowDeleteModal(true);
    };

    const handleConfirmDelete = () => {
        if (onDelete && currentTeamId) {
            onDelete(currentTeamId);
        }
        setShowDeleteModal(false);
        onBack();
    };

    const handleCancelDelete = () => {
        setShowDeleteModal(false);
    };

    const membersCount = membersList.length;

    if (!team) {
        return (
            <TeamDetailsContainer>
                <BackButton onClick={onBack}>
                    <i className="fas fa-arrow-left"></i>
                    Назад к списку команд
                </BackButton>
                <div style={{ textAlign: 'center', padding: '50px', color: '#e0e0e0' }}>
                    <i className="fas fa-exclamation-triangle" style={{ fontSize: '2rem', color: '#ff7e5f' }}></i>
                    <p>Команда не найдена</p>
                </div>
            </TeamDetailsContainer>
        );
    }

    return (
        <TeamDetailsContainer>
            <BackButton onClick={onBack}>
                <i className="fas fa-arrow-left"></i>
                Назад к списку команд
            </BackButton>

            <TeamHeader>
                <TeamGameBadge>{team.game}</TeamGameBadge>
                <TeamTitle>{team.name}</TeamTitle>
                <TeamDescription>{team.description}</TeamDescription>

                <TeamMeta>
                    <MetaItem>
                        <MetaLabel>Участников</MetaLabel>
                        <MetaValue>{membersCount}</MetaValue>
                    </MetaItem>

                    <MetaItem>
                        <MetaLabel>Рейтинг</MetaLabel>
                        <Rating>
                            <i className="fas fa-star"></i>
                            <span>{team.rating || 0}</span>
                        </Rating>
                    </MetaItem>

                    <MetaItem>
                        <MetaLabel>Капитан</MetaLabel>
                        <MetaValue>{team.captain || "Не указан"}</MetaValue>
                    </MetaItem>

                    <MetaItem>
                        <MetaLabel>Создана</MetaLabel>
                        <MetaValue>{team.created || "Не указано"}</MetaValue>
                    </MetaItem>
                </TeamMeta>
            </TeamHeader>

            <ContentGrid>
                <ContentCard>
                    <CardTitle>
                        <i className="fas fa-users"></i>
                        Участники команды ({membersCount})
                    </CardTitle>

                    <MembersList>
                        {membersLoading ? (
                            <div style={{ textAlign: 'center', padding: '20px', color: '#a0a0a0' }}>
                                <i className="fas fa-spinner fa-spin"></i> Загрузка участников...
                            </div>
                        ) : membersList.length > 0 ? (
                            membersList.map((member) => (
                                <MemberItem key={member}>
                                    <MemberAvatar>
                                        {member?.charAt(0)?.toUpperCase() || '?'}
                                    </MemberAvatar>
                                    <MemberName className={member === team.captain ? 'captain' : ''}>
                                        {member} {member === team.captain && '(Капитан)'}
                                    </MemberName>
                                </MemberItem>
                            ))
                        ) : (
                            <div style={{ textAlign: 'center', padding: '20px', color: '#a0a0a0' }}>
                                Нет участников
                            </div>
                        )}
                    </MembersList>
                </ContentCard>

                <ContentCard>
                    <CardTitle>
                        <i className="fas fa-list-alt"></i>
                        Требования
                    </CardTitle>

                    <RequirementText>{team.requirements || "Требования не указаны"}</RequirementText>
                </ContentCard>

                <ContentCard>
                    <CardTitle>
                        <i className="fas fa-envelope"></i>
                        Контакты
                    </CardTitle>

                    <ContactInfo>
                        {team.contact || "Контактная информация не указана"}
                    </ContactInfo>

                    <ActionButtons>
                        <PrimaryButton onClick={handleJoinTeam}>
                            <i className="fas fa-sign-in-alt"></i>
                            Вступить в команду
                        </PrimaryButton>

                        <SecondaryButton onClick={handleContact}>
                            <i className="fas fa-comment"></i>
                            Связаться
                        </SecondaryButton>
                    </ActionButtons>

                    {isCaptain && onDelete && (
                        <DeleteButton onClick={handleDeleteClick}>
                            <i className="fas fa-trash-alt"></i>
                            Удалить команду
                        </DeleteButton>
                    )}
                </ContentCard>
            </ContentGrid>

            <DeleteConfirmModal
                isOpen={showDeleteModal}
                teamName={team.name}
                onConfirm={handleConfirmDelete}
                onCancel={handleCancelDelete}
            />
        </TeamDetailsContainer>
    );
};
