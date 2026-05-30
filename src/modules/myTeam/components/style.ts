import styled from "@emotion/styled";

export const MyTeamContainer = styled.div`
    max-width: 1000px;
    margin: 0 auto;
`;

export const NoTeamContainer = styled.div`
    text-align: center;
    padding: 60px 40px;
    background: linear-gradient(145deg, #132f4c, #0a1929);
    border: 2px solid rgba(0, 180, 216, 0.3);
    border-radius: 16px;
    margin: 40px 0;
`;

export const NoTeamIcon = styled.div`
    font-size: 5rem;
    color: #00b4d8;
    margin-bottom: 25px;
    opacity: 0.8;
`;

export const NoTeamTitle = styled.h2`
    font-family: 'Orbitron', sans-serif;
    font-size: 2rem;
    color: #00e6ff;
    margin-bottom: 15px;
`;

export const NoTeamText = styled.p`
    font-size: 1.2rem;
    color: #e0e0e0;
    margin-bottom: 30px;
    line-height: 1.6;
`;

export const CreateTeamButton = styled.button`
    padding: 15px 35px;
    background: linear-gradient(90deg, #0066cc, #00b4d8);
    color: #ffffff;
    border: none;
    border-radius: 10px;
    cursor: pointer;
    transition: all 0.3s;
    font-family: 'Orbitron', sans-serif;
    font-weight: 600;
    font-size: 1.1rem;

    &:hover {
        box-shadow: 0 0 25px rgba(0, 180, 216, 0.5);
        transform: translateY(-3px);
    }
`;

// Стили для отображения команды
export const TeamInfoCard = styled.div`
    background: linear-gradient(145deg, #132f4c, #0a1929);
    border: 1px solid rgba(0, 180, 216, 0.2);
    border-radius: 16px;
    padding: 30px;
`;

export const TeamHeaderSection = styled.div`
    position: relative;
    padding-bottom: 25px;
    border-bottom: 1px solid rgba(0, 180, 216, 0.2);
    margin-bottom: 25px;
`;

export const TeamGameBadge = styled.div`
    position: absolute;
    top: -10px;
    right: 0;
    background: linear-gradient(90deg, #0066cc, #00b4d8);
    color: white;
    padding: 6px 18px;
    border-radius: 20px;
    font-size: 0.85rem;
    font-weight: 600;
`;

export const TeamName = styled.h1`
    font-family: 'Orbitron', sans-serif;
    font-size: 2.2rem;
    color: #00e6ff;
    margin-bottom: 15px;
    text-shadow: 0 0 10px rgba(0, 230, 255, 0.3);
`;

export const TeamDescription = styled.p`
    color: #e0e0e0;
    font-size: 1rem;
    line-height: 1.6;
    margin-bottom: 25px;
`;

export const TeamMetaGrid = styled.div`
    display: flex;
    gap: 30px;
    flex-wrap: wrap;
    margin-bottom: 25px;
`;

export const MetaItem = styled.div`
    display: flex;
    flex-direction: column;
    gap: 5px;
`;

export const MetaLabel = styled.span`
    color: #a0a0a0;
    font-size: 0.85rem;
`;

export const MetaValue = styled.span`
    color: #00e6ff;
    font-weight: 600;
    font-size: 1rem;
`;

export const Rating = styled.div`
    display: flex;
    align-items: center;
    gap: 5px;
    color: #ffd700;
    font-weight: 600;
`;

export const ActionButtonsContainer = styled.div`
    display: flex;
    gap: 15px;
    flex-wrap: wrap;
`;

export const EditTeamButton = styled.button`
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

export const LeaveTeamButton = styled.button`
    padding: 10px 20px;
    background: rgba(244, 67, 54, 0.15);
    color: #ff5252;
    border: 1px solid rgba(244, 67, 54, 0.5);
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.3s;
    font-family: 'Rajdhani', sans-serif;
    font-weight: 600;

    &:hover {
        background: rgba(244, 67, 54, 0.25);
        box-shadow: 0 0 15px rgba(244, 67, 54, 0.3);
    }
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
    background: rgba(0, 180, 216, 0.05);
    border: 1px solid rgba(0, 180, 216, 0.15);
    border-radius: 12px;
    padding: 20px;
`;

export const CardTitle = styled.h3`
    font-family: 'Orbitron', sans-serif;
    font-size: 1.3rem;
    color: #00e6ff;
    margin-bottom: 20px;
    display: flex;
    align-items: center;
    gap: 10px;
