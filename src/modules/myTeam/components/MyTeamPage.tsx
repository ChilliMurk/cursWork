import { FC, useState, useEffect } from 'react';
import {Team} from "@/modules/user/teams/components/mockTeams.tsx";
import {
    AchievementItem,
    AchievementList,
    ActionButtonsContainer, CaptainBadge,
    CardTitle, ContactInfo,
    ContentCard,
    ContentGrid,
    CreateTeamButton,
    EditTeamButton, KickButton,
    LeaveTeamButton, LookingForList, ManageButton, ManageButtons,
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
    Rating, RequirementText, RoleBadge,
    TeamDescription,
    TeamGameBadge,
    TeamHeaderSection,
    TeamInfoCard,
    TeamMetaGrid,
    TeamName
} from "@/modules/myTeam/components/style.ts";
import {TeamRequestsPage} from "@/modules/myTeam/components/teamRequestsPage/TeamRequestsPage.tsx";

// Моковые данные для команды пользователя
const mockUserTeam: Team = {
    id: 1,
    name: "Пушистые лапки",
    game: "Counter-Strike 2",
    members: 5,
    maxMembers: 5,
    description: "Команда для начинающих и опытных игроков. Участвуем в турнирах и регулярно тренируемся.",
    created: "15 марта 2024",
    captain: "CurrentUser",
    membersList: ["CurrentUser", "Player456", "Gamer789", "ProGamer", "NewRecruit"],
    achievements: [
        "🥇 Победители недельного турнира (март 2024)",
        "🎯 Топ-3 в региональном чемпионате",
        "🏆 Лучшая командная игра месяца"
    ],
    requirements: "Опыт игры от 6 месяцев, наличие микрофона, готовность к регулярным тренировкам",
    contact: "Discord: team.leader#1234 | Telegram: @team_channel",
    rating: 4.8,
    practiceSchedule: "Пн, Ср, Пт с 19:00 до 21:00",
    lookingFor: []
};

const HAS_TEAM = true;
const IS_CAPTAIN = true;

interface MyTeamPageProps {
    onOpenRequests?: (team: Team) => void;
}

export const MyTeamPage: FC<MyTeamPageProps> = () => {
    const [team, setTeam] = useState<Team | null>(null);
    const [isCaptain, setIsCaptain] = useState(false);
    const [loading, setLoading] = useState(true);
    const [showRequests, setShowRequests] = useState(false);

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
        alert("Редактирование команды (в разработке)");
    };

    const handleLeaveTeam = () => {
        if (window.confirm("Вы уверены, что хотите покинуть команду?")) {
            alert("Вы покинули команду");
            setTeam(null);
            setIsCaptain(false);
        }
    };

    const handleKickMember = (memberName: string) => {
        if (window.confirm(`Вы уверены, что хотите исключить ${memberName} из команды?`)) {
            alert(`${memberName} исключен из команды`);
            setTeam(prev => {
                if (!prev) return null;
                return {
                    ...prev,
                    membersList: prev.membersList.filter(m => m !== memberName),
                    members: prev.members - 1
                };
            });
        }
    };

    // Если нужно открыть страницу заявок
    if (showRequests && team) {
        return (
            <TeamRequestsPage
                teamName={team.name}
                teamId={team.id}
                onBack={() => setShowRequests(false)}
                onRequestAccepted={(request) => {
                    console.log('Принят игрок:', request);
                    // Обновляем состав команды
                    setTeam(prev => {
                        if (!prev) return null;
                        return {
                            ...prev,
                            membersList: [...prev.membersList, request.nickname],
                            members: prev.members + 1
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

    return (
        <MyTeamContainer>
            <TeamInfoCard>
                <TeamHeaderSection>
                    <TeamGameBadge>{team.game}</TeamGameBadge>
                    <TeamName>{team.name}</TeamName>
                    <TeamDescription>{team.description}</TeamDescription>

                    <TeamMetaGrid>
                        <MetaItem>
                            <MetaLabel>Участников</MetaLabel>
                            <MetaValue>{team.members}/{team.maxMembers}</MetaValue>
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

                        <MetaItem>
                            <MetaLabel>Расписание тренировок</MetaLabel>
                            <MetaValue>{team.practiceSchedule}</MetaValue>
                        </MetaItem>
                    </TeamMetaGrid>

                    <ActionButtonsContainer>
                        {isCaptain && (
                            <EditTeamButton onClick={handleEditTeam}>
                                <i className="fas fa-edit"></i>
                                Редактировать команду
                            </EditTeamButton>
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
                            Участники команды
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
                                <ManageButton onClick={() => setShowRequests(true)} style={{ marginTop: '10px' }}>
                                    <i className="fas fa-users"></i>
                                    Управление заявками
                                </ManageButton>
                            </ManageButtons>
                        )}
                    </ContentCard>

                    <ContentCard>
                        <CardTitle>
                            <i className="fas fa-trophy"></i>
                            Достижения
                        </CardTitle>

                        <AchievementList>
                            {team.achievements.map((achievement, index) => (
                                <AchievementItem key={index}>
                                    {achievement}
                                </AchievementItem>
                            ))}
                        </AchievementList>
                    </ContentCard>

                    <ContentCard>
                        <CardTitle>
                            <i className="fas fa-search"></i>
                            Ищем игроков
                        </CardTitle>

                        {team.lookingFor && team.lookingFor.length > 0 ? (
                            <LookingForList>
                                {team.lookingFor.map((role, index) => (
                                    <RoleBadge key={index}>{role}</RoleBadge>
                                ))}
                            </LookingForList>
                        ) : (
                            <RequirementText style={{ color: '#a0a0a0', textAlign: 'center' }}>
                                {isCaptain
                                    ? "Вы можете добавить вакансии в разделе редактирования команды"
                                    : "Состав команды полностью укомплектован"}
                            </RequirementText>
                        )}

                        <CardTitle style={{ marginTop: '20px' }}>
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
    );
};
