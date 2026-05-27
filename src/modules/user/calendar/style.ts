// modules/user/calendar/components/CalendarPage.style.ts
import styled from "@emotion/styled";

export const CalendarApp = styled.div`
    max-width: 1400px;
    width: 95%;
    margin: 0 auto;
    position: relative;
    z-index: 2;
    padding: 1rem 0;
`;

export const NavButtons = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1.8rem;
    flex-wrap: wrap;
    gap: 15px;
`;

export const BackButton = styled.button`
    background: rgba(0, 180, 216, 0.15);
    border: 1px solid #00b4d8;
    color: #00e6ff;
    padding: 10px 24px;
    border-radius: 40px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s;
    font-family: 'Rajdhani', sans-serif;
    font-size: 0.95rem;

    &:hover {
        background: rgba(0, 180, 216, 0.3);
        box-shadow: 0 0 12px rgba(0, 180, 216, 0.4);
        transform: translateY(-2px);
    }
`;

export const CalendarTitle = styled.div`
    font-family: 'Orbitron', sans-serif;
    font-size: 1.8rem;
    color: #00e6ff;
    text-shadow: 0 0 6px rgba(0, 230, 255, 0.4);
    display: flex;
    align-items: center;
    gap: 12px;
`;

export const CalendarGridLayout = styled.div`
    display: grid;
    grid-template-columns: 1fr 340px;
    gap: 28px;

    @media (max-width: 900px) {
        grid-template-columns: 1fr;
    }
