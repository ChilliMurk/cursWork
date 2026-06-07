import styled from "@emotion/styled";

export const RequestsContainer = styled.div`
    max-width: 1300px;
    width: 92%;
    margin: 0 auto;
    position: relative;
    z-index: 2;
    padding: 2rem 0 3rem;
`;

export const NavBar = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2rem;
    flex-wrap: wrap;
    gap: 15px;
`;

export const BackLink = styled.button`
    background: rgba(0, 180, 216, 0.15);
    border: 1px solid #00b4d8;
    color: #00e6ff;
    padding: 10px 28px;
    border-radius: 40px;
    font-weight: 600;
    font-size: 0.95rem;
    cursor: pointer;
    transition: all 0.2s;
    display: inline-flex;
    align-items: center;
    gap: 10px;
    font-family: 'Rajdhani', sans-serif;

    &:hover {
        background: rgba(0, 180, 216, 0.3);
        box-shadow: 0 0 12px rgba(0, 180, 216, 0.4);
        transform: translateY(-2px);
    }
`;

export const PageTitle = styled.div`
    font-family: 'Orbitron', sans-serif;
    font-size: 2rem;
    color: #00e6ff;
    text-shadow: 0 0 8px rgba(0, 230, 255, 0.5);
    display: flex;
    align-items: center;
    gap: 14px;
    flex-wrap: wrap;
    justify-content: center;
