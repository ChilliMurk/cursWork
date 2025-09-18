import styled from "@emotion/styled";
import {keyframes} from "@emotion/react";


export const Style = styled('div')`
    display: inline-block;
`

// Анимации
const pulse = keyframes`
    0% {
        transform: scale(1);
    }
    50% {
        transform: scale(1.1);
    }
    100% {
        transform: scale(1);
    }
`;

const floatBeaver = keyframes`
    0% {
        transform: translateY(0) rotate(0deg);
    }
    50% {
        transform: translateY(-20px) rotate(5deg);
    }
    100% {
        transform: translateY(0) rotate(0deg);
    }
`;

const float = keyframes`
    0% {
        transform: translateY(-50%) rotate(0deg);
    }
    50% {
        transform: translateY(-55%) rotate(5deg);
    }
    100% {
        transform: translateY(-50%) rotate(0deg);
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

// Контейнер
export const Container = styled.div`
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
`;

// Header
export const HeaderWrapper = styled.header`
    padding: 15px 0;
    position: relative;
    z-index: 100;
    background-color: rgba(10, 25, 41, 0.9);
    backdrop-filter: blur(10px);
    border-bottom: 1px solid rgba(0, 180, 216, 0.3);
`;

export const HeaderContent = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;

    @media (max-width: 768px) {
        flex-direction: column;
        text-align: center;
        gap: 15px;
    }
`;

export const Logo = styled.div`
    display: flex;
    align-items: center;
    position: relative;
`;

export const LogoText = styled.div`
    font-family: 'Orbitron', sans-serif;
    font-weight: 900;
    font-size: 2.2rem;
    text-transform: uppercase;
    color: #00e6ff;
    text-shadow: 0 0 10px rgba(0, 230, 255, 0.7);
    letter-spacing: 2px;
`;

export const BeaverIcon = styled.div`
    margin-left: 15px;
    font-size: 2.5rem;
    color: #00b4d8;
    animation: ${pulse} 2s infinite;
`;

export const AuthButtons = styled.div`
    display: flex;
    gap: 15px;

    @media (max-width: 768px) {
        margin-top: 15px;
    }
`;

interface AuthButtonProps {
    variant: 'login' | 'register';
}

export const AuthButton = styled.a<AuthButtonProps>`
    padding: 10px 25px;
    border-radius: 4px;
    font-weight: 600;
    text-decoration: none;
    transition: all 0.3s;
    font-size: 1rem;
    cursor: pointer;

    ${props => props.variant === 'login' ? `
    background: transparent;
    color: #00e6ff;
    border: 1px solid #00b4d8;
    
    &:hover {
      background: rgba(0, 180, 216, 0.1);
      box-shadow: 0 0 10px rgba(0, 180, 216, 0.4);
    }
  ` : `
    background: linear-gradient(90deg, #0066cc, #00b4d8);
    color: white;
    border: none;
    box-shadow: 0 0 10px rgba(0, 102, 204, 0.5);
    
    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 5px 15px rgba(0, 180, 216, 0.6);
    }
  `}
`;

// Hero Section
export const HeroSection = styled.section`
    min-height: 90vh;
    display: flex;
    align-items: center;
    position: relative;
    padding: 80px 0;
    overflow: hidden;
    background-color: #0a1929;
    color: #e0e0e0;
    background-image: radial-gradient(circle at 15% 30%, rgba(0, 180, 216, 0.1) 0%, transparent 25%),
    radial-gradient(circle at 85% 70%, rgba(0, 102, 204, 0.1) 0%, transparent 25%);
`;

export const HeroContent = styled.div`
    position: relative;
    z-index: 10;
    max-width: 800px;
`;

export const HeroTitle = styled.h1`
    font-family: 'Orbitron', sans-serif;
    font-size: 3.5rem;
    font-weight: 900;
    margin-bottom: 20px;
    color: #ffffff;
    text-shadow: 0 0 15px rgba(0, 230, 255, 0.5);
    line-height: 1.2;

    @media (max-width: 992px) {
        font-size: 2.8rem;
    }

    @media (max-width: 768px) {
        font-size: 2.2rem;
    }

    span {
        background: linear-gradient(90deg, #00b4d8, #00e6ff);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        text-shadow: none;
    }
`;

export const HeroSubtitle = styled.p`
    font-size: 1.5rem;
    margin-bottom: 30px;
    color: #00b4d8;
    font-weight: 400;

    @media (max-width: 768px) {
        font-size: 1.2rem;
    }
`;

export const HeroDescription = styled.p`
    font-size: 1.2rem;
    margin-bottom: 40px;
    max-width: 600px;
    color: #e0e0e0;
`;