`;

export const MembersList = styled.div`
    display: flex;
    flex-direction: column;
    gap: 12px;
`;

export const MemberItem = styled.div`
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 10px;
    background: rgba(0, 180, 216, 0.08);
    border-radius: 10px;
    border: 1px solid rgba(0, 180, 216, 0.15);
    position: relative;
`;

export const MemberAvatar = styled.div`
    width: 45px;
    height: 45px;
    border-radius: 50%;
    background: linear-gradient(145deg, #0066cc, #00b4d8);
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-weight: 600;
    font-size: 1.1rem;
    flex-shrink: 0;
`;

export const MemberName = styled.div`
    color: #e0e0e0;
    font-weight: 600;
    flex: 1;
    
    &.captain {
        color: #ffd700;
    }
`;

export const CaptainBadge = styled.span`
    margin-left: 10px;
    font-size: 0.8rem;
    color: #ffd700;
    background: rgba(255, 215, 0, 0.15);
    padding: 2px 8px;
    border-radius: 12px;
    
    i {
        font-size: 0.7rem;
    }
`;

export const MemberRole = styled.div`
    color: #a0a0a0;
    font-size: 0.85rem;
    padding: 4px 10px;
    background: rgba(0, 180, 216, 0.1);
    border-radius: 12px;
`;

export const KickButton = styled.button`
    background: rgba(244, 67, 54, 0.15);
    color: #ff5252;
    border: none;
    border-radius: 6px;
    padding: 6px 10px;
    cursor: pointer;
    transition: all 0.2s;

    &:hover {
        background: rgba(244, 67, 54, 0.3);
    }
`;

// export const ManageButtons = styled.div`
//     margin-top: 20px;
//     padding-top: 15px;
//     border-top: 1px solid rgba(0, 180, 216, 0.15);
// `;
//
// export const ManageButton = styled.button`
//     width: 100%;
//     padding: 10px;
//     background: rgba(0, 180, 216, 0.1);
//     color: #00e6ff;
//     border: 1px solid rgba(0, 180, 216, 0.3);
//     border-radius: 8px;
//     cursor: pointer;
//     transition: all 0.3s;
//     font-family: 'Rajdhani', sans-serif;
//     font-weight: 600;
//
//     &:hover {
//         background: rgba(0, 180, 216, 0.2);
//     }
// `;

export const AchievementList = styled.ul`
    list-style: none;
    padding: 0;
`;

export const AchievementItem = styled.li`
    padding: 12px 0;
    border-bottom: 1px solid rgba(0, 180, 216, 0.1);
    color: #e0e0e0;
    
    &:last-child {
        border-bottom: none;
    }
`;

export const LookingForList = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    margin-bottom: 20px;
`;

export const RoleBadge = styled.span`
    background: rgba(0, 180, 216, 0.2);
    color: #00e6ff;
    padding: 6px 14px;
    border-radius: 20px;
    font-size: 0.9rem;
    border: 1px solid rgba(0, 180, 216, 0.3);
`;

export const RequirementText = styled.p`
    color: #e0e0e0;
    line-height: 1.6;
`;

export const ContactInfo = styled.div`
    background: rgba(0, 180, 216, 0.1);
    padding: 15px;
    border-radius: 10px;
    border: 1px solid rgba(0, 180, 216, 0.2);
    color: #00e6ff;
    font-weight: 600;
    word-break: break-word;
`;

export const ManageButtons = styled.div`
    margin-top: 20px;
    padding-top: 15px;
    border-top: 1px solid rgba(0, 180, 216, 0.15);
    display: flex;
    flex-direction: column;
    gap: 10px;
`;

export const ManageButton = styled.button`
    width: 100%;
    padding: 12px;
    background: rgba(0, 180, 216, 0.1);
    color: #00e6ff;
    border: 1px solid rgba(0, 180, 216, 0.3);
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.3s;
    font-family: 'Rajdhani', sans-serif;
    font-weight: 600;

    &:hover {
        background: rgba(0, 180, 216, 0.2);
        transform: translateY(-2px);
    }
`;

export const DeleteTeamButton = styled.button`
    padding: 10px 20px;
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
    gap: 8px;

    &:hover {
        background: rgba(244, 67, 54, 0.3);
        box-shadow: 0 0 15px rgba(244, 67, 54, 0.4);
        transform: translateY(-2px);
    }

    i {
        font-size: 0.9rem;
    }
`;