`;

export const TeamBadge = styled.span`
    background: linear-gradient(90deg, #0066cc, #00b4d8);
    padding: 6px 20px;
    border-radius: 60px;
    font-weight: bold;
    font-size: 0.9rem;
    font-family: 'Rajdhani', sans-serif;
`;

export const StatsRow = styled.div`
    display: flex;
    gap: 20px;
    margin-bottom: 2rem;
    flex-wrap: wrap;
`;

export const StatCard = styled.div`
    background: linear-gradient(145deg, #132f4c, #0a1929);
    border: 1px solid rgba(0, 180, 216, 0.3);
    border-radius: 28px;
    padding: 1.2rem 2rem;
    display: flex;
    align-items: center;
    gap: 18px;
    flex: 1;
    min-width: 180px;
`;

export const StatIcon = styled.div`
    font-size: 2.2rem;
    color: #00e6ff;
`;

export const StatInfo = styled.div`
    h3 {
        font-size: 2rem;
        font-weight: 700;
        color: #ffffff;
    }
`;

export const StatNumber = styled.h3`
    font-size: 2rem;
    font-weight: 700;
    color: #ffffff;
    margin: 0;
`;

export const StatLabel = styled.p`
    color: #9bbde2;
    margin: 0;
`;

export const RequestsList = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
`;

export const RequestCard = styled.div`
    background: linear-gradient(145deg, #132f4c, #0a1929);
    border: 1px solid rgba(0, 180, 216, 0.3);
    border-radius: 32px;
    padding: 1.5rem;
    transition: all 0.2s;
    backdrop-filter: blur(2px);

    &:hover {
        border-color: #00b4d8;
        transform: translateX(5px);
        box-shadow: 0 10px 25px rgba(0, 180, 216, 0.2);
    }
`;

export const RequestHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 15px;
    margin-bottom: 1.2rem;
    padding-bottom: 0.8rem;
    border-bottom: 1px solid rgba(0, 180, 216, 0.2);
`;

export const PlayerInfo = styled.div`
    display: flex;
    align-items: center;
    gap: 16px;
`;

export const PlayerAvatar = styled.div`
    width: 65px;
    height: 65px;
    background: linear-gradient(145deg, #0066cc, #00b4d8);
    border-radius: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.8rem;
    font-weight: bold;
    box-shadow: 0 5px 12px rgba(0, 0, 0, 0.3);
`;

export const PlayerDetails = styled.div``;

export const PlayerName = styled.h3`
    font-size: 1.4rem;
    font-weight: 700;
    color: #00e6ff;
    margin: 0;
`;

export const PlayerNick = styled.div`
    font-size: 0.85rem;
    color: #bbd4ff;
`;

export const RequestDate = styled.div`
    font-size: 0.8rem;
    background: rgba(0, 180, 216, 0.2);
    padding: 5px 14px;
    border-radius: 60px;
`;

export const CoverLetter = styled.div`
    background: rgba(0, 0, 0, 0.35);
    border-radius: 24px;
    padding: 1.2rem;
    margin: 1rem 0;
    border-left: 4px solid #f39c12;
`;

export const CoverLetterLabel = styled.div`
    font-size: 0.8rem;
    text-transform: uppercase;
    letter-spacing: 1px;
    color: #f39c12;
    margin-bottom: 8px;
    display: flex;
    align-items: center;
    gap: 8px;
`;

export const CoverLetterText = styled.div`
    font-style: italic;
    color: #e0f0ff;
    line-height: 1.5;
    white-space: pre-wrap;
    word-break: break-word;
`;

export const RequestActions = styled.div`
    display: flex;
    gap: 16px;
    justify-content: flex-end;
    margin-top: 1rem;

    @media (max-width: 650px) {
        justify-content: stretch;
    }
`;

export const AcceptButton = styled.button`
    background: linear-gradient(90deg, #2ecc71, #27ae60);
    border: none;
    padding: 10px 28px;
    border-radius: 40px;
    font-weight: bold;
    color: white;
    cursor: pointer;
    transition: 0.2s;
    display: inline-flex;
    align-items: center;
    gap: 8px;
    font-family: 'Rajdhani', sans-serif;

    &:hover {
        transform: translateY(-2px);
        box-shadow: 0 5px 15px #2ecc71;
    }

    @media (max-width: 650px) {
        flex: 1;
        justify-content: center;
    }
`;

export const DeclineButton = styled.button`
    background: rgba(231, 76, 60, 0.85);
    border: none;
    padding: 10px 28px;
    border-radius: 40px;
    font-weight: bold;
    color: white;
    cursor: pointer;
    transition: 0.2s;
    display: inline-flex;
    align-items: center;
    gap: 8px;
    font-family: 'Rajdhani', sans-serif;

    &:hover {
        background: #e74c3c;
        transform: translateY(-2px);
    }

    @media (max-width: 650px) {
        flex: 1;
        justify-content: center;
    }
`;

export const EmptyState = styled.div`
    text-align: center;
    padding: 4rem 2rem;
    background: linear-gradient(145deg, #132f4c, #0a1929);
    border-radius: 48px;
    border: 1px solid rgba(0, 180, 216, 0.3);
`;

export const EmptyIcon = styled.div`
    font-size: 4rem;
    color: #00b4d8;
    margin-bottom: 1rem;
`;

export const EmptyTitle = styled.h3`
    color: #00e6ff;
    margin-bottom: 0.5rem;
`;

export const EmptyText = styled.p`
    margin-top: 10px;
    color: #a0a0a0;
`;

export const InviteButton = styled.button`
    background: linear-gradient(90deg, #0066cc, #00b4d8);
    border: none;
    padding: 12px 32px;
    border-radius: 60px;
    font-weight: bold;
    font-size: 1rem;
    margin-top: 2rem;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    gap: 12px;
    transition: 0.2s;
    font-family: 'Rajdhani', sans-serif;
    color: white;

    &:hover {
        transform: translateY(-3px);
        box-shadow: 0 8px 20px rgba(0, 180, 216, 0.5);
    }
`;

export const FooterNote = styled.div`
    margin-top: 3rem;
    text-align: center;
    font-size: 0.8rem;
    color: #6a8fb1;
    border-top: 1px solid rgba(0, 180, 216, 0.2);
    padding-top: 1.5rem;
`;

export const InviteModal = styled.div<{ isOpen: boolean }>`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.9);
    backdrop-filter: blur(10px);
    z-index: 1100;
    display: flex;
    align-items: center;
    justify-content: center;
    visibility: ${props => props.isOpen ? 'visible' : 'hidden'};
    opacity: ${props => props.isOpen ? 1 : 0};
    transition: 0.2s;
`;

export const ModalContent = styled.div`
    background: linear-gradient(145deg, #132f4c, #0a1929);
    border: 2px solid #00b4d8;
    border-radius: 44px;
    max-width: 500px;
    width: 90%;
    padding: 2rem;
`;

export const ModalTitle = styled.h3`
    color: #00e6ff;
    margin-bottom: 0.5rem;
    display: flex;
    align-items: center;
    gap: 10px;
    font-family: 'Orbitron', sans-serif;
`;

export const ModalInput = styled.input`
    width: 100%;
    margin: 8px 0;
    padding: 12px;
    background: rgba(0, 180, 216, 0.1);
    border: 1px solid #00b4d8;
    border-radius: 40px;
    color: white;
    font-family: 'Rajdhani', sans-serif;

    &:focus {
        outline: none;
        border-color: #00e6ff;
    }
`;

export const ModalTextArea = styled.textarea`
    width: 100%;
    margin: 12px 0;
    background: rgba(0, 180, 216, 0.1);
    border: 1px solid #00b4d8;
    border-radius: 24px;
    padding: 12px;
    color: white;
    font-family: 'Rajdhani', sans-serif;
    resize: vertical;

    &:focus {
        outline: none;
        border-color: #00e6ff;
    }
`;

export const ModalButtons = styled.div`
    display: flex;
    gap: 12px;
    justify-content: flex-end;
    margin-top: 20px;
`;

export const ModalButton = styled.button<{ variant: 'primary' | 'secondary' }>`
    padding: 10px 24px;
    border-radius: 40px;
    font-weight: bold;
    cursor: pointer;
    transition: 0.2s;
    font-family: 'Rajdhani', sans-serif;
    border: none;

    ${props => props.variant === 'primary' ? `
        background: linear-gradient(90deg, #0066cc, #00b4d8);
        color: white;
        
        &:hover {
            transform: translateY(-2px);
            box-shadow: 0 5px 15px rgba(0, 180, 216, 0.5);
        }
    ` : `
        background: #2c4c6e;
        color: white;
        
        &:hover {
            background: #1a3a5a;
        }
    `}
`;
