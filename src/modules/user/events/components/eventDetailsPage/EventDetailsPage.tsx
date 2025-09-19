import { FC } from 'react';
import styled from "@emotion/styled";

interface Event {
    id: number;
    title: string;
    game: string;
    participants: number;
    maxParticipants: number;
    description: string;
    date: string;
    status: 'upcoming' | 'ongoing' | 'completed';
    prize: string;
}

interface EventDetailsPageProps {
    event: Event;
    onBack: () => void;
    onParticipate: (eventId: number) => void;
    participatingEvents: number[];
}

const EventDetailsContainer = styled.div`
    padding: 20px;
    max-width: 900px;
    margin: 0 auto;
`;

const BackButton = styled.button`
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

const EventHeader = styled.div`
    background: linear-gradient(145deg, #132f4c, #0a1929);
    border: 1px solid rgba(0, 180, 216, 0.2);
    border-radius: 12px;
    padding: 30px;
    margin-bottom: 20px;
`;

const EventGame = styled.div`
    color: #00e6ff;
    font-size: 1.1rem;
    font-weight: 600;
    margin-bottom: 10px;
`;

const EventStatus = styled.div<{ status: string }>`
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

const EventTitle = styled.h1`
    font-family: 'Orbitron', sans-serif;
    font-size: 2.2rem;
    color: #00e6ff;
    margin-bottom: 20px;
    text-shadow: 0 0 10px rgba(0, 230, 255, 0.3);
`;

const EventContent = styled.div`
    display: grid;
    grid-template-columns: 2fr 1fr;
    gap: 30px;

    @media (max-width: 768px) {
        grid-template-columns: 1fr;
    }
`;

const EventInfo = styled.div`
    background: linear-gradient(145deg, #132f4c, #0a1929);
    border: 1px solid rgba(0, 180, 216, 0.2);
    border-radius: 12px;
    padding: 25px;
`;

const EventSidebar = styled.div`
    background: linear-gradient(145deg, #132f4c, #0a1929);
    border: 1px solid rgba(0, 180, 216, 0.2);
    border-radius: 12px;
    padding: 25px;
`;

const SectionTitle = styled.h2`
    color: #00e6ff;
    font-size: 1.4rem;
    margin-bottom: 20px;
    font-family: 'Rajdhani', sans-serif;
    font-weight: 600;
`;

const InfoGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
    margin-bottom: 25px;

    @media (max-width: 480px) {
        grid-template-columns: 1fr;
    }
`;

const InfoItem = styled.div`
    display: flex;
    flex-direction: column;
    gap: 5px;
`;

const InfoLabel = styled.span`
    color: #a0a0a0;
    font-size: 0.9rem;
`;

const InfoValue = styled.span`
    color: #e0e0e0;
    font-size: 1.1rem;
    font-weight: 600;
`;

const Description = styled.p`
    color: #e0e0e0;
    line-height: 1.6;
    margin-bottom: 25px;
`;

const Requirements = styled.div`
    background: rgba(0, 180, 216, 0.1);
    border: 1px solid rgba(0, 180, 216, 0.2);
    border-radius: 8px;
    padding: 20px;
    margin-bottom: 25px;
`;

const RequirementsTitle = styled.h3`
    color: #00e6ff;
    font-size: 1.1rem;
    margin-bottom: 10px;
`;

const RequirementsList = styled.ul`
    color: #e0e0e0;
    padding-left: 20px;
    line-height: 1.6;
`;

const ParticipateButton = styled.button<{ isParticipating: boolean; disabled: boolean }>`
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

const ParticipantsList = styled.div`
    margin-top: 20px;
`;

const ParticipantCount = styled.div`
    color: #00e6ff;
    font-weight: 600;
    margin-bottom: 15px;
`;

const EmptyParticipants = styled.div`
    color: #a0a0a0;
    text-align: center;
    padding: 20px;
`;

const getStatusText = (status: string) => {
    switch(status) {
        case 'upcoming': return 'Предстоящее';
        case 'ongoing': return 'Текущее';
        case 'completed': return 'Завершено';
        default: return status;
    }
};

const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString('ru-RU', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
};

export const EventDetailsPage: FC<EventDetailsPageProps> = ({
                                                         event,
                                                         onBack,
                                                         onParticipate,
                                                         participatingEvents
                                                     }) => {
    const isParticipating = participatingEvents.includes(event.id);
    const participantsCount = event.participants;

    const handleParticipate = () => {
        onParticipate(event.id);
    };

    return (
        <EventDetailsContainer>
            <BackButton onClick={onBack}>
                <i className="fas fa-arrow-left"></i>
                Назад к событиям
            </BackButton>

            <EventHeader>
                <EventGame>{event.game}</EventGame>
                <EventStatus status={event.status}>{getStatusText(event.status)}</EventStatus>
                <EventTitle>{event.title}</EventTitle>
            </EventHeader>

            <EventContent>
                <EventInfo>
                    <SectionTitle>Информация о событии</SectionTitle>

                    <InfoGrid>
                        <InfoItem>
                            <InfoLabel>Дата и время</InfoLabel>
                            <InfoValue>{formatDate(event.date)}</InfoValue>
                        </InfoItem>

                        <InfoItem>
                            <InfoLabel>Призовой фонд</InfoLabel>
                            <InfoValue>{event.prize}</InfoValue>
                        </InfoItem>

                        <InfoItem>
                            <InfoLabel>Участников</InfoLabel>
                            <InfoValue>{event.participants}/{event.maxParticipants}</InfoValue>
                        </InfoItem>

                        <InfoItem>
                            <InfoLabel>Статус</InfoLabel>
                            <InfoValue>{getStatusText(event.status)}</InfoValue>
                        </InfoItem>
                    </InfoGrid>

                    <Description>
                        {event.description}
                    </Description>

                    <Requirements>
                        <RequirementsTitle>Требования к участникам</RequirementsTitle>
                        <RequirementsList>
                            <li>Минимальный уровень: 10</li>
                            <li>Стабильное интернет-соединение</li>
                            <li>Голосовая связь (Discord)</li>
                            <li>Готовность к командной игре</li>
                        </RequirementsList>
                    </Requirements>
                </EventInfo>

                <EventSidebar>
                    <SectionTitle>Участие</SectionTitle>

                    <ParticipateButton
                        onClick={handleParticipate}
                        isParticipating={isParticipating}
                        disabled={event.status === 'completed'}
                    >
                        {isParticipating
                            ? 'Отказаться от участия'
                            : event.status === 'completed'
                                ? 'Событие завершено'
                                : 'Участвовать в событии'}
                    </ParticipateButton>

                    <ParticipantsList>
                        <ParticipantCount>
                            Участников: {participantsCount}/{event.maxParticipants}
                        </ParticipantCount>

                        {participantsCount > 0 ? (
                            <div>
                                <div style={{ color: '#e0e0e0', marginBottom: '10px' }}>
                                    <i className="fas fa-users"></i> Список участников загружается...
                                </div>
                            </div>
                        ) : (
                            <EmptyParticipants>
                                <i className="fas fa-user-slash"></i>
                                <div>Пока нет участников</div>
                            </EmptyParticipants>
                        )}
                    </ParticipantsList>

                    <div style={{ marginTop: '20px', padding: '15px', background: 'rgba(0, 180, 216, 0.1)', borderRadius: '8px' }}>
                        <div style={{ color: '#00e6ff', fontWeight: '600', marginBottom: '10px' }}>
                            <i className="fas fa-info-circle"></i> Информация
                        </div>
                        <div style={{ color: '#e0e0e0', fontSize: '0.9rem' }}>
                            Регистрация закрывается за 1 час до начала события
                        </div>
                    </div>
                </EventSidebar>
            </EventContent>
        </EventDetailsContainer>
    );
};

