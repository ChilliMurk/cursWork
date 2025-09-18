import {FC, useState} from 'react';
import {mockActivities, mockUser} from "@/modules/user/profile/components/MockUserProfile.tsx";
import {
    ActionButtons, ActivityContent, ActivityDate, ActivityIcon, ActivityItem, ActivityText,
    BioText,
    CardTitle,
    EditButton,
    LevelProgress,
    PrimaryButton,
    ProfileAvatar,
    ProfileCard,
    ProfileContainer,
    ProfileContent,
    ProfileGrid,
    ProfileRank,
    ProfileSidebar,
    ProfileStats,
    ProfileUsername,
    ProgressBar,
    ProgressFill,
    ProgressHeader,
    RecentActivity,
    SecondaryButton,
    StatCard,
    StatsGrid,
    StatValue,
    StatItem,
    StatLabel,
} from "@/modules/user/profile/components/style.ts";

interface UserProfile {
    id: number;
    username: string;
    email: string;
    avatar: string;
    level: number;
    experience: number;
    nextLevelExp: number;
    gamesPlayed: number;
    wins: number;
    losses: number;
    winRate: number;
    favoriteGame: string;
    joinDate: string;
    lastOnline: string;
    achievements: number;
    friends: number;
    bio: string;
    rank: string;
}

export const ProfilePage: FC = () => {
    const [user] = useState<UserProfile>(mockUser);
    const [activities] = useState(mockActivities);
    const [isEditing, setIsEditing] = useState(false);
    const [bioText, setBioText] = useState(user.bio);

    const expPercentage = (user.experience / user.nextLevelExp) * 100;

    const handleSaveProfile = () => {
        setIsEditing(false);
        alert("Изменения профиля сохранены!");
    };

    const handleCancelEdit = () => {
        setBioText(user.bio);
        setIsEditing(false);
    };

    return (
        <ProfileContainer>
            <ProfileGrid>
                <ProfileSidebar>
                    <ProfileAvatar>{user.avatar}</ProfileAvatar>
                    <ProfileUsername>{user.username}</ProfileUsername>
                    <ProfileRank>{user.rank}</ProfileRank>

                    <ProfileStats>
                        <StatItem>
                            <span>Уровень:</span>
                            <span>{user.level}</span>
                        </StatItem>
                        <StatItem>
                            <span>Друзей:</span>
                            <span>{user.friends}</span>
                        </StatItem>
                        <StatItem>
                            <span>Достижений:</span>
                            <span>{user.achievements}</span>
                        </StatItem>
                        <StatItem>
                            <span>Дата регистрации:</span>
                            <span>{user.joinDate}</span>
                        </StatItem>
                        <StatItem>
                            <span>Был в сети:</span>
                            <span>{user.lastOnline}</span>
                        </StatItem>
                    </ProfileStats>
                </ProfileSidebar>

                <ProfileContent>
                    <ProfileCard>
                        <CardTitle>
                            <i className="fas fa-user"></i>
                            Информация о профиле
                        </CardTitle>

                        <LevelProgress>
                            <ProgressHeader>
                                <span>Уровень {user.level}</span>
                                <span>{user.experience} / {user.nextLevelExp} XP</span>
                            </ProgressHeader>
                            <ProgressBar>
                                <ProgressFill percentage={expPercentage}/>
                            </ProgressBar>
                        </LevelProgress>

                        <div>
                            <h4 style={{color: '#00e6ff', marginBottom: '10px'}}>О себе:</h4>
                            {isEditing ? (
                                <textarea
                                    value={bioText}
                                    onChange={(e) => setBioText(e.target.value)}
                                    style={{
                                        width: '100%',
                                        minHeight: '100px',
                                        backgroundColor: 'rgba(0, 180, 216, 0.1)',
                                        border: '1px solid rgba(0, 180, 216, 0.3)',
                                        borderRadius: '8px',
                                        padding: '10px',
                                        color: '#e0e0e0',
                                        marginBottom: '15px',
                                        resize: 'vertical'
                                    }}
                                />
                            ) : (
                                <BioText>{bioText}</BioText>
                            )}

                            {isEditing ? (
                                <ActionButtons>
                                    <PrimaryButton onClick={handleSaveProfile}>
                                        Сохранить
                                    </PrimaryButton>
                                    <SecondaryButton onClick={handleCancelEdit}>
                                        Отмена
                                    </SecondaryButton>
                                </ActionButtons>
                            ) : (
                                <EditButton onClick={() => setIsEditing(true)}>
                                    <i className="fas fa-edit"></i> Редактировать профиль
                                </EditButton>
                            )}
                        </div>
                    </ProfileCard>

                    <ProfileCard>
                        <CardTitle>
                            <i className="fas fa-chart-line"></i>
                            Статистика игрока
                        </CardTitle>

                        <StatsGrid>
                            <StatCard>
                                <StatValue>{user.gamesPlayed}</StatValue>
                                <StatLabel>Сыграно матчей</StatLabel>
                            </StatCard>

                            <StatCard>
                                <StatValue>{user.wins}</StatValue>
                                <StatLabel>Побед</StatLabel>
                            </StatCard>

                            <StatCard>
                                <StatValue>{user.losses}</StatValue>
                                <StatLabel>Поражений</StatLabel>
                            </StatCard>

                            <StatCard>
                                <StatValue>{user.winRate}%</StatValue>
                                <StatLabel>Процент побед</StatLabel>
                            </StatCard>
                        </StatsGrid>

                        <StatItem>
                            <span>Любимая игра:</span>
                            <span>{user.favoriteGame}</span>
                        </StatItem>
                    </ProfileCard>

                    <ProfileCard>
                        <CardTitle>
                            <i className="fas fa-history"></i>
                            Недавняя активность
                        </CardTitle>

                        <RecentActivity>
                            {activities.map(activity => (
                                <ActivityItem key={activity.id}>
                                    <ActivityIcon>
                                        <i className={`fas ${activity.icon}`}></i>
                                    </ActivityIcon>
                                    <ActivityContent>
                                        <ActivityText>{activity.text}</ActivityText>
                                        <ActivityDate>{activity.date}</ActivityDate>
                                    </ActivityContent>
                                </ActivityItem>
                            ))}
                        </RecentActivity>
                    </ProfileCard>
                </ProfileContent>
            </ProfileGrid>
        </ProfileContainer>
    );
};
