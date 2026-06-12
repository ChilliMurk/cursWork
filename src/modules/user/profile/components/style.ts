import styled from "@emotion/styled";

export const ProfileContainer = styled.div`
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
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

export const ProfileAvatarWrapper = styled.div`
    position: relative;
    display: inline-block;
    margin-bottom: 20px;

    &:hover .avatar-overlay {
        opacity: 1;
    }
`;

export const ProfileAvatar = styled.div<{ isEditing?: boolean }>`
    width: 150px;
    height: 150px;
    border-radius: 50%;
    position: relative;
    cursor: ${props => props.isEditing ? 'pointer' : 'default'};
    transition: all 0.3s;

    &:hover {
        transform: ${props => props.isEditing ? 'scale(1.02)' : 'none'};
    }
`;

export const ProfileAvatarImage = styled.img`
    width: 100%;
    height: 100%;
    border-radius: 50%;
    object-fit: cover;
    border: 3px solid #00b4d8;
    box-shadow: 0 0 20px rgba(0, 180, 216, 0.3);
`;

export const ProfileAvatarPlaceholder = styled.div`
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background: linear-gradient(145deg, #0066cc, #00b4d8);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 3rem;
    font-weight: bold;
    color: white;
    border: 3px solid #00b4d8;
    box-shadow: 0 0 20px rgba(0, 180, 216, 0.3);
`;

export const AvatarEditOverlay = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background: rgba(0, 0, 0, 0.6);
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;
    transition: opacity 0.3s;
    cursor: pointer;
`;

export const AvatarEditIcon = styled.i`
    font-size: 2rem;
    color: white;
`;

export const HiddenFileInput = styled.input`
    display: none;
`;

export const ProfileUsername = styled.h2`
    font-family: 'Orbitron', sans-serif;
    font-size: 1.8rem;
    color: #00e6ff;
    margin-bottom: 10px;
    text-align: center;
    text-shadow: 0 0 10px rgba(0, 230, 255, 0.3);
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
    padding-top: 20px;
    border-top: 1px solid rgba(0, 180, 216, 0.2);
`;

export const StatItem = styled.div`
    display: flex;
    justify-content: space-between;
    margin-bottom: 12px;
    color: #e0e0e0;

    span:first-of-type {
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

export const BioText = styled.p`
    color: #e0e0e0;
    line-height: 1.6;
    margin-bottom: 20px;
    padding: 15px;
    background: rgba(0, 180, 216, 0.05);
    border-radius: 8px;
`;

export const EditButton = styled.button`
    background: rgba(0, 180, 216, 0.15);
    color: #00e6ff;
    border: 1px solid #00b4d8;
    border-radius: 8px;
    padding: 10px 20px;
    cursor: pointer;
    transition: all 0.3s;
    font-family: 'Rajdhani', sans-serif;
    font-weight: 600;
    display: inline-flex;
    align-items: center;
    gap: 8px;

    &:hover {
        background: rgba(0, 180, 216, 0.25);
        box-shadow: 0 0 15px rgba(0, 180, 216, 0.4);
        transform: translateY(-2px);
    }
`;

export const StatsGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: 15px;
    margin-bottom: 20px;
`;

export const StatCard = styled.div`
    background: rgba(0, 180, 216, 0.1);
    border: 1px solid rgba(0, 180, 216, 0.2);
    border-radius: 8px;
    padding: 15px;
    text-align: center;
    transition: all 0.3s;

    &:hover {
        transform: translateY(-3px);
        border-color: #00b4d8;
        box-shadow: 0 5px 15px rgba(0, 180, 216, 0.2);
    }
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
        transform: translateY(-2px);
    }
`;

export const FaceItButton = styled.button`
    background: linear-gradient(90deg, #ff5500, #ff8c00);
    color: white;
    border: none;
    border-radius: 30px;
    padding: 10px 20px;
    margin: 15px 0;
    cursor: pointer;
    font-family: 'Rajdhani', sans-serif;
    font-weight: 600;
    display: inline-flex;
    align-items: center;
    gap: 10px;
    transition: all 0.3s;
    width: auto;

    i {
        font-size: 1.2rem;
    }

    &:hover {
        transform: translateY(-2px);
        box-shadow: 0 0 20px rgba(255, 85, 0, 0.4);
    }
`;

export const FaceItConnected = styled.div`
    background: rgba(0, 180, 216, 0.15);
    border: 1px solid rgba(0, 180, 216, 0.3);
    border-radius: 30px;
    padding: 8px 20px;
    margin: 15px 0;
    display: inline-flex;
    align-items: center;
    gap: 10px;
    
    i {
        color: #ff8c00;
        font-size: 1.2rem;
    }
`;

export const FaceItNickname = styled.span`
    color: #00e6ff;
    font-weight: 600;
`;

export const FaceItStatus = styled.span`
    background: rgba(0, 230, 255, 0.2);
    padding: 2px 8px;
    border-radius: 20px;
    font-size: 0.7rem;
    color: #00e6ff;
`;
