import { FC, useState, useEffect } from 'react';
import { useAppSelector } from "@/common/hooks/useAppSelector.ts";
import { useGetAllEventsQuery, Event } from "@/store/reducers/eventApi/eventApi.ts";
import {
    CreateEventButton,
    EventCard,
    EventInfo,
    EventsContainer,
    EventsGrid,
    EventTitle,
    ParticipateButton,
    LoadingSpinner,
    ErrorMessage
} from "@/modules/user/events/components/style.ts";
import { EmptyIcon, EmptyState, EmptyText } from "@/modules/user/teams/components/style.ts";
import { EventDetailsPage } from "./eventDetailsPage/EventDetailsPage.tsx";

export const EventsPage: FC = () => {
    const [showCreateEvent, setShowCreateEvent] = useState(false);
    const [participatingEvents, setParticipatingEvents] = useState<number[]>([]);
    const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

    const user = useAppSelector((state) => state.authReducer.user);

    const {
        data: events = [],
        isLoading,
        error,
        refetch,
        isFetching
    } = useGetAllEventsQuery(undefined, {
        skip: !user?.token // Не загружаем если нет токена
    });

    useEffect(() => {
        if (user) {
            console.log('User logged in:', user.name || user.email);
        }
    }, [user]);

    // Следим за изменениями данных
    useEffect(() => {
        if (events.length > 0) {
            console.log('Events from server:', events);
        }
    }, [events]);

    const handleRefresh = () => {
        refetch();
    };

    const handleParticipate = (eventId: number) => {
        setParticipatingEvents(prev =>
            prev.includes(eventId)
                ? prev.filter(id => id !== eventId)
                : [...prev, eventId]
        );
    };

    const handleCreateEvent = () => {
        setShowCreateEvent(true);
    };

    const handleCancelCreate = () => {
        setShowCreateEvent(false);
    };

    const handleEventClick = (event: Event) => {
        setSelectedEvent(event);
    };

    const handleBackToList = () => {
        setSelectedEvent(null);
    };

    // Если выбран конкретный event - показываем детали
    if (selectedEvent) {
        return (
            <EventDetailsPage
                event={selectedEvent}
                onBack={handleBackToList}
                onParticipate={handleParticipate}
                participatingEvents={participatingEvents}
            />
        );
    }

    if (isLoading && !events.length) {
        return (
            <EventsContainer>
                <LoadingSpinner>Загрузка событий...</LoadingSpinner>
            </EventsContainer>
        );
    }

    if (error) {
        console.error('Events loading error:', error);
        return (
            <EventsContainer>
                <ErrorMessage>
                    <h3>Ошибка при загрузке событий</h3>
                    <p>Пожалуйста, попробуйте позже.</p>
                    <button onClick={handleRefresh}>
                        Повторить попытку
                    </button>
                </ErrorMessage>
            </EventsContainer>
        );
    }

    if (showCreateEvent) {
        return (
            <div>
                <h2>Создание события (в разработке)</h2>
                <button onClick={handleCancelCreate}>Назад</button>
            </div>
        );
    }

    return (
        <EventsContainer>
            <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
                <CreateEventButton onClick={handleCreateEvent}>
                    Создать свое событие
                </CreateEventButton>
                <button onClick={handleRefresh} style={{ padding: '10px 20px' }}>
                    Обновить события
                </button>
            </div>

            {isFetching && <div>Обновление...</div>}

            {events.length > 0 ? (
                <EventsGrid>
                    {events.map((event) => (
                        <EventCard
                            key={event.id}
                            onClick={() => handleEventClick(event)}
                            style={{ cursor: 'pointer' }}
                        >
                            <EventTitle>{event.title || event.name || 'Без названия'}</EventTitle>
                            <EventInfo>{event.description || 'Нет описания'}</EventInfo>
                            <EventInfo>
                                <strong>Игра:</strong> {event.game || 'Не указана'}
                            </EventInfo>
                            <EventInfo>
                                <strong>Участников:</strong> {event.participants}/{event.maxParticipants}
                            </EventInfo>
                            <EventInfo>
                                <strong>Дата:</strong> {new Date(event.date).toLocaleDateString()}
                            </EventInfo>

                            <ParticipateButton
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleParticipate(event.id);
                                }}
                                isParticipating={participatingEvents.includes(event.id)}
                                disabled={event.status === 'completed'}
                            >
                                {participatingEvents.includes(event.id)
                                    ? 'Отказаться от участия'
                                    : event.status === 'completed'
                                        ? 'Событие завершено'
                                        : 'Участвовать'}
                            </ParticipateButton>
                        </EventCard>
                    ))}
                </EventsGrid>
            ) : (
                <EmptyState>
                    <EmptyIcon>
                        <i className="fas fa-calendar-times"></i>
                    </EmptyIcon>
                    <EmptyText>
                        Пока нет запланированных событий. Станьте первым, создав свое событие!
                    </EmptyText>
                    <CreateEventButton onClick={handleCreateEvent}>
                        Создать событие
                    </CreateEventButton>
                </EmptyState>
            )}
        </EventsContainer>
    );
};
