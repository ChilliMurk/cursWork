import {keyframes} from "@emotion/react";
import styled from "@emotion/styled";

interface ParticleProps {
    size: number;
    color: string;
    left: number;
    top: number;
    duration: number;
    delay: number;
}

interface SectionProps {
    isActive: boolean;
}

export const CustomNavLink = styled.a<{ isActive: boolean }>`
    display: flex;
    align-items: center;
    gap: 15px;
    padding: 15px 20px;
    color: #e0e0e0;
    text-decoration: none;
    border-radius: 8px;
    transition: all 0.3s;
    font-weight: 600;
    background: ${props => props.isActive
            ? 'linear-gradient(90deg, #0066cc, #00b4d8)'
            : 'transparent'};
    color: ${props => props.isActive ? '#ffffff' : '#e0e0e0'};
    box-shadow: ${props => props.isActive
            ? '0 5px 15px rgba(0, 180, 216, 0.3)'
            : 'none'};
    cursor: pointer;

    &:hover {
        background: ${props => props.isActive
                ? 'linear-gradient(90deg, #0066cc, #00b4d8)'
                : 'rgba(0, 180, 216, 0.15)'};
        color: ${props => props.isActive ? '#ffffff' : '#00e6ff'};
        transform: translateX(5px);
    }

    @media (max-width: 768px) {
        justify-content: center;
        text-align: center;
        padding: 12px;
    }
`;

const fadeIn = keyframes`
    from {
        opacity: 0;
        transform: translateY(20px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
`;

const particleFloat = keyframes`
    0% {
        transform: translateY(0) rotate(0deg);
        opacity: 0.3;
    }
    100% {
        transform: translateY(-100vh) rotate(360deg);
        opacity: 0;
    }
`;

export const AppContainer = styled.div`
    display: flex;
    min-height: 100vh;
`;

export const Sidebar = styled.aside`
    width: 280px;
    background: linear-gradient(180deg, #132f4c, #0a1929);
    border-right: 1px solid rgba(0, 180, 216, 0.3);
    padding: 20px 0;
    position: fixed;
    height: 100vh;
    overflow-y: auto;
    z-index: 100;

    @media (max-width: 768px) {
        width: 100%;
        height: auto;
        position: relative;
        border-right: none;
        border-bottom: 1px solid rgba(0, 180, 216, 0.3);
    }
`;

export const MainContent = styled.main`
    flex: 1;
    margin-left: 280px;
    padding: 0;
    min-height: 100vh;

    @media (max-width: 768px) {
        margin-left: 0;
    }
`;

export const ContentArea = styled.div`
    padding: 40px;

    @media (max-width: 768px) {
        padding: 20px;
    }
`;

export const SidebarHeader = styled.div`
    padding: 20px;
    text-align: center;
    border-bottom: 1px solid rgba(0, 180, 216, 0.3);
    margin-bottom: 20px;
`;

export const SidebarLogo = styled.div`
    font-family: 'Orbitron', sans-serif;
    font-weight: 900;
    font-size: 1.8rem;
    color: #00e6ff;
    text-shadow: 0 0 10px rgba(0, 230, 255, 0.7);
    margin-bottom: 10px;
`;

export const NavList = styled.ul`
    list-style: none;
    padding: 0 15px;

    @media (max-width: 768px) {
        display: flex;
        flex-wrap: wrap;
        gap: 10px;
    }
`;

export const NavItem = styled.li`
    margin-bottom: 5px;

    @media (max-width: 768px) {
        flex: 1;
        min-width: 120px;
    }
`;

export const NavLink = styled.a<SectionProps>`
    display: flex;
    align-items: center;
    gap: 15px;
    padding: 15px 20px;
    color: #e0e0e0;
    text-decoration: none;
    border-radius: 8px;
    transition: all 0.3s;
    font-weight: 600;
    background: ${props => props.isActive
            ? 'linear-gradient(90deg, #0066cc, #00b4d8)'
            : 'transparent'};
    color: ${props => props.isActive ? '#ffffff' : '#e0e0e0'};
    box-shadow: ${props => props.isActive
            ? '0 5px 15px rgba(0, 180, 216, 0.3)'
            : 'none'};

    &:hover {
        background: ${props => props.isActive
                ? 'linear-gradient(90deg, #0066cc, #00b4d8)'
                : 'rgba(0, 180, 216, 0.15)'};
        color: ${props => props.isActive ? '#ffffff' : '#00e6ff'};
        transform: translateX(5px);
    }

    @media (max-width: 768px) {
        justify-content: center;
        text-align: center;
        padding: 12px;
    }
`;

export const LogoutButton = styled.button`
    display: flex;
    align-items: center;
    gap: 15px;
    padding: 15px 20px;
    background: transparent;
    color: #00e6ff;
    border: 1px solid #00b4d8;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.3s;
    font-family: 'Rajdhani', sans-serif;
    font-weight: 600;
    width: calc(100% - 30px);
    margin: 20px 15px;

    &:hover {
        background: rgba(0, 180, 216, 0.1);
        box-shadow: 0 0 10px rgba(0, 180, 216, 0.4);
    }
`;

