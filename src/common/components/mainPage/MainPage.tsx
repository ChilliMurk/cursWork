import {Global, css} from "@emotion/react";
import {CommonWrapper} from "@/modules/user/Wrapper.tsx";
import {AlignContentContainer} from "@/common/components/layout/AlingHelpers.tsx";
import {RootPage} from "@/modules/user/RootPage.tsx";
import {
    AuthButton,
    AuthButtons,
    Beaver,
    BeaverContainer,
    BeaverContent,
    BeaverIcon,
    BeaverImage,
    BeaverSection,
    Container,
    CTAButton,
    FeatureCard,
    FeatureDescription,
    FeatureIcon,
    FeaturesGrid,
    FeaturesSection,
    FeatureTitle,
    FloatingIcon,
    HeaderContent,
    HeaderWrapper,
    HeroContent,
    HeroDescription,
    HeroSection,
    HeroSubtitle,
    HeroTitle,
    Logo,
    LogoText,
    SectionTitle,
    StatItem,
    StatLabel,
    StatNumber,
    StatsContainer,
    StatsSection,
    Style
} from "@/common/components/mainPage/style.ts";
import {Particles} from "@/common/components/mainPage/Particles.tsx";
import {FC, useState} from "react";
import {LoginModal} from "@/common/components/mainPage/modals/LoginModal.tsx";
import {RegisterModal} from "@/common/components/mainPage/modals/RegisterModal.tsx";
import {useNavigate} from "react-router-dom";

