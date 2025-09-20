import styled from "@emotion/styled";

export const EventDetailsContainer = styled.div`
    max-width: 900px;
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

export const EventHeader = styled.div`
    background: linear-gradient(145deg, #132f4c, #0a1929);
    border: 1px solid rgba(0, 180, 216, 0.2);
    border-radius: 12px;
    padding: 30px;
    margin-bottom: 20px;
`;

export const EventGame = styled.div`
    color: #00e6ff;
    font-size: 1.1rem;
    font-weight: 600;
    margin-bottom: 10px;
`;

export const EventStatus = styled.div<{ status: string }>`
    display: inline-block;
    padding: 6px 12px;
    border-radius: 20px;
    font-size: 0.9rem;
    font-weight: 600;
    margin-bottom: 15px;
    background: ${props =>
    props.status === 'upcoming' ? 'rgba(0, 180, 216, 0.2)' :
        props.status === 'ongoing' ? 'rgba(76, 175, 80, 0.2)' :
            'rgba(158, 158, 158, 0.2)'};
    color: ${props =>
    props.status === 'upcoming' ? '#00b4d8' :
        props.status === 'ongoing' ? '#4caf50' :
            '#9e9e9e'};
    border: 1px solid ${props =>
    props.status === 'upcoming' ? 'rgba(0, 180, 216, 0.3)' :
        props.status === 'ongoing' ? 'rgba(76, 175, 80, 0.3)' :
            'rgba(158, 158, 158, 0.3)'};
`;

export const EventTitle = styled.h1`
    font-family: 'Orbitron', sans-serif;
    font-size: 2.2rem;
    color: #00e6ff;
    margin-bottom: 20px;
    text-shadow: 0 0 10px rgba(0, 230, 255, 0.3);
`;

export const EventContent = styled.div`
    display: grid;
    grid-template-columns: 2fr 1fr;
    gap: 30px;

    @media (max-width: 768px) {
        grid-template-columns: 1fr;
    }
`;

export const EventInfo = styled.div`
    background: linear-gradient(145deg, #132f4c, #0a1929);
    border: 1px solid rgba(0, 180, 216, 0.2);
    border-radius: 12px;
    padding: 25px;
`;

export const EventSidebar = styled.div`
    background: linear-gradient(145deg, #132f4c, #0a1929);
    border: 1px solid rgba(0, 180, 216, 0.2);
    border-radius: 12px;
    padding: 25px;
`;

export const SectionTitle = styled.h2`
    color: #00e6ff;
    font-size: 1.4rem;
    margin-bottom: 20px;
    font-family: 'Rajdhani', sans-serif;
    font-weight: 600;
`;

export const InfoGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
    margin-bottom: 25px;

    @media (max-width: 480px) {
        grid-template-columns: 1fr;
    }
`;

export const InfoItem = styled.div`
    display: flex;
    flex-direction: column;
    gap: 5px;
`;

export const InfoLabel = styled.span`
    color: #a0a0a0;
    font-size: 0.9rem;
`;

export const InfoValue = styled.span`
    color: #e0e0e0;
    font-size: 1.1rem;
    font-weight: 600;
`;

export const Description = styled.p`
    color: #e0e0e0;
    line-height: 1.6;
    margin-bottom: 25px;
`;

export const Requirements = styled.div`
    background: rgba(0, 180, 216, 0.1);
    border: 1px solid rgba(0, 180, 216, 0.2);
    border-radius: 8px;
    padding: 20px;
    margin-bottom: 25px;
`;

export const RequirementsTitle = styled.h3`
    color: #00e6ff;
    font-size: 1.1rem;
    margin-bottom: 10px;
`;

export const RequirementsList = styled.ul`
    color: #e0e0e0;
    padding-left: 20px;
    line-height: 1.6;
`;

export const ParticipateButton = styled.button<{ isParticipating: boolean; disabled: boolean }>`
    width: 100%;
    padding: 15px;
    background: ${props =>
    props.isParticipating ? 'rgba(244, 67, 54, 0.2)' :
        props.disabled ? 'rgba(158, 158, 158, 0.2)' :
            'linear-gradient(90deg, #0066cc, #00b4d8)'};
    color: ${props =>
    props.isParticipating ? '#ff5252' :
        props.disabled ? '#9e9e9e' :
            '#ffffff'};
    border: 1px solid ${props =>
    props.isParticipating ? 'rgba(244, 67, 54, 0.3)' :
        props.disabled ? 'rgba(158, 158, 158, 0.3)' :
            'rgba(0, 180, 216, 0.3)'};
    border-radius: 8px;
    cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
    font-family: 'Rajdhani', sans-serif;
    font-weight: 600;
    font-size: 1.1rem;
    transition: all 0.3s;

    &:hover:not(:disabled) {
        ${props => !props.disabled && !props.isParticipating && `
      box-shadow: 0 0 20px rgba(0, 180, 216, 0.5);
      transform: translateY(-2px);
    `}
        ${props => props.isParticipating && `
      background: rgba(244, 67, 54, 0.3);
    `}
    }
`;

export const ParticipantsList = styled.div`
    margin-top: 20px;
`;

export const ParticipantCount = styled.div`
    color: #00e6ff;
    font-weight: 600;
    margin-bottom: 15px;
`;

export const EmptyParticipants = styled.div`
    color: #a0a0a0;
    text-align: center;
    padding: 20px;
`;
