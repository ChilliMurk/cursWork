import styled from "@emotion/styled";

export const EventsContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

export const GameFilter = styled.div`
  display: flex;
  justify-content: center;
  gap: 15px;
  margin-bottom: 30px;
  flex-wrap: wrap;
`;

export const GameButton = styled.button<{ isActive: boolean }>`
  padding: 12px 24px;
  background: ${props => props.isActive
    ? 'linear-gradient(90deg, #0066cc, #00b4d8)'
    : 'rgba(19, 47, 76, 0.7)'};
  color: ${props => props.isActive ? '#ffffff' : '#e0e0e0'};
  border: 1px solid rgba(0, 180, 216, 0.3);
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s;
  font-family: 'Rajdhani', sans-serif;
  font-weight: 600;
  font-size: 1rem;
  
  &:hover {
    background: ${props => props.isActive
    ? 'linear-gradient(90deg, #0066cc, #00b4d8)'
    : 'rgba(0, 180, 216, 0.15)'};
    box-shadow: 0 0 15px rgba(0, 180, 216, 0.3);
    transform: translateY(-2px);
  }
`;

export const CreateEventButton = styled.button`
  display: block;
  margin: 0 auto 40px;
  padding: 15px 30px;
  background: linear-gradient(90deg, #0066cc, #00b4d8);
  color: #ffffff;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s;
  font-family: 'Orbitron', sans-serif;
  font-weight: 600;
  font-size: 1.1rem;
  
  &:hover {
    box-shadow: 0 0 20px rgba(0, 180, 216, 0.5);
    transform: translateY(-3px);
  }
`;

export const EventsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 25px;
  margin-bottom: 40px;
`;

export const EventCard = styled.div`
  background: linear-gradient(145deg, #132f4c, #0a1929);
  border: 1px solid rgba(0, 180, 216, 0.2);
  border-radius: 12px;
  padding: 25px;
  transition: all 0.3s;
  position: relative;
  
  &:hover {
    transform: translateY(-5px);
    border-color: #00b4d8;
    box-shadow: 0 10px 25px rgba(0, 180, 216, 0.2);
  }
`;

export const EventGame = styled.div`
  position: absolute;
  top: -10px;
  right: 15px;
  background: linear-gradient(90deg, #0066cc, #00b4d8);
  color: white;
  padding: 5px 15px;
  border-radius: 15px;
  font-size: 0.8rem;
  font-weight: 600;
`;

export const EventStatus = styled.div<{ status: string }>`
  position: absolute;
  top: -10px;
  left: 15px;
  background: ${props =>
    props.status === 'upcoming' ? 'linear-gradient(90deg, #ff7e5f, #feb47b)' :
        props.status === 'ongoing' ? 'linear-gradient(90deg, #00b09b, #96c93d)' :
            'linear-gradient(90deg, #8e2de2, #4a00e0)'
};
  color: white;
  padding: 5px 15px;
  border-radius: 15px;
  font-size: 0.8rem;
  font-weight: 600;
`;

export const EventTitle = styled.h3`
  font-family: 'Orbitron', sans-serif;
  font-size: 1.5rem;
  color: #00e6ff;
  margin: 10px 0 15px;
  text-shadow: 0 0 10px rgba(0, 230, 255, 0.3);
`;

export const EventInfo = styled.p`
  color: #e0e0e0;
  margin-bottom: 20px;
  line-height: 1.5;
`;

export const EventMeta = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
  color: #a0a0a0;
  font-size: 0.9rem;
`;

export const EventDate = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  color: #00e6ff;
  font-weight: 600;
  margin-bottom: 15px;
`;

export const EventPrize = styled.div`
  background: rgba(0, 180, 216, 0.1);
  padding: 10px 15px;
  border-radius: 8px;
  margin-bottom: 20px;
  border: 1px solid rgba(0, 180, 216, 0.2);
  color: #00e6ff;
  font-weight: 600;
  text-align: center;
`;

export const ParticipateButton = styled.button<{ isParticipating: boolean }>`
  width: 100%;
  padding: 12px;
  background: ${props => props.isParticipating
    ? 'rgba(0, 180, 216, 0.3)'
    : 'rgba(0, 180, 216, 0.15)'};
  color: ${props => props.isParticipating ? '#ffffff' : '#00e6ff'};
  border: ${props => props.isParticipating
    ? '1px solid rgba(0, 180, 216, 0.5)'
    : '1px solid #00b4d8'};
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s;
  font-family: 'Rajdhani', sans-serif;
  font-weight: 600;
  
  &:hover {
    background: ${props => props.isParticipating
    ? 'rgba(0, 180, 216, 0.4)'
    : 'rgba(0, 180, 216, 0.25)'};
    box-shadow: 0 0 15px rgba(0, 180, 216, 0.4);
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

export const EmptyState = styled.div`
  text-align: center;
  padding: 60px 20px;
  background: linear-gradient(145deg, #132f4c, #0a1929);
  border: 1px solid rgba(0, 180, 216, 0.2);
  border-radius: 12px;
  margin: 40px 0;
`;

export const EmptyIcon = styled.div`
  font-size: 4rem;
  color: #00b4d8;
  margin-bottom: 25px;
  opacity: 0.8;
`;

export const EmptyText = styled.p`
  font-size: 1.3rem;
  color: #e0e0e0;
  margin-bottom: 30px;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
  line-height: 1.6;
`;