export const GlobalStyles = () => (
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

export const MainPage: FC = () => {

    const navigate = useNavigate();

    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
    const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);

    const openLoginModal = () => {
        setIsLoginModalOpen(true);
        document.body.style.overflow = 'hidden';
    };

    const openRegisterModal = () => {
        setIsRegisterModalOpen(true);
        document.body.style.overflow = 'hidden';
    };

    const closeLoginModal = () => {
        setIsLoginModalOpen(false);
        document.body.style.overflow = 'auto';
    };

    const closeRegisterModal = () => {
        setIsRegisterModalOpen(false);
        document.body.style.overflow = 'auto';
    };

    const switchToRegister = () => {
        closeLoginModal();
        setTimeout(() => openRegisterModal(), 300);
    };

    const switchToLogin = () => {
        closeRegisterModal();
        setTimeout(() => openLoginModal(), 300);
    };

    const handleAuthSuccess = () => {
        console.log('Auth success, navigating to /user');
        // Используем replace вместо обычного navigate, чтобы избежать дублирования в истории
        navigate('/user', { replace: true });
    };

    const handleJoinClick = () => {
        openRegisterModal();
    };

    return (
        <RootPage>
            <CommonWrapper>
                <AlignContentContainer>
                    <Style>
                        <LoginModal
                            isOpen={isLoginModalOpen}
                            onClose={closeLoginModal}
                            onSwitchToRegister={switchToRegister}
                            onSuccess={handleAuthSuccess}
                        />

                        <RegisterModal
                            isOpen={isRegisterModalOpen}
                            onClose={closeRegisterModal}
                            onSwitchToLogin={switchToLogin}
                            onSuccess={handleAuthSuccess}
                        />

                        <GlobalStyles/>

                        <Particles/>

                        <HeaderWrapper>
                            <Container>
                                <HeaderContent>
                                    <Logo>
                                        <LogoText>PREDATORY BEAVERS</LogoText>
                                        <BeaverIcon>🐾</BeaverIcon>
                                    </Logo>
                                    <AuthButtons>
                                        <AuthButton variant="login" onClick={openLoginModal}>Войти</AuthButton>
                                        <AuthButton variant="register"
                                                    onClick={openRegisterModal}>Регистрация</AuthButton>
                                    </AuthButtons>
                                </HeaderContent>
                            </Container>
                        </HeaderWrapper>

                        <HeroSection>
                            <Container>
                                <HeroContent>
                                    <HeroTitle>Грызём <span>конкурентов</span>,<br/>строим <span>победы</span>!</HeroTitle>
                                    <HeroSubtitle>Мы – не просто киберспортивная команда.</HeroSubtitle>
                                    <HeroDescription>
                                        Мы – стая бобров-хищников, которые не знают слова "сдаться". Наша миссия –
                                        доминировать в киберспорте,
                                        оставляя за собой лишь щепки от вражеских стратегий.
                                    </HeroDescription>
                                    <CTAButton onClick={handleJoinClick}>Присоединиться</CTAButton>
                                </HeroContent>
                            </Container>
                            <FloatingIcon>
                                <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M50 15 A35 35 0 1 0 50 85 A35 35 0 1 0 50 15 Z" fill="#00b4d8"
                                          opacity="0.2"/>
                                    <path d="M30 40 Q50 20 70 40 Q65 60 30 40 Z" fill="#0066cc" opacity="0.3"/>
                                    <circle cx="40" cy="35" r="5" fill="#00e6ff" opacity="0.5"/>
                                    <circle cx="60" cy="35" r="5" fill="#00e6ff" opacity="0.5"/>
                                </svg>
                            </FloatingIcon>
                        </HeroSection>

                        <StatsSection>
                            <Container>
                                <StatsContainer>
                                    <StatItem>
                                        <StatNumber>27</StatNumber>
                                        <StatLabel>Побед</StatLabel>
                                    </StatItem>
                                    <StatItem>
                                        <StatNumber>13</StatNumber>
                                        <StatLabel>Турниров</StatLabel>
                                    </StatItem>
                                    <StatItem>
                                        <StatNumber>5</StatNumber>
                                        <StatLabel>Игроков</StatLabel>
                                    </StatItem>
                                    <StatItem>
                                        <StatNumber>2023</StatNumber>
                                        <StatLabel>Основание</StatLabel>
                                    </StatItem>
                                </StatsContainer>
                            </Container>
                        </StatsSection>

                        <BeaverSection>
                            <Container>
                                <BeaverContainer>
                                    <BeaverContent>
                                        <SectionTitle>Наша <span>философия</span></SectionTitle>
                                        <p>
                                            Как бобры, мы методично строим наши победы, создавая непробиваемые
                                            стратегии. Как хищники, мы безжалостно
                                            разрываем на части любые препятствия на пути к чемпионству.
                                        </p>
                                        <p>
                                            Наша команда сочетает в себе терпение строителя и агрессию охотника, что
                                            делает нас непобедимыми в
                                            киберспортивных баталиях.
                                        </p>
                                    </BeaverContent>
                                    <BeaverImage>
                                        <Beaver>🦫</Beaver>
                                    </BeaverImage>
                                </BeaverContainer>
                            </Container>
                        </BeaverSection>

                        <FeaturesSection>
                            <Container>
                                <SectionTitle>Наши <span>преимущества</span></SectionTitle>
                                <FeaturesGrid>
                                    <FeatureCard>
                                        <FeatureIcon>
                                            <i className="fas fa-trophy"></i>
                                        </FeatureIcon>
                                        <FeatureTitle>Профессионализм</FeatureTitle>
                                        <FeatureDescription>
                                            Наша команда состоит из опытных игроков с многолетним опытом в киберспорте.
                                        </FeatureDescription>
                                    </FeatureCard>
                                    <FeatureCard>
                                        <FeatureIcon>
                                            <i className="fas fa-users"></i>
                                        </FeatureIcon>
                                        <FeatureTitle>Стратегия</FeatureTitle>
                                        <FeatureDescription>
                                            Разрабатываем уникальные тактики, которые позволяют нам доминировать над
                                            соперниками.
                                        </FeatureDescription>
                                    </FeatureCard>
                                    <FeatureCard>
                                        <FeatureIcon>
                                            <i className="fas fa-bolt"></i>
                                        </FeatureIcon>
                                        <FeatureTitle>Скорость</FeatureTitle>
                                        <FeatureDescription>
                                            Молниеносная реакция и быстрое принятие решений - наше конкурентное
                                            преимущество.
                                        </FeatureDescription>
                                    </FeatureCard>
                                </FeaturesGrid>
                            </Container>
                        </FeaturesSection>
                    </Style>
                </AlignContentContainer>
            </CommonWrapper>
        </RootPage>
    );
};