export const CTAButton = styled.a`
    display: inline-block;
    padding: 15px 40px;
    background: linear-gradient(90deg, #0066cc, #00b4d8);
    color: white;
    text-decoration: none;
    font-weight: 700;
    font-size: 1.1rem;
    border-radius: 4px;
    transition: all 0.3s;
    box-shadow: 0 5px 15px rgba(0, 102, 204, 0.5);
    text-transform: uppercase;
    letter-spacing: 1px;
    position: relative;
    overflow: hidden;
    z-index: 1;
    cursor: pointer;

    &:before {
        content: '';
        position: absolute;
        top: 0;
        left: -100%;
        width: 100%;
        height: 100%;
        background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
        transition: all 0.5s;
        z-index: -1;
    }

    &:hover:before {
        left: 100%;
    }

    &:hover {
        transform: translateY(-3px);
        box-shadow: 0 8px 20px rgba(0, 180, 216, 0.6);
    }
`;

export const FloatingIcon = styled.div`
    position: absolute;
    right: 10%;
    top: 50%;
    transform: translateY(-50%);
    width: 300px;
    height: 300px;
    opacity: 0.7;
    animation: ${float} 6s ease-in-out infinite;

    @media (max-width: 992px) {
        display: none;
    }
`;

// Stats Section
export const StatsSection = styled.section`
    background-color: #132f4c;
    padding: 60px 0;
    border-top: 1px solid rgba(0, 180, 216, 0.3);
    border-bottom: 1px solid rgba(0, 180, 216, 0.3);
`;

export const StatsContainer = styled.div`
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
`;

export const StatItem = styled.div`
    text-align: center;
    padding: 20px;
    min-width: 200px;

    @media (max-width: 768px) {
        min-width: 140px;
    }
`;

export const StatNumber = styled.div`
    font-family: 'Orbitron', sans-serif;
    font-size: 3rem;
    font-weight: 700;
    color: #00e6ff;
    margin-bottom: 10px;

    @media (max-width: 768px) {
        font-size: 2rem;
    }
`;

export const StatLabel = styled.div`
    font-size: 1.2rem;
    color: #e0e0e0;
`;

// Features Section
export const FeaturesSection = styled.section`
    padding: 80px 0;
    background-color: #0a1929;
`;

export const SectionTitle = styled.h2`
    text-align: center;
    font-family: 'Orbitron', sans-serif;
    font-size: 2.5rem;
    margin-bottom: 60px;
    color: #ffffff;

    span {
        color: #00e6ff;
    }
`;

export const FeaturesGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 30px;
`;

export const FeatureCard = styled.div`
    background: linear-gradient(145deg, #132f4c, #0a1929);
    border: 1px solid rgba(0, 180, 216, 0.2);
    border-radius: 8px;
    padding: 30px;
    transition: all 0.3s;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);

    &:hover {
        transform: translateY(-10px);
        border-color: #00b4d8;
        box-shadow: 0 15px 25px rgba(0, 180, 216, 0.2);
    }
`;

export const FeatureIcon = styled.div`
    font-size: 2.5rem;
    color: #00e6ff;
    margin-bottom: 20px;
`;

export const FeatureTitle = styled.h3`
    font-size: 1.5rem;
    margin-bottom: 15px;
    color: #ffffff;
`;

export const FeatureDescription = styled.p`
    color: #e0e0e0;
`;

// Beaver Section
export const BeaverSection = styled.section`
    padding: 80px 0;
    background: linear-gradient(to right, #132f4c, #0a1929);
    position: relative;
    overflow: hidden;
`;

export const BeaverContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;

    @media (max-width: 768px) {
        flex-direction: column;
    }
`;

export const BeaverContent = styled.div`
    flex: 1;
    min-width: 300px;
    padding: 20px;
`;

export const BeaverImage = styled.div`
    flex: 1;
    text-align: center;
    min-width: 300px;
`;

export const Beaver = styled.div`
    font-size: 15rem;
    color: #00b4d8;
    opacity: 0.7;
    filter: drop-shadow(0 0 15px rgba(0, 180, 216, 0.5));
    animation: ${floatBeaver} 6s ease-in-out infinite;

    @media (max-width: 992px) {
        font-size: 10rem;
    }

    @media (max-width: 768px) {
        font-size: 8rem;
    }
`;

// Footer
export const Footer = styled.footer`
    background-color: #1a1a1a;
    padding: 40px 0;
    text-align: center;
    border-top: 1px solid rgba(0, 180, 216, 0.3);
`;

export const SocialLinks = styled.div`
    display: flex;
    justify-content: center;
    margin-bottom: 20px;
`;

export const SocialLink = styled.a`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: linear-gradient(145deg, #132f4c, #0a1929);
    color: #00e6ff;
    margin: 0 10px;
    text-decoration: none;
    transition: all 0.3s;
    border: 1px solid rgba(0, 180, 216, 0.3);

    &:hover {
        transform: translateY(-5px);
        color: #ffffff;
        background: linear-gradient(145deg, #0066cc, #00b4d8);
        box-shadow: 0 5px 15px rgba(0, 180, 216, 0.4);
    }
`;

export const Copyright = styled.p`
    color: #e0e0e0;
    font-size: 0.9rem;
`;

// Particles
export const ParticlesContainer = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1;
    pointer-events: none;
`;

export interface ParticleProps {
    size: number;
    color: string;
    left: number;
    top: number;
    duration: number;
    delay: number;
}

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
