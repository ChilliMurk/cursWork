import {FC, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {useAppDispatch} from "@/common/hooks/useAppSelector.ts";
import {logout} from "@/store/reducers/authSlice.ts";
import {css, Global} from "@emotion/react";
import {Particle, ParticlesContainer} from "@/common/components/mainPage/style.ts";
import {
    AppContainer,
    ContentArea,
    DashboardSection,
    DevelopmentMessage,
    DevIcon,
    DevText,
    DevTitle,
    LogoutButton,
    MainContent,
    NavItem,
    NavList,
    PageTitle,
    Sidebar,
    SidebarHeader,
    SidebarLogo,
    TopHeader,
    UserAvatarImage,
    UserAvatarPlaceholder,
    UserDetailsTop,
    UserInfoTop,
    UserNameTop,
    UserStatusTop,
    CustomNavLink
} from "@/common/components/userDashboard/style.ts";
import {TeamsPage} from "@/modules/user/teams/components/TeamsPage.tsx";
import {EventsPage} from "@/modules/user/events/components/EventsPage.tsx";
import {ProfilePage} from "@/modules/user/profile/components/ProfilePage.tsx";
import {TeamDetailsPage} from "@/modules/user/teams/components/teamDetailsPage/TeamDetailsPage.tsx";
import {LogoutModal} from "@/common/components/mainPage/modals/logoutModal/LogoutModal.tsx";
import {MethodologyPage} from '@/modules/user/methodology/components/MethodologyPage.tsx';
import {TestsPage} from "@/modules/user/methodology/components/testsPage/TestsPage.tsx";
import {MyTeamPage} from "@/modules/myTeam/components/MyTeamPage.tsx";
import {CalendarPage} from "@/modules/user/calendar/CalendarPage.tsx";
import {Methodology} from "@/store/reducers/methodologyApi/methodologyApi.ts";
import {useGetCurrentUserQuery} from "@/store/reducers/userApi/userApi.ts";
import {TeamInfoResponse} from "@/store/reducers/teamApi/teamApi.ts";
import {StatsPage} from "@/modules/user/statistics/StatsPage.tsx";
import {resetStore} from "@/store/store.ts"; // Добавлен импорт

const GlobalStyles = () => (
    <>
        <Global styles={css`
            @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Rajdhani:wght@300;400;600&display=swap');
            @import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css');

            * {
                margin: 0;
                padding: 0;
                box-sizing: border-box;
            }

            body {
                font-family: 'Rajdhani', sans-serif;
                background-color: #0a1929;
                color: #e0e0e0;
                line-height: 1.6;
                overflow-x: hidden;
                background-image: radial-gradient(circle at 15% 30%, rgba(0, 180, 216, 0.1) 0%, transparent 25%),
                radial-gradient(circle at 85% 70%, rgba(0, 102, 204, 0.1) 0%, transparent 25%);
            }

            #root {
                min-height: 100vh;
            }
        `}/>
    </>
);

export const UserDashboard: FC = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const {data: userData, isLoading: isUserLoading} = useGetCurrentUserQuery();
    const [activeSection, setActiveSection] = useState('main');
    const [selectedTeam, setSelectedTeam] = useState<TeamInfoResponse | null>(null); // Изменен тип
    const [selectedMethodology, setSelectedMethodology] = useState<Methodology | null>(null);
    const [showLogoutModal, setShowLogoutModal] = useState(false);
    const [showCalendar, setShowCalendar] = useState(false);

    const handleLogout = () => {
        dispatch(logout());
        resetStore();
        navigate('/');
    };

    const handleLogoutClick = () => {
        setShowLogoutModal(true);
    };

    const handleCancelLogout = () => {
        setShowLogoutModal(false);
    };

    const handleConfirmLogout = () => {
        setShowLogoutModal(false);
        handleLogout();
    };

    const handleSectionChange = (section: string) => {
        setActiveSection(section);
        setSelectedTeam(null);
        setSelectedMethodology(null);
    };

    const handleTeamSelect = (team: TeamInfoResponse) => { // Изменен тип параметра
        setSelectedTeam(team);
    };

    const handleMethodologySelect = (methodology: Methodology) => {
        setSelectedMethodology(methodology);
    };

    const handleBackToList = () => {
        setSelectedTeam(null);
        setSelectedMethodology(null);
    };

    const handleCloseCalendar = () => {
        setShowCalendar(false);
    };

    const getAvatarUrl = () => {
        if (userData?.avatar_url) {
            return `/api/uploads/${userData.avatar_url}`;
        }
        return null;
    };

    const getUserStatus = () => {
        if (!userData) return 'Загрузка...';

        if (userData.roles?.includes('ADMIN')) {
            return 'Администратор';
        }
        if (userData.team_name) {
            return `Игрок команды ${userData.team_name}`;
        }
        return 'Активный игрок';
    };

    const getAvatarContent = () => {
        const avatarUrl = getAvatarUrl();

        if (isUserLoading) {
            return (
                <UserAvatarPlaceholder>
                    <i className="fas fa-spinner fa-spin" style={{fontSize: '1.5rem'}}></i>
                </UserAvatarPlaceholder>
            );
        }

        if (avatarUrl) {
            return (
                <UserAvatarImage
                    src={avatarUrl}
                    alt={userData?.username || 'User'}
                    onError={(e) => {
                        console.error('Avatar load error:', avatarUrl);
                        e.currentTarget.style.display = 'none';
                        const parent = e.currentTarget.parentElement;
                        if (parent) {
                            const placeholder = document.createElement('div');
                            placeholder.className = 'avatar-placeholder';
                            placeholder.textContent = userData?.username?.slice(0, 2).toUpperCase() || 'U';
                            parent.appendChild(placeholder);
                        }
                    }}
                />
            );
        }

        const initials = userData?.username?.slice(0, 2).toUpperCase() || 'U';
        return <UserAvatarPlaceholder>{initials}</UserAvatarPlaceholder>;
    };

    const particles = [];
    const particleCount = 25;
    const colors = ['#00b4d8', '#0066cc', '#00e6ff'];

    for (let i = 0; i < particleCount; i++) {
        const size = Math.random() * 12 + 3;
        const color = colors[Math.floor(Math.random() * colors.length)];
        const left = Math.random() * 100;
        const top = Math.random() * 100;
        const duration = Math.random() * 15 + 10;
        const delay = Math.random() * 5;

        particles.push({size, color, left, top, duration, delay});
    }

    // Функция для преобразования TeamInfoResponse в формат, понятный TeamDetailsPage
    const transformTeamForDetails = (apiTeam: TeamInfoResponse) => ({
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

    return (
        <>
            <GlobalStyles/>
            <ParticlesContainer>
                {particles.map((particle, index) => (
                    <Particle
                        key={index}
                        size={particle.size}
                        color={particle.color}
                        left={particle.left}
                        top={particle.top}
                        duration={particle.duration}
                        delay={particle.delay}
                    />
                ))}
            </ParticlesContainer>

            <LogoutModal
                isOpen={showLogoutModal}
                onConfirm={handleConfirmLogout}
                onCancel={handleCancelLogout}
            />

            <AppContainer>
                <Sidebar>
                    <SidebarHeader>
                        <SidebarLogo>PREDATORY BEAVERS</SidebarLogo>
                    </SidebarHeader>

                    <NavList>
                        <NavItem>
                            <CustomNavLink
                                isActive={activeSection === 'main'}
                                onClick={(e) => {
                                    e.preventDefault();
                                    handleSectionChange('main');
                                }}
                            >
                                <span className="nav-icon"><i className="fas fa-home"></i></span>
                                <span>Главная</span>
                            </CustomNavLink>
                        </NavItem>

                        <NavItem>
                            <CustomNavLink
                                isActive={activeSection === 'events'}
                                onClick={(e) => {
                                    e.preventDefault();
                                    handleSectionChange('events');
                                }}
                            >
                                <span className="nav-icon"><i className="fas fa-calendar-alt"></i></span>
                                <span>События</span>
                            </CustomNavLink>
                        </NavItem>

                        <NavItem>
                            <CustomNavLink
                                isActive={activeSection === 'calendar'}
                                onClick={(e) => {
                                    e.preventDefault();
                                    setShowCalendar(true);
                                    setActiveSection('calendar');
                                }}
                            >
                                <span className="nav-icon"><i className="fas fa-calendar-alt"></i></span>
                                <span>Календарь</span>
                            </CustomNavLink>
                        </NavItem>

                        <NavItem>
                            <CustomNavLink
                                isActive={activeSection === 'teams'}
                                onClick={(e) => {
                                    e.preventDefault();
                                    handleSectionChange('teams');
                                }}
                            >
                                <span className="nav-icon"><i className="fas fa-users"></i></span>
                                <span>Команды</span>
                            </CustomNavLink>
                        </NavItem>

                        <NavItem>
                            <CustomNavLink
                                isActive={activeSection === 'myteam'}
                                onClick={(e) => {
                                    e.preventDefault();
                                    handleSectionChange('myteam');
                                }}
                            >
                                <span className="nav-icon"><i className="fas fa-user-friends"></i></span>
                                <span>Моя команда</span>
                            </CustomNavLink>
                        </NavItem>

                        <NavItem>
                            <CustomNavLink
                                isActive={activeSection === 'methodology'}
                                onClick={(e) => {
                                    e.preventDefault();
                                    handleSectionChange('methodology');
                                }}
                            >
                                <span className="nav-icon"><i className="fas fa-book"></i></span>
                                <span>Методички</span>
                            </CustomNavLink>
                        </NavItem>

                        <NavItem>
                            <CustomNavLink
                                isActive={activeSection === 'tests'}
                                onClick={(e) => {
                                    e.preventDefault();
                                    handleSectionChange('tests');
                                }}
                            >
                                <span className="nav-icon"><i className="fas fa-tasks"></i></span>
                                <span>Тесты</span>
                            </CustomNavLink>
                        </NavItem>

                        <NavItem>
                            <CustomNavLink
                                isActive={activeSection === 'stats'}
                                onClick={(e) => {
                                    e.preventDefault();
                                    handleSectionChange('stats');
                                }}
                            >
                                <span className="nav-icon"><i className="fas fa-chart-line"></i></span>
                                <span>Статистика</span>
                            </CustomNavLink>
                        </NavItem>

                        <NavItem>
                            <CustomNavLink
                                isActive={activeSection === 'profile'}
                                onClick={(e) => {
                                    e.preventDefault();
                                    handleSectionChange('profile');
                                }}
                            >
                                <span className="nav-icon"><i className="fas fa-user-cog"></i></span>
                                <span>Профиль</span>
                            </CustomNavLink>
                        </NavItem>

                    </NavList>

                    <LogoutButton onClick={handleLogoutClick}>
                        <span className="nav-icon"><i className="fas fa-sign-out-alt"></i></span>
                        <span>Выйти</span>
                    </LogoutButton>
                </Sidebar>

                <MainContent>
                    <TopHeader>
                        <PageTitle>
                            {activeSection === 'main' && 'Главная'}
                            {activeSection === 'events' && 'События и турниры'}
                            {activeSection === 'calendar' && 'Календарь событий'}
                            {activeSection === 'teams' && (selectedTeam ? `Команда: ${selectedTeam.name}` : 'Команды')}
                            {activeSection === 'myteam' && 'Моя команда'}
                            {activeSection === 'methodology' && (selectedMethodology ? selectedMethodology.title : 'Методички')}
                            {activeSection === 'tests' && 'Тесты'}
                            {activeSection === 'stats' && 'Статистика'}
                            {activeSection === 'profile' && 'Профиль'}
                        </PageTitle>

                        <UserInfoTop>
                            {getAvatarContent()}
                            <UserDetailsTop>
                                <UserNameTop>{userData?.username || 'Загрузка...'}</UserNameTop>
                                <UserStatusTop>{getUserStatus()}</UserStatusTop>
                            </UserDetailsTop>
                        </UserInfoTop>
                    </TopHeader>

                    <ContentArea>
                        <DashboardSection id="main-section" isActive={activeSection === 'main'}>
                            <DevelopmentMessage>
                                <DevIcon>
                                    <i className="fas fa-tools"></i>
                                </DevIcon>
                                <DevTitle>Раздел в разработке</DevTitle>
                                <DevText>
                                    Мы активно работаем над улучшением платформы. Скоро здесь появится
                                    полнофункциональная главная страница с вашей статистикой, достижениями
                                    и последними событиями.
                                </DevText>
                            </DevelopmentMessage>
                        </DashboardSection>

                        <DashboardSection id="events-section" isActive={activeSection === 'events'}>
                            <EventsPage/>
                        </DashboardSection>

                        <DashboardSection id="calendar-section" isActive={activeSection === 'calendar'}>
                            {showCalendar ? (
                                <CalendarPage onBack={handleCloseCalendar}/>
                            ) : (
                                <DevelopmentMessage>
                                    <DevIcon>
                                        <i className="fas fa-calendar-alt"></i>
                                    </DevIcon>
                                    <DevTitle>Календарь событий</DevTitle>
                                    <DevText>
                                        Здесь будет отображаться календарь с турнирами и тренировками.
                                    </DevText>
                                </DevelopmentMessage>
                            )}
                        </DashboardSection>

                        <DashboardSection id="teams-section" isActive={activeSection === 'teams'}>
                            {selectedTeam ? (
                                <TeamDetailsPage
                                    team={transformTeamForDetails(selectedTeam)}
                                    onBack={handleBackToList}
                                />
                            ) : (
                                <TeamsPage onTeamSelect={handleTeamSelect}/>
                            )}
                        </DashboardSection>

                        <DashboardSection id="myteam-section" isActive={activeSection === 'myteam'}>
                            <MyTeamPage/>
                        </DashboardSection>

                        <DashboardSection id="methodology-section" isActive={activeSection === 'methodology'}>
                            <MethodologyPage onMethodologySelect={handleMethodologySelect}/>
                        </DashboardSection>

                        <DashboardSection id="tests-section" isActive={activeSection === 'tests'}>
                            <TestsPage/>
                        </DashboardSection>

                        <DashboardSection id="stats-section" isActive={activeSection === 'stats'}>
                            <StatsPage/>
                        </DashboardSection>

                        <DashboardSection id="profile-section" isActive={activeSection === 'profile'}>
                            <ProfilePage/>
                        </DashboardSection>

                    </ContentArea>
                </MainContent>
            </AppContainer>
        </>
    );
};
