import { FC, useState, useEffect } from 'react';
import { useAppSelector } from "@/common/hooks/useAppSelector.ts";
import { useGetAvailableEventsQuery, useCreateCommonEventMutation, useCreateTeamEventMutation, Event } from "@/store/reducers/eventApi/eventApi.ts";
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
import { CreateEventPage } from "./createEventPage/CreateEventPage.tsx";

export const EventsPage: FC = () => {
    const [showCreateEvent, setShowCreateEvent] = useState(false);
    const [participatingEvents, setParticipatingEvents] = useState<number[]>([]);
    const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
    const [eventType, setEventType] = useState<'common' | 'team'>('common');

    const user = useAppSelector((state) => state.authReducer.user);

    // Получаем текущий месяц и год для запроса
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1;
    const currentYear = currentDate.getFullYear();

    const {
        data: events = [],
        isLoading,
        error,
        refetch,
        isFetching
    } = useGetAvailableEventsQuery({ month: currentMonth, year: currentYear }, {
        skip: !user?.token
    });

    const [createCommonEvent, { isLoading: isCreatingCommon }] = useCreateCommonEventMutation();
    const [createTeamEvent, { isLoading: isCreatingTeam }] = useCreateTeamEventMutation();

    const isCreating = isCreatingCommon || isCreatingTeam;

    useEffect(() => {
        if (user) {
            console.log('User logged in:', user.name || user.email);
        }
    }, [user]);

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

    const handleEventTypeChange = (type: 'common' | 'team') => {
        setEventType(type);
    };

    const handleCreateEventSubmit = async (eventData: Omit<Event, 'id' | 'participants'>, eventTypeValue: string) => {
        try {
            // Форматируем дату правильно для LocalDateTime
            let formattedDate;

            if (eventData.date) {
                // Создаем объект даты
                const dateObj = new Date(eventData.date);

                // Проверяем, что дата валидна
                if (isNaN(dateObj.getTime())) {
                    throw new Error('Invalid date');
                }

                // Форматируем как YYYY-MM-DDTHH:MM:SS (без миллисекунд)
                const year = dateObj.getFullYear();
                const month = String(dateObj.getMonth() + 1).padStart(2, '0');
                const day = String(dateObj.getDate()).padStart(2, '0');
                const hours = String(dateObj.getHours()).padStart(2, '0');
                const minutes = String(dateObj.getMinutes()).padStart(2, '0');
                const seconds = String(dateObj.getSeconds()).padStart(2, '0');

                formattedDate = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
            } else {
                // Если даты нет, используем текущую + 1 день
                const futureDate = new Date();
                futureDate.setDate(futureDate.getDate() + 1);
                const year = futureDate.getFullYear();
                const month = String(futureDate.getMonth() + 1).padStart(2, '0');
                const day = String(futureDate.getDate()).padStart(2, '0');
                const hours = String(futureDate.getHours()).padStart(2, '0');
                const minutes = String(futureDate.getMinutes()).padStart(2, '0');
                const seconds = String(futureDate.getSeconds()).padStart(2, '0');

                formattedDate = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
            }

            const requestData = {
                title: eventData.title,
                description: eventData.description,
                type: eventTypeValue,
                date: formattedDate,
                max_amount_of_participants: Number(eventData.maxParticipants),
                prize: eventData.prize
            };

            console.log('Sending request data:', requestData);

            if (eventType === 'common') {
                await createCommonEvent(requestData).unwrap();
                alert('Общее событие успешно создано!');
            } else {
                await createTeamEvent(requestData).unwrap();
                alert('Командное событие успешно создано!');
            }

            setShowCreateEvent(false);
            refetch();

        } catch (err: any) {
            console.error('Error creating event:', err);
            if (err.data) {
                console.error('Error details:', err.data);
                alert(`Ошибка: ${err.data.error || err.data.message || JSON.stringify(err.data)}`);
            } else {
                alert('Ошибка при создании события');
            }
        }
    };

    // // В EventsPage.tsx обновите handleCreateEventSubmit
    // const handleCreateEventSubmit = async (eventData: Omit<Event, 'id' | 'participants'>, eventTypeValue: string) => {
    //     try {
    //         const dateObj = new Date(eventData.date);
    //         const formattedDate = dateObj.toISOString().split('.')[0];
    //
    //         const requestData = {
    //             title: eventData.title,
    //             description: eventData.description,
    //             type: eventTypeValue, // Используем выбранное значение
    //             date: formattedDate,
    //             max_amount_of_participants: Number(eventData.maxParticipants),
    //             prize: eventData.prize
    //         };
    //
    //         console.log('Sending request data:', requestData);
    //
    //         if (eventType === 'common') {
    //             await createCommonEvent(requestData).unwrap();
    //             alert('Общее событие успешно создано!');
    //         } else {
    //             await createTeamEvent(requestData).unwrap();
    //             alert('Командное событие успешно создано!');
    //         }
    //
    //         setShowCreateEvent(false);
    //         refetch();
    //
    //     } catch (err: any) {
    //         console.error('Error creating event:', err);
    //         if (err.data) {
    //             alert(`Ошибка: ${err.data.error || err.data.message || 'Неверные данные'}`);
    //         } else {
    //             alert('Ошибка при создании события');
    //         }
    //     }
    // };

    const handleEventClick = (event: Event) => {
        setSelectedEvent(event);
    };

    const handleBackToList = () => {
        setSelectedEvent(null);
    };

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
            <CreateEventPage
                onCreateEvent={handleCreateEventSubmit}
                onCancel={handleCancelCreate}
                isLoading={isCreating}
                eventType={eventType}
                onEventTypeChange={handleEventTypeChange}
            />
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
