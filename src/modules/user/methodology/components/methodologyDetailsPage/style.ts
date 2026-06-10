import styled from "@emotion/styled";

export const DetailsContainer = styled.div`
    padding: 20px;
    max-width: 800px;
    margin: 0 auto;
`;

export const ButtonGroup = styled.div`
    display: flex;
    gap: 15px;
    margin-bottom: 25px;
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

    &:hover {
        background: rgba(0, 180, 216, 0.25);
        box-shadow: 0 0 15px rgba(0, 180, 216, 0.4);
    }
`;

export const EditButton = styled.button`
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 10px 20px;
    background: rgba(255, 152, 0, 0.15);
    color: #ff9800;
    border: 1px solid rgba(255, 152, 0, 0.5);
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.3s;
    font-family: 'Rajdhani', sans-serif;
    font-weight: 600;

    &:hover {
        background: rgba(255, 152, 0, 0.25);
        box-shadow: 0 0 15px rgba(255, 152, 0, 0.4);
        transform: translateY(-2px);
    }
`;

export const MethodologyHeader = styled.div`
    text-align: center;
    margin-bottom: 30px;
`;

export const MethodologyImage = styled.div`
    font-size: 4rem;
    margin-bottom: 20px;
`;

export const MethodologyTitle = styled.h1`
    color: #00e6ff;
    font-family: 'Orbitron', sans-serif;
    font-size: 2.2rem;
    margin-bottom: 15px;
`;

export const MethodologyMeta = styled.div`
    display: flex;
    justify-content: center;
    gap: 15px;
    margin-bottom: 20px;
    flex-wrap: wrap;
`;

export const MetaBadge = styled.span<{ type: string }>`
    padding: 8px 16px;
    border-radius: 20px;
    font-size: 0.9rem;
    font-weight: 600;

    ${props => props.type === 'category' ? `
    background: rgba(0, 180, 216, 0.2);
    color: #00e6ff;
  ` : props.type === 'level' ? `
    background: ${props.children === 'Начинающий' ? 'rgba(76, 175, 80, 0.2)' :
            props.children === 'Средний' ? 'rgba(255, 152, 0, 0.2)' :
                    'rgba(244, 67, 54, 0.2)'};
    color: ${props.children === 'Начинающий' ? '#4caf50' :
            props.children === 'Средний' ? '#ff9800' :
                    '#f44336'};
  ` : `
    background: rgba(158, 158, 158, 0.2);
    color: #e0e0e0;
  `}
`;

export const ContentSection = styled.section`
    margin-bottom: 30px;
`;

export const SectionTitle = styled.h2`
    color: #00e6ff;
    font-family: 'Orbitron', sans-serif;
    margin-bottom: 15px;
    font-size: 1.5rem;
`;

export const ContentItem = styled.div`
    margin-bottom: 25px;
`;

export const ContentHeading = styled.h3`
    color: #00e6ff;
    font-family: 'Orbitron', sans-serif;
    margin-bottom: 10px;
    font-size: 1.4rem;
`;

export const ContentText = styled.p`
    color: #e0e0e0;
    line-height: 1.6;
    margin-bottom: 15px;
    font-size: 1.1rem;
`;

export const ContentImage = styled.img`
    width: 100%;
    max-width: 600px;
    border-radius: 8px;
    margin: 10px 0;
    border: 1px solid rgba(0, 180, 216, 0.2);

    @media (max-width: 768px) {
        max-width: 100%;
    }
`;
