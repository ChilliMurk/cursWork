import { FC, useState, useEffect } from 'react';
import { useAppSelector } from "@/common/hooks/useAppSelector.ts";
import { useGetAdminEventsQuery } from "@/store/reducers/eventApi/eventApi.ts";
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

interface Event {
    id: number;
    name: string;
    description: string;
}

export const EventsPage: FC = () => {
    const [showCreateEvent, setShowCreateEvent] = useState(false);
    const [participatingEvents, setParticipatingEvents] = useState<number[]>([]);

    const user = useAppSelector((state) => state.authReducer.user);

    const {
        data: events = [],
        isLoading,
        error,
        refetch,
        isFetching
    } = useGetAdminEventsQuery();

    useEffect(() => {
        if (user) {
            console.log('User logged in:', user.name || user.email);
            // Загрузить события пользователя или другую логику
        }
    }, [user]);

    // Принудительно обновляем данные при монтировании
    useEffect(() => {
        refetch();
    }, []); // Пустой массив зависимостей - выполнится один раз при монтировании

    // Следим за изменениями данных
    useEffect(() => {
        console.log('Events from server:', events);
    }, [events]);

    // Кнопка для ручного обновления
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
        console.log('Event clicked:', event);
    };

    if (isLoading && !events.length) {
        return (
            <EventsContainer>
                <LoadingSpinner>Загрузка событий...</LoadingSpinner>
            </EventsContainer>
        );
    }

    if (error) {
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
                            <EventTitle>{event.name || 'Без названия'}</EventTitle>
                            <EventInfo>{event.description || 'Нет описания'}</EventInfo>

                            <ParticipateButton
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleParticipate(event.id);
                                }}
                                isParticipating={participatingEvents.includes(event.id)}
                            >
                                {participatingEvents.includes(event.id)
                                    ? 'Отказаться от участия'
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
