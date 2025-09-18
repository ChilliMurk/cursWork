import { FC, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from "@/common/hooks/useAppSelector.ts";
import { logout } from "@/store/reducers/authSlice.ts";
import { css, Global } from "@emotion/react";
import { Copyright, Particle, ParticlesContainer, SocialLink, SocialLinks } from "@/common/components/mainPage/style.ts";
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
    MainFooter,
    NavItem,
    NavList,
    PageTitle,
    Sidebar,
    SidebarHeader,
    SidebarLogo,
    TopHeader,
    UserAvatarTop,
    UserDetailsTop,
    UserInfoTop,
    UserNameTop,
    UserStatusTop,
    CustomNavLink
} from "@/common/components/userDashboard/style.ts";

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
    const [activeSection, setActiveSection] = useState('main');

    const handleLogout = () => {
        dispatch(logout());
        navigate('/');
    };

    const handleSectionChange = (section: string) => {
        setActiveSection(section);
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

        particles.push({ size, color, left, top, duration, delay });
    }

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
                                isActive={activeSection === 'help'}
                                onClick={(e) => {
                                    e.preventDefault();
                                    handleSectionChange('help');
                                }}
                            >
                                <span className="nav-icon"><i className="fas fa-headset"></i></span>
                                <span>Помощь</span>
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

                    <LogoutButton onClick={handleLogout}>
                        <span className="nav-icon"><i className="fas fa-sign-out-alt"></i></span>
                        <span>Выйти</span>
                    </LogoutButton>
                </Sidebar>

                <MainContent>
                    <TopHeader>
                        <PageTitle>
                            {activeSection === 'main' && <>Главная </>}
                            {activeSection === 'events' && <>События </>}
                            {activeSection === 'teams' && <>Команды </>}
                            {activeSection === 'help' && <>Помощь </>}
                            {activeSection === 'stats' && <>Статистика </>}
                            {activeSection === 'profile' && <>Профиль </>}
                        </PageTitle>

                        <UserInfoTop>
                            <UserAvatarTop>TU</UserAvatarTop>
                            <UserDetailsTop>
                                <UserNameTop>Test User</UserNameTop>
                                <UserStatusTop>Активный игрок</UserStatusTop>
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
                            <DevelopmentMessage>
                                <DevIcon>
                                    <i className="fas fa-calendar-plus"></i>
                                </DevIcon>
                                <DevTitle>События в разработке</DevTitle>
                                <DevText>
                                    Раздел с турнирами и событиями скоро будет доступен. Мы готовим для вас
                                    увлекательные соревнования и мероприятия.
                                </DevText>
                            </DevelopmentMessage>
                        </DashboardSection>

                        <DashboardSection id="teams-section" isActive={activeSection === 'teams'}>
                            <DevelopmentMessage>
                                <DevIcon>
                                    <i className="fas fa-users-gear"></i>
                                </DevIcon>
                                <DevTitle>Команды в разработке</DevTitle>
                                <DevText>
                                    Система управления командами и участниками находится в разработке.
                                    Скоро вы сможете создавать и присоединяться к командам.
                                </DevText>
                            </DevelopmentMessage>
                        </DashboardSection>

                        <DashboardSection id="help-section" isActive={activeSection === 'help'}>
                            <DevelopmentMessage>
                                <DevIcon>
                                    <i className="fas fa-headset"></i>
                                </DevIcon>
                                <DevTitle>Помощь в разработке</DevTitle>
                                <DevText>
                                    Раздел поддержки и помощи находится в разработке. Скоро здесь появится
                                    подробная информация и инструкции для пользователей.
                                </DevText>
                            </DevelopmentMessage>
                        </DashboardSection>

                        <DashboardSection id="stats-section" isActive={activeSection === 'stats'}>
                            <DevelopmentMessage>
                                <DevIcon>
                                    <i className="fas fa-chart-line"></i>
                                </DevIcon>
                                <DevTitle>Статистика в разработке</DevTitle>
                                <DevText>
                                    Детальная статистика и аналитика находятся в разработке. Скоро вы сможете
                                    отслеживать свой прогресс и достижения.
                                </DevText>
                            </DevelopmentMessage>
                        </DashboardSection>

                        <DashboardSection id="profile-section" isActive={activeSection === 'profile'}>
                            <DevelopmentMessage>
                                <DevIcon>
                                    <i className="fas fa-user-cog"></i>
                                </DevIcon>
                                <DevTitle>Профиль в разработке</DevTitle>
                                <DevText>
                                    Настройки профиля и персонализация находятся в разработке. Скоро вы сможете
                                    настроить аккаунт под свои preferences.
                                </DevText>
                            </DevelopmentMessage>
                        </DashboardSection>
                    </ContentArea>

                    <MainFooter>
                        <SocialLinks>
                            <SocialLink href="#"><i className="fab fa-vk"></i></SocialLink>
                            <SocialLink href="#"><i className="fab fa-telegram"></i></SocialLink>
                            <SocialLink href="#"><i className="fab fa-youtube"></i></SocialLink>
                            <SocialLink href="#"><i className="fab fa-twitch"></i></SocialLink>
                            <SocialLink href="#"><i className="fab fa-discord"></i></SocialLink>
                        </SocialLinks>
                        <Copyright>© 2023 PREDATORY BEAVERS. Все права защищены.</Copyright>
                    </MainFooter>
                </MainContent>
            </AppContainer>
        </>
    );
};