export const TopHeader = styled.header`
    background: rgba(10, 25, 41, 0.9);
    backdrop-filter: blur(10px);
    border-bottom: 1px solid rgba(0, 180, 216, 0.3);
    padding: 15px 40px;
    position: sticky;
    top: 0;
    z-index: 90;
    display: flex;
    justify-content: space-between;
    align-items: center;

    @media (max-width: 768px) {
        flex-direction: column;
        gap: 15px;
        padding: 15px 20px;
        text-align: center;
    }
`;

export const PageTitle = styled.h1`
    font-family: 'Orbitron', sans-serif;
    font-size: 2.2rem;
    color: #00e6ff;
    text-shadow: 0 0 10px rgba(0, 230, 255, 0.5);

    span {
        color: #ffffff;
    }

    @media (max-width: 768px) {
        font-size: 1.8rem;
    }
`;

export const UserInfoTop = styled.div`
    display: flex;
    align-items: center;
    gap: 15px;
    background: rgba(0, 180, 216, 0.1);
    padding: 10px 20px;
    border-radius: 25px;
    border: 1px solid rgba(0, 180, 216, 0.3);
    transition: all 0.3s;

    &:hover {
        background: rgba(0, 180, 216, 0.15);
        box-shadow: 0 0 15px rgba(0, 180, 216, 0.2);
    }

    @media (max-width: 480px) {
        flex-direction: column;
        text-align: center;
        padding: 10px;
        border-radius: 15px;
    }
`;

export const UserAvatarTop = styled.div`
    width: 45px;
    height: 45px;
    border-radius: 50%;
    background: linear-gradient(145deg, #0066cc, #00b4d8);
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-weight: 600;
    font-size: 1.2rem;
    flex-shrink: 0;

    @media (max-width: 968px) {
        width: 40px;
        height: 40px;
        font-size: 1.1rem;
    }
`;

export const UserDetailsTop = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-end;

    @media (max-width: 480px) {
        align-items: center;
    }
`;

export const UserNameTop = styled.div`
    color: #00e6ff;
    font-weight: 600;
    font-size: 1.1rem;
    white-space: nowrap;

    @media (max-width: 968px) {
        font-size: 1rem;
    }
`;

export const UserStatusTop = styled.div`
    color: #e0e0e0;
    font-size: 0.9rem;
    opacity: 0.8;
    white-space: nowrap;

    @media (max-width: 968px) {
        font-size: 0.8rem;
    }
`;

export const DashboardSection = styled.section<SectionProps>`
    display: ${props => props.isActive ? 'block' : 'none'};
    animation: ${props => props.isActive ? fadeIn : 'none'} 0.5s ease;
`;

export const DevelopmentMessage = styled.div`
    text-align: center;
    padding: 60px 20px;
    background: linear-gradient(145deg, #132f4c, #0a1929);
    border: 1px solid rgba(0, 180, 216, 0.2);
    border-radius: 12px;
    margin: 40px 0;
`;

export const DevIcon = styled.div`
    font-size: 4rem;
    color: #00b4d8;
    margin-bottom: 25px;
    opacity: 0.8;
`;

export const DevTitle = styled.h2`
    font-family: 'Orbitron', sans-serif;
    font-size: 2.2rem;
    color: #00e6ff;
    margin-bottom: 15px;
    text-shadow: 0 0 10px rgba(0, 230, 255, 0.3);
`;

export const DevText = styled.p`
    font-size: 1.3rem;
    color: #e0e0e0;
    margin-bottom: 30px;
    max-width: 600px;
    margin-left: auto;
    margin-right: auto;
    line-height: 1.6;
`;

export const MainFooter = styled.footer`
    background-color: #1a1a1a;
    padding: 30px 40px;
    text-align: center;
    border-top: 1px solid rgba(0, 180, 216, 0.3);
    margin-top: 60px;
`;

export const SocialLinks = styled.div`
    display: flex;
    justify-content: center;
    gap: 15px;
    margin-bottom: 20px;
`;

export const SocialLink = styled.a`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 45px;
    height: 45px;
    border-radius: 50%;
    background: linear-gradient(145deg, #132f4c, #0a1929);
    color: #00e6ff;
    text-decoration: none;
    transition: all 0.3s;
    border: 1px solid rgba(0, 180, 216, 0.3);

    &:hover {
        transform: translateY(-3px);
        color: #ffffff;
        background: linear-gradient(145deg, #0066cc, #00b4d8);
        box-shadow: 0 5px 15px rgba(0, 180, 216, 0.4);
    }
`;

export const Copyright = styled.p`
    color: #e0e0e0;
    font-size: 0.9rem;
    opacity: 0.8;
`;

export const ParticlesContainer = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
`;

export const Particle = styled.div<ParticleProps>`
    position: absolute;
    background-color: ${props => props.color};
    border-radius: 50%;
    opacity: 0.5;
    animation: ${particleFloat} ${props => props.duration}s infinite linear;
    animation-delay: ${props => props.delay}s;
    width: ${props => props.size}px;
    height: ${props => props.size}px;
    left: ${props => props.left}vw;
    top: ${props => props.top}vh;
`;
