import {FC, useState, useRef, ChangeEvent} from 'react';

import {
    ActionButtons,
    BioText,
    CardTitle,
    EditButton,
    PrimaryButton,
    ProfileAvatar,
    ProfileCard,
    ProfileContainer,
    ProfileContent,
    ProfileGrid,
    ProfileSidebar,
    ProfileStats,
    ProfileUsername,
    SecondaryButton,
    StatCard,
    StatsGrid,
    StatValue,
    StatItem,
    StatLabel,
} from "@/modules/user/profile/components/style.ts";
import {mockUser, UserProfile} from "@/modules/user/profile/components/MockUserProfile.tsx";

export const ProfilePage: FC = () => {
    const [user, setUser] = useState<UserProfile>(mockUser);
    const [isEditing, setIsEditing] = useState(false);
    const [bioText, setBioText] = useState(user.bio);
    const [avatarImage, setAvatarImage] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleSaveProfile = () => {
        setUser({...user, bio: bioText});
        setIsEditing(false);
        alert("Изменения профиля сохранены!");
    };

    const handleCancelEdit = () => {
        setBioText(user.bio);
        setIsEditing(false);
    };

    const handleAvatarClick = () => {
        if (isEditing) {
            fileInputRef.current?.click();
        }
    };

    const handleImageUpload = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setAvatarImage(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const getAvatarContent = () => {
        if (avatarImage) {
            return <img src={avatarImage} alt="Avatar" style={{
                width: '100%',
                height: '100%',
                borderRadius: '50%',
                objectFit: 'cover'
            }} />;
        }
        // Если нет картинки, показываем две буквы
        const initials = user.username.slice(0, 2).toUpperCase();
        return <span>{initials}</span>;
    };

    return (
        <ProfileContainer>
            <ProfileGrid>
                <ProfileSidebar>
                    <ProfileAvatar
                        onClick={handleAvatarClick}
                        style={{ cursor: isEditing ? 'pointer' : 'default' }}
                    >
                        {getAvatarContent()}
                    </ProfileAvatar>
                    <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleImageUpload}
                        accept="image/*"
                        style={{ display: 'none' }}
                    />
                    <ProfileUsername>{user.username}</ProfileUsername>

                    <ProfileStats>
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
                    </ProfileCard>
                </ProfileContent>
            </ProfileGrid>
        </ProfileContainer>
    );
};
