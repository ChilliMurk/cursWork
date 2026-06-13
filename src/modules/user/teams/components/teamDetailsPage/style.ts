import styled from "@emotion/styled";

export const TeamDetailsContainer = styled.div`
    max-width: 1000px;
    margin: 0 auto;
`;

export const BackButton = styled.button`
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 10px 20px;
    background: rgba(0, 180, 216, 0.15);
    color: #00e6ff;
    border: 1px solid #00b4d8;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.3s;
    font-family: 'Rajdhani', sans-serif;
    font-weight: 600;
    margin-bottom: 25px;

    &:hover {
        background: rgba(0, 180, 216, 0.25);
        box-shadow: 0 0 15px rgba(0, 180, 216, 0.4);
    }
`;

export const TeamHeader = styled.div`
    background: linear-gradient(145deg, #132f4c, #0a1929);
    border: 1px solid rgba(0, 180, 216, 0.2);
    border-radius: 12px;
    padding: 30px;
    margin-bottom: 25px;
    position: relative;
`;

export const TeamGameBadge = styled.div`
    position: absolute;
    top: -10px;
    right: 20px;
    background: linear-gradient(90deg, #0066cc, #00b4d8);
    color: white;
    padding: 5px 15px;
    border-radius: 15px;
    font-size: 0.8rem;
    font-weight: 600;
`;

export const TeamTitle = styled.h1`
    font-family: 'Orbitron', sans-serif;
    font-size: 2.2rem;
    color: #00e6ff;
    margin-bottom: 15px;
    text-shadow: 0 0 10px rgba(0, 230, 255, 0.3);
`;

export const TeamDescription = styled.p`
    color: #e0e0e0;
    font-size: 1.1rem;
    line-height: 1.6;
    margin-bottom: 20px;
`;

export const TeamMeta = styled.div`
    display: flex;
    gap: 30px;
    margin-bottom: 20px;
    flex-wrap: wrap;
`;

export const MetaItem = styled.div`
    display: flex;
    flex-direction: column;
    gap: 5px;
`;

export const MetaLabel = styled.span`
    color: #a0a0a0;
    font-size: 0.9rem;
`;

export const MetaValue = styled.span`
    color: #00e6ff;
    font-weight: 600;
    font-size: 1.1rem;
`;

export const Rating = styled.div`
    display: flex;
    align-items: center;
    gap: 5px;
    color: #ffd700;
    font-weight: 600;
`;

export const ContentGrid = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 25px;

    @media (max-width: 768px) {
        grid-template-columns: 1fr;
    }
`;

export const ContentCard = styled.div`
    background: linear-gradient(145deg, #132f4c, #0a1929);
    border: 1px solid rgba(0, 180, 216, 0.2);
    border-radius: 12px;
    padding: 25px;
`;

export const CardTitle = styled.h3`
    font-family: 'Orbitron', sans-serif;
    font-size: 1.5rem;
    color: #00e6ff;
    margin-bottom: 20px;
    text-shadow: 0 0 10px rgba(0, 230, 255, 0.3);
    display: flex;
    align-items: center;
    gap: 10px;
`;

export const MembersList = styled.div`
    display: flex;
    flex-direction: column;
    gap: 15px;
`;

export const MemberItem = styled.div`
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 12px;
    background: rgba(0, 180, 216, 0.1);
    border-radius: 8px;
    border: 1px solid rgba(0, 180, 216, 0.2);
`;

export const MemberAvatar = styled.div`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: linear-gradient(145deg, #0066cc, #00b4d8);
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-weight: 600;
    font-size: 1rem;
`;

export const MemberName = styled.div`
    color: #e0e0e0;
    font-weight: 600;

    &.captain {
        color: #00e6ff;
    }
`;

export const RequirementText = styled.p`
    color: #e0e0e0;
    line-height: 1.6;
    margin-bottom: 20px;
`;

export const ContactInfo = styled.div`
    background: rgba(0, 180, 216, 0.1);
    padding: 15px;
    border-radius: 8px;
    border: 1px solid rgba(0, 180, 216, 0.2);
    color: #00e6ff;
    font-weight: 600;
`;

export const ActionButtons = styled.div`
    display: flex;
    gap: 15px;
    margin-top: 30px;
`;

export const PrimaryButton = styled.button`
    padding: 12px 24px;
    background: linear-gradient(90deg, #0066cc, #00b4d8);
    color: #ffffff;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.3s;
    font-family: 'Rajdhani', sans-serif;
    font-weight: 600;

    &:hover {
        box-shadow: 0 0 15px rgba(0, 180, 216, 0.5);
        transform: translateY(-2px);
    }
`;

export const SecondaryButton = styled.button`
    padding: 12px 24px;
    background: rgba(0, 180, 216, 0.15);
    color: #00e6ff;
    border: 1px solid #00b4d8;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.3s;
    font-family: 'Rajdhani', sans-serif;
    font-weight: 600;

    &:hover {
        background: rgba(0, 180, 216, 0.25);
        box-shadow: 0 0 15px rgba(0, 180, 216, 0.4);
    }
`;

export const DangerButton = styled.button`
    padding: 12px 24px;
    background: rgba(244, 67, 54, 0.15);
    color: #ff5252;
    border: 1px solid rgba(244, 67, 54, 0.5);
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.3s;
    font-family: 'Rajdhani', sans-serif;
    font-weight: 600;
    width: 100%;
    margin-top: 15px;

    &:hover {
        background: rgba(244, 67, 54, 0.25);
        box-shadow: 0 0 15px rgba(244, 67, 54, 0.3);
        transform: translateY(-2px);
    }
`;

export const DeleteIcon = styled.span`
    font-size: 1rem;
`;

export const DeleteButton = styled.button`
    width: 100%;
    margin-top: 15px;
    padding: 12px 24px;
    background: rgba(244, 67, 54, 0.15);
    color: #ff5252;
    border: 1px solid rgba(244, 67, 54, 0.5);
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.3s;
    font-family: 'Rajdhani', sans-serif;
    font-weight: 600;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;

    &:hover {
        background: rgba(244, 67, 54, 0.25);
        box-shadow: 0 0 15px rgba(244, 67, 54, 0.3);
        transform: translateY(-2px);
    }
`;

export const DisabledButton = styled.button`
    width: 100%;
    padding: 10px;
    background: rgba(0, 180, 216, 0.1);
    color: #8fa3bf;
    border: 1px solid rgba(0, 180, 216, 0.3);
    border-radius: 8px;
    font-family: 'Rajdhani', sans-serif;
    font-weight: 600;
    cursor: not-allowed;
    opacity: 0.7;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    margin-top: 15px;
`;

export const InfoMessage = styled.div`
    background: rgba(0, 180, 216, 0.1);
    border-left: 4px solid #00b4d8;
    padding: 12px 16px;
    border-radius: 8px;
    margin-bottom: 20px;
    display: flex;
    align-items: center;
    gap: 12px;
    color: #cceeff;
    font-family: 'Rajdhani', sans-serif;
    font-size: 0.9rem;

    i {
        font-size: 1.2rem;
        color: #00b4d8;
    }

    strong {
        color: #00e6ff;
    }
`;
