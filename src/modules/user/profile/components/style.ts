import styled from "@emotion/styled";

export const ProfileContainer = styled.div`
 
  max-width: 1200px;
  margin: 0 auto;
`;

export const ProfileGrid = styled.div`
  display: grid;
  grid-template-columns: 300px 1fr;
  gap: 25px;
  
  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

export const ProfileSidebar = styled.div`
  background: linear-gradient(145deg, #132f4c, #0a1929);
  border: 1px solid rgba(0, 180, 216, 0.2);
  border-radius: 12px;
  padding: 25px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const ProfileAvatar = styled.div`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  background: linear-gradient(145deg, #0066cc, #00b4d8);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 600;
  font-size: 3rem;
  margin-bottom: 20px;
  border: 3px solid #00e6ff;
  box-shadow: 0 0 20px rgba(0, 230, 255, 0.3);
`;

export const ProfileUsername = styled.h2`
  font-family: 'Orbitron', sans-serif;
  font-size: 1.8rem;
  color: #00e6ff;
  margin-bottom: 10px;
  text-align: center;
`;

export const ProfileRank = styled.div`
  background: linear-gradient(90deg, #ff7e5f, #feb47b);
  color: white;
  padding: 5px 15px;
  border-radius: 15px;
  font-size: 0.9rem;
  font-weight: 600;
  margin-bottom: 20px;
`;

export const ProfileStats = styled.div`
  width: 100%;
  margin-top: 20px;
`;

export const StatItem = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 12px;
  color: #e0e0e0;
  
  span:first-child {
    color: #a0a0a0;
  }
  
  span:last-child {
    font-weight: 600;
    color: #00e6ff;
  }
`;

export const ProfileContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 25px;
`;

export const ProfileCard = styled.div`
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

export const LevelProgress = styled.div`
  margin-bottom: 25px;
`;

export const ProgressHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  color: #e0e0e0;
`;

export const ProgressBar = styled.div`
  width: 100%;
  height: 12px;
  background: rgba(0, 180, 216, 0.2);
  border-radius: 6px;
  overflow: hidden;
`;

export const ProgressFill = styled.div<{ percentage: number }>`
  height: 100%;
  background: linear-gradient(90deg, #0066cc, #00b4d8);
  border-radius: 6px;
  width: ${props => props.percentage}%;
  transition: width 0.5s ease;
`;

export const BioText = styled.p`
  color: #e0e0e0;
  line-height: 1.6;
  margin-bottom: 20px;
`;

export const EditButton = styled.button`
  background: rgba(0, 180, 216, 0.15);
  color: #00e6ff;
  border: 1px solid #00b4d8;
  border-radius: 8px;
  padding: 8px 16px;
  cursor: pointer;
  transition: all 0.3s;
  font-family: 'Rajdhani', sans-serif;
  font-weight: 600;
  
  &:hover {
    background: rgba(0, 180, 216, 0.25);
    box-shadow: 0 0 15px rgba(0, 180, 216, 0.4);
  }
`;

export const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
  margin-bottom: 20px;
`;

export const StatCard = styled.div`
  background: rgba(0, 180, 216, 0.1);
  border: 1px solid rgba(0, 180, 216, 0.2);
  border-radius: 8px;
  padding: 15px;
  text-align: center;
`;

export const StatValue = styled.div`
  font-family: 'Orbitron', sans-serif;
  font-size: 2rem;
  color: #00e6ff;
  margin-bottom: 5px;
  text-shadow: 0 0 10px rgba(0, 230, 255, 0.3);
`;

export const StatLabel = styled.div`
  color: #a0a0a0;
  font-size: 0.9rem;
`;

export const RecentActivity = styled.div`
  margin-top: 20px;
`;

export const ActivityItem = styled.div`
  display: flex;
  align-items: center;
  padding: 15px;
  border-bottom: 1px solid rgba(0, 180, 216, 0.1);
  
  &:last-child {
    border-bottom: none;
  }
`;

export const ActivityIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: rgba(0, 180, 216, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 15px;
  color: #00e6ff;
`;

export const ActivityContent = styled.div`
  flex: 1;
`;

export const ActivityText = styled.div`
  color: #e0e0e0;
  margin-bottom: 5px;
`;

export const ActivityDate = styled.div`
  color: #a0a0a0;
  font-size: 0.8rem;
`;

export const ActionButtons = styled.div`
  display: flex;
  gap: 15px;
  margin-top: 20px;
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