`;

export const CalendarCard = styled.div`
    background: linear-gradient(145deg, #132f4c, #0a1929);
    border: 1px solid rgba(0, 180, 216, 0.3);
    border-radius: 28px;
    padding: 1.5rem;
    backdrop-filter: blur(2px);
    box-shadow: 0 12px 30px rgba(0, 0, 0, 0.4);
`;

export const MonthHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2rem;
    padding-bottom: 0.5rem;
    border-bottom: 1px solid rgba(0, 180, 216, 0.3);
`;

export const MonthYear = styled.div`
    font-family: 'Orbitron', sans-serif;
    font-size: 1.7rem;
    font-weight: 700;
    color: #b8eaff;
`;

export const MonthNav = styled.div`
    display: flex;
    gap: 8px;
`;

export const NavButton = styled.button`
    background: rgba(0, 180, 216, 0.2);
    border: none;
    font-size: 1.3rem;
    color: #00e6ff;
    cursor: pointer;
    padding: 8px 16px;
    border-radius: 30px;
    transition: 0.2s;

    &:hover {
        background: rgba(0, 180, 216, 0.5);
    }
`;

export const Weekdays = styled.div`
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    text-align: center;
    margin-bottom: 12px;
    font-weight: 700;
    color: #8fcbff;
    text-transform: uppercase;
    font-size: 0.85rem;
`;

export const Weekday = styled.span`
    padding: 8px 0;
`;

export const DaysGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    gap: 6px;
`;

export const DayCell = styled.div<{ isOtherMonth: boolean; isSelected: boolean }>`
    background: rgba(10, 30, 45, 0.7);
    border-radius: 16px;
    padding: 12px 6px;
    text-align: center;
    font-weight: 500;
    transition: all 0.15s;
    cursor: pointer;
    border: 1px solid rgba(0, 180, 216, 0.2);
    min-height: 90px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    position: relative;
    opacity: ${props => props.isOtherMonth ? 0.5 : 1};
    background: ${props => props.isSelected ? 'linear-gradient(145deg, #0066cc, #0077aa)' : 'rgba(10, 30, 45, 0.7)'};
    border: ${props => props.isSelected ? '2px solid #00e6ff' : '1px solid rgba(0, 180, 216, 0.2)'};
    box-shadow: ${props => props.isSelected ? '0 0 12px #00b4d8' : 'none'};

    &:hover {
        background: ${props => props.isSelected ? 'linear-gradient(145deg, #0066cc, #0077aa)' : '#133f5c'};
        border-color: #00b4d8;
        transform: translateY(-2px);
    }
`;

export const DayNumber = styled.div`
    font-size: 1.3rem;
    font-weight: 600;
    margin-bottom: 5px;
    color: #cceeff;
`;

export const EventBadge = styled.div<{ type: 'tournament' | 'subscribed' }>`
    font-size: 0.7rem;
    background: ${props => props.type === 'tournament' ? '#f39c12cc' : '#2ecc71cc'};
    border-radius: 20px;
    padding: 2px 8px;
    margin-top: 4px;
    width: 90%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    color: white;
    font-weight: 500;
`;

export const SidebarPanel = styled.div`
    background: linear-gradient(145deg, #102b40, #061222);
    border: 1px solid rgba(0, 180, 216, 0.4);
    border-radius: 28px;
    padding: 1.5rem;
    backdrop-filter: blur(4px);
    height: fit-content;
`;

export const SelectedDateTitle = styled.div`
    font-size: 1.4rem;
    font-weight: bold;
    color: #00e6ff;
    border-left: 4px solid #00b4d8;
    padding-left: 14px;
    margin-bottom: 20px;
`;

export const FilterSwitch = styled.div`
    display: flex;
    gap: 12px;
    margin-bottom: 18px;
    flex-wrap: wrap;
`;

export const FilterButton = styled.button<{ isActive: boolean }>`
    background: ${props => props.isActive ? '#00b4d8' : 'transparent'};
    border: 1px solid #00b4d8;
    padding: 6px 16px;
    border-radius: 30px;
    color: ${props => props.isActive ? '#0a1929' : '#b3e4ff'};
    cursor: pointer;
    transition: 0.2s;
    font-weight: ${props => props.isActive ? 'bold' : 'normal'};
    font-family: 'Rajdhani', sans-serif;

    &:hover {
        background: ${props => props.isActive ? '#00b4d8' : 'rgba(0, 180, 216, 0.2)'};
    }
`;

export const EventsList = styled.div`
    margin-bottom: 28px;
`;

export const EventItem = styled.div<{ type: 'tournament' | 'subscribed' }>`
    background: rgba(0, 180, 216, 0.1);
    border-radius: 18px;
    padding: 12px 16px;
    margin-bottom: 12px;
    border-left: 3px solid ${props => props.type === 'tournament' ? '#f39c12' : '#2ecc71'};
`;

export const EventTitle = styled.div`
    font-weight: 700;
    font-size: 1.05rem;
    color: #e0e0e0;
`;

export const EventTime = styled.div`
    font-size: 0.75rem;
    color: #98c1e0;
    margin-top: 4px;
`;

export const EventGame = styled.div`
    font-size: 0.7rem;
    color: #a0a0a0;
    margin-top: 4px;
`;

export const EventPrize = styled.div`
    font-size: 0.7rem;
    color: gold;
    margin-top: 4px;
`;

export const EmptyMessage = styled.div`
    text-align: center;
    color: #90adc7;
    padding: 20px;
`;

export const Hr = styled.hr`
    border-color: rgba(0, 180, 216, 0.2);
    margin: 16px 0;
`;

export const NotesSection = styled.div`
    margin-top: 16px;
`;

export const NotesLabel = styled.div`
    margin-bottom: 10px;
    color: #b3e4ff;
`;

export const TextArea = styled.textarea`
    width: 100%;
    background: rgba(0, 0, 0, 0.5);
    border: 1px solid rgba(0, 180, 216, 0.5);
    border-radius: 18px;
    padding: 12px;
    color: #eef5ff;
    font-family: 'Rajdhani', monospace;
    resize: vertical;
    margin: 10px 0;

    &:focus {
        outline: none;
        border-color: #00b4d8;
    }
`;

export const SaveNoteButton = styled.button`
    background: linear-gradient(90deg, #0066cc, #00b4d8);
    border: none;
    padding: 8px 18px;
    border-radius: 30px;
    color: white;
    font-weight: bold;
    cursor: pointer;
    transition: 0.2s;
    font-family: 'Rajdhani', sans-serif;

    &:hover {
        box-shadow: 0 0 12px #00b4d8;
        transform: translateY(-2px);
    }
`;

export const UserNotesDisplay = styled.div`
    background: rgba(0, 0, 0, 0.3);
    border-radius: 20px;
    padding: 12px;
    margin-top: 16px;
    font-style: italic;
    color: #cae9ff;
`;
