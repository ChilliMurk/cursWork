import {FC, useState, useRef, ChangeEvent, useEffect} from 'react';
import {
    ActionButtons,
    BioText,
    CardTitle,
    EditButton,
    PrimaryButton,
    ProfileAvatar,
    ProfileAvatarImage,
    ProfileAvatarPlaceholder,
    ProfileAvatarWrapper,
    AvatarEditOverlay,
    AvatarEditIcon,
    HiddenFileInput,
    ProfileCard,
    ProfileContainer,
    ProfileContent,
    ProfileGrid,
    ProfileSidebar,
    ProfileStats,
    ProfileUsername,
    SecondaryButton,
    StatItem
} from "@/modules/user/profile/components/style.ts";
import {
    useGetCurrentUserQuery,
    useUpdateCurrentUserMutation,
} from "@/store/reducers/userApi/userApi.ts";
import {useUploadImageMutation} from "@/store/reducers/uploadApi/uploadApi.ts";
import {format} from 'date-fns';
import {ru} from 'date-fns/locale';

export const ProfilePage: FC = () => {
    const {data: userData, isLoading, refetch} = useGetCurrentUserQuery();
    const [updateCurrentUser] = useUpdateCurrentUserMutation();
    const [uploadImage] = useUploadImageMutation();

    const [isEditing, setIsEditing] = useState(false);
    const [bioText, setBioText] = useState('');
    const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
    const [isUploading, setIsUploading] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (userData?.bio) {
            setBioText(userData.bio);
        }
    }, [userData]);

    const handleSaveProfile = async () => {
        try {
            await updateCurrentUser({bio: bioText}).unwrap();
            setIsEditing(false);
            alert("Изменения профиля сохранены!");
            refetch();
        } catch (error) {
            console.error('Ошибка при сохранении профиля:', error);
            alert("Произошла ошибка при сохранении профиля");
        }
    };

    const handleCancelEdit = () => {
        setBioText(userData?.bio || '');
        setIsEditing(false);
        setAvatarPreview(null);
    };

    const handleAvatarClick = () => {
        if (isEditing) {
            fileInputRef.current?.click();
        }
    };

    const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            // Проверка типа файла
            if (!file.type.startsWith('image/')) {
                alert('Пожалуйста, выберите изображение');
                return;
            }

            // Проверка размера файла (максимум 5MB)
            if (file.size > 5 * 1024 * 1024) {
                alert('Размер изображения не должен превышать 5MB');
                return;
            }

            // Показываем превью
            const reader = new FileReader();
            reader.onloadend = () => {
                setAvatarPreview(reader.result as string);
            };
            reader.readAsDataURL(file);

            // Загружаем на сервер через uploadApi
            setIsUploading(true);
            try {
                // 1. Загружаем изображение на сервер
                const uploadResult = await uploadImage(file).unwrap();
                console.log('Upload result:', uploadResult);

                // uploadResult.image_url - это имя файла (например, "497e0601-5154-4ba7-96c7-04cd4465c453.jpg")
                const imageFilename = uploadResult.image_url;

                // 2. Обновляем профиль пользователя с новым avatar_url
                await updateCurrentUser({avatar_url: imageFilename}).unwrap();

                alert('Аватар успешно обновлен!');
                refetch();
                setAvatarPreview(null);
            } catch (error) {
                console.error('Ошибка при загрузке аватара:', error);
                alert('Произошла ошибка при загрузке аватара');
                setAvatarPreview(null);
            } finally {
                setIsUploading(false);
            }
        }
    };

    const formatDate = (dateString: string) => {
        if (!dateString) return '—';
        try {
            const date = new Date(dateString);
            return format(date, 'dd MMMM yyyy', {locale: ru});
        } catch {
            return dateString;
        }
    };

    const formatLastOnline = (dateString: string) => {
        if (!dateString) return '—';
        try {
            const date = new Date(dateString);
            const now = new Date();
            const diff = now.getTime() - date.getTime();
            const days = Math.floor(diff / (1000 * 60 * 60 * 24));

            if (days === 0) {
                return format(date, "'Сегодня,' HH:mm", {locale: ru});
            } else if (days === 1) {
                return format(date, "'Вчера,' HH:mm", {locale: ru});
            } else {
                return format(date, 'dd MMMM yyyy', {locale: ru});
            }
        } catch {
            return dateString;
        }
    };

    const getAvatarUrl = () => {

        if (avatarPreview) {
            return avatarPreview;
        }

        if (userData?.avatar_url) {
            return `/api/uploads/${userData.avatar_url}`;
        }
        return null;
    };

    const getAvatarContent = () => {
        const avatarUrl = getAvatarUrl();

        if (isUploading) {
            return (
                <ProfileAvatarPlaceholder>
                    <i className="fas fa-spinner fa-spin" style={{fontSize: '2rem'}}></i>
                </ProfileAvatarPlaceholder>
            );
        }

        if (avatarUrl) {
            return (
                <ProfileAvatarImage
                    src={avatarUrl}
                    alt={userData?.username}
                    onError={(e) => {
                        console.error('Image load error:', avatarUrl);
                        e.currentTarget.style.display = 'none';
                        const parent = e.currentTarget.parentElement;
                        if (parent) {
                            const placeholder = document.createElement('div');
                            placeholder.className = 'avatar-placeholder';
                            placeholder.textContent = userData?.username?.slice(0, 2).toUpperCase() || '?';
                            parent.appendChild(placeholder);
                        }
                    }}
                />
            );
        }

        const initials = userData?.username?.slice(0, 2).toUpperCase() || '?';
        return <ProfileAvatarPlaceholder>{initials}</ProfileAvatarPlaceholder>;
    };

    if (isLoading) {
        return (
            <ProfileContainer>
                <div style={{textAlign: 'center', padding: '50px', color: '#00e6ff'}}>
                    <i className="fas fa-spinner fa-spin" style={{fontSize: '2rem'}}></i>
                    <p>Загрузка профиля...</p>
                </div>
            </ProfileContainer>
        );
    }

    if (!userData) {
        return (
            <ProfileContainer>
                <div style={{textAlign: 'center', padding: '50px', color: '#e0e0e0'}}>
                    <i className="fas fa-exclamation-triangle" style={{fontSize: '2rem', color: '#ff7e5f'}}></i>
                    <p>Не удалось загрузить данные профиля</p>
                </div>
            </ProfileContainer>
        );
    }

    return (
        <ProfileContainer>
            <ProfileGrid>
                <ProfileSidebar>
                    <ProfileAvatarWrapper>
                        <ProfileAvatar onClick={handleAvatarClick} isEditing={isEditing && !isUploading}>
                            {getAvatarContent()}
                            {isEditing && !isUploading && (
                                <AvatarEditOverlay className="avatar-overlay">
                                    <AvatarEditIcon className="fas fa-camera"/>
                                </AvatarEditOverlay>
                            )}
                        </ProfileAvatar>
                        <HiddenFileInput
                            ref={fileInputRef}
                            type="file"
                            accept="image/*"
                            onChange={handleFileChange}
                        />
                    </ProfileAvatarWrapper>
                    <ProfileUsername>{userData.username}</ProfileUsername>

                    {userData.team_name && (
                        <div style={{
                            background: 'rgba(0, 180, 216, 0.15)',
                            padding: '5px 15px',
                            borderRadius: '15px',
                            marginBottom: '10px',
                            color: '#00e6ff'
                        }}>
                            <i className="fas fa-users"></i> {userData.team_name}
                            {userData.team_role && ` (${userData.team_role})`}
                        </div>
                    )}

                    <ProfileStats>
                        <StatItem>
                            <span>Дата регистрации:</span>
                            <span>{formatDate(userData.join_date)}</span>
                        </StatItem>
                        <StatItem>
                            <span>Был в сети:</span>
                            <span>{formatLastOnline(userData.last_online)}</span>
                        </StatItem>
                        <StatItem>
                            <span>Email:</span>
                            <span>{userData.email}</span>
                        </StatItem>
                        {userData.roles && userData.roles.length > 0 && (
                            <StatItem>
                                <span>Роли:</span>
                                <span>{userData.roles.join(', ')}</span>
                            </StatItem>
                        )}
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
                                        resize: 'vertical',
                                        fontFamily: 'inherit'
                                    }}
                                    placeholder="Расскажите о себе..."
                                />
                            ) : (
                                <BioText>{userData.bio || 'Пользователь еще ничего не рассказал о себе'}</BioText>
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
                        <div style={{textAlign: 'center', padding: '20px', color: '#a0a0a0'}}>
                            <i className="fas fa-chart-simple" style={{fontSize: '3rem', marginBottom: '10px'}}></i>
                            <p>Статистика игр будет доступна позже</p>
                        </div>
                    </ProfileCard>
                </ProfileContent>
            </ProfileGrid>
        </ProfileContainer>
    );
};
