import {FC} from 'react';
import {
    BackButton,
    EventDetailsContainer,
    EventHeader,
    EventGame,
    EventStatus,
    EventTitle,
    EventContent,
    EventInfo,
    SectionTitle,
    InfoGrid,
    InfoItem,
    InfoLabel,
    InfoValue,
    Description,
    Requirements,
    RequirementsTitle,
    RequirementsList,
    EventSidebar,
    ParticipateButton,
    ParticipantsList,
    ParticipantCount,
    EmptyParticipants
} from "@/modules/user/events/components/eventDetailsPage/style.ts";

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
    organizerName?: string;
}

interface EventDetailsPageProps {
    event: Event;
    onBack: () => void;
    onParticipate: (eventId: number) => Promise<void>;
    isParticipating: boolean;
}

const getStatusText = (status: string) => {
    switch (status) {
        case 'upcoming':
            return 'Предстоящее';
        case 'ongoing':
            return 'Текущее';
        case 'completed':
            return 'Завершено';
        default:
            return status;
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

// Функция для проверки, прошло ли событие
const isEventPast = (eventDate: string): boolean => {
    const eventDateTime = new Date(eventDate);
    const now = new Date();
    return eventDateTime < now;
};

export const EventDetailsPage: FC<EventDetailsPageProps> = ({
                                                                event,
                                                                onBack,
                                                                onParticipate,
                                                                isParticipating
                                                            }) => {
    const participantsCount = event.participants;
    const eventPast = isEventPast(event.date);

    // Кнопка недоступна если:
    // 1. Событие завершено (status === 'completed')
    // 2. ИЛИ событие уже прошло по дате
    // 3. ИЛИ пользователь уже участвует
    const isDisabled = event.status === 'completed' || eventPast || isParticipating;

    // Текст кнопки:
    // - Если уже участвуем: "Вы участвуете"
    // - Если событие завершено: "Событие завершено"
    // - Если событие прошло: "Событие прошло"
    // - Иначе: "Участвовать в событии"
    let buttonText = 'Участвовать в событии';
    if (isParticipating) {
        buttonText = '✓ Вы участвуете';
    } else if (event.status === 'completed') {
        buttonText = 'Событие завершено';
    } else if (eventPast) {
        buttonText = 'Событие прошло';
    }

    const handleParticipate = () => {
        if (!isDisabled && !isParticipating) {
            onParticipate(event.id);
        }
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

                        {event.organizerName && (
                            <InfoItem>
                                <InfoLabel>Организатор</InfoLabel>
                                <InfoValue>{event.organizerName}</InfoValue>
                            </InfoItem>
                        )}
                    </InfoGrid>

                    <Description>
                        {event.description}
                    </Description>

                    <Requirements>
                        <RequirementsTitle>Требования к участникам</RequirementsTitle>
                        <RequirementsList>
                            <li>Стабильное интернет-соединение</li>
                            <li>Голосовая связь (Discord)</li>
                            <li>Готовность к командной игре</li>
                            <li>Соблюдение правил fair play</li>
                        </RequirementsList>
                    </Requirements>
                </EventInfo>

                <EventSidebar>
                    <SectionTitle>Участие</SectionTitle>

                    <ParticipateButton
                        onClick={handleParticipate}
                        isParticipating={isParticipating}
                        disabled={isDisabled}
                    >
                        {buttonText}
                    </ParticipateButton>

                    <ParticipantsList>
                        <ParticipantCount>
                            Участников: {participantsCount}/{event.maxParticipants}
                        </ParticipantCount>

                        {participantsCount > 0 ? (
                            <div>
                                <div style={{color: '#e0e0e0', marginBottom: '10px'}}>
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

                    <div style={{
                        marginTop: '20px',
                        padding: '15px',
                        background: 'rgba(0, 180, 216, 0.1)',
                        borderRadius: '8px'
                    }}>
                        <div style={{color: '#00e6ff', fontWeight: '600', marginBottom: '10px'}}>
                            <i className="fas fa-info-circle"></i> Информация
                        </div>
                        <div style={{color: '#e0e0e0', fontSize: '0.9rem'}}>
                            Регистрация закрывается за 1 час до начала события
                        </div>
                    </div>
                </EventSidebar>
            </EventContent>
        </EventDetailsContainer>
    );
};
