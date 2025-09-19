import { FC } from 'react';
import { Team } from "@/modules/user/teams/components/mockTeams.tsx";
import {
    AchievementItem,
    AchievementList,
    BackButton, ContactInfo,
    ContentCard,
    ContentGrid, LookingForList, MemberAvatar,
    MemberItem, MemberName,
    MembersList,
    MetaItem,
    MetaLabel,
    MetaValue,
    Rating, RequirementText, RoleBadge,
    TeamDescription,
    TeamDetailsContainer,
    TeamGameBadge,
    TeamHeader,
    TeamTitle
} from "@/modules/user/teams/components/teamDetailsPage/style.ts";
import {TeamMeta} from "@/modules/user/teams/components/style.ts";
import {ActionButtons, CardTitle, PrimaryButton, SecondaryButton} from "@/modules/user/profile/components/style.ts";

interface TeamDetailsPageProps {
    team: Team;
    onBack: () => void;
}

export const TeamDetailsPage: FC<TeamDetailsPageProps> = ({ team, onBack }) => {
    const handleJoinTeam = () => {
        alert(`Запрос на вступление в команду ${team.name} отправлен!`);
    };

    const handleContact = () => {
        alert(`Контактная информация: ${team.contact}`);
    };

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
                </TeamMeta>
            </TeamHeader>

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
                                    {member} {member === team.captain && '(Капитан)'}
                                </MemberName>
                            </MemberItem>
                        ))}
                    </MembersList>
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

                    <LookingForList>
                        {team.lookingFor.map((role, index) => (
                            <RoleBadge key={index}>{role}</RoleBadge>
                        ))}
                    </LookingForList>

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
                </ContentCard>
            </ContentGrid>
        </TeamDetailsContainer>
    );
};
