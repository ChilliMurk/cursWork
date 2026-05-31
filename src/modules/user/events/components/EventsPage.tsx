import { FC, useState } from 'react';
import { useAppSelector } from "@/common/hooks/useAppSelector.ts";
import {
    useGetAllEventsQuery,
    useGetEventsOrganizedByMeQuery,
    useGetParticipatingEventsQuery,
    useCreateCommonEventMutation,
    useCreateTeamEventMutation,
    Event
} from "@/store/reducers/eventApi/eventApi.ts";
import {
    CreateEventButton,
    EventCard,
    EventInfo,
    EventsContainer,
    EventsGrid,
    EventTitle,
    ParticipateButton,
    LoadingSpinner,
    ErrorMessage,
    TabContainer,
    TabButton
} from "@/modules/user/events/components/style.ts";
import { EmptyIcon, EmptyState, EmptyText } from "@/modules/user/teams/components/style.ts";
import { EventDetailsPage } from "./eventDetailsPage/EventDetailsPage.tsx";
import { CreateEventPage } from "./createEventPage/CreateEventPage.tsx";

type EventTab = 'all' | 'participating' | 'organized';

export const EventsPage: FC = () => {
    const [activeTab, setActiveTab] = useState<EventTab>('all');
    const [showCreateEvent, setShowCreateEvent] = useState(false);
    const [participatingEvents, setParticipatingEvents] = useState<number[]>([]);
    const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
    const [eventType, setEventType] = useState<'common' | 'team'>('common');

    const user = useAppSelector((state) => state.authReducer.user);
    const shouldSkip = !user?.token;

    // Все события
    const {
        data: allEvents = [],
        isLoading: isLoadingAll,
        error: errorAll,
        refetch: refetchAll,
        isFetching: isFetchingAll
    } = useGetAllEventsQuery(undefined, { skip: shouldSkip });

    // События, в которых участвует пользователь
    const {
        data: participatingEventsData = [],
        isLoading: isLoadingParticipating,
        error: errorParticipating,
        refetch: refetchParticipating,
        isFetching: isFetchingParticipating
    } = useGetParticipatingEventsQuery(undefined, { skip: shouldSkip });

    // События, организованные пользователем
    const {
        data: organizedEvents = [],
        isLoading: isLoadingOrganized,
        error: errorOrganized,
        refetch: refetchOrganized,
        isFetching: isFetchingOrganized
    } = useGetEventsOrganizedByMeQuery(undefined, { skip: shouldSkip });

    const [createCommonEvent, { isLoading: isCreatingCommon }] = useCreateCommonEventMutation();
    const [createTeamEvent, { isLoading: isCreatingTeam }] = useCreateTeamEventMutation();

    const isCreating = isCreatingCommon || isCreatingTeam;

    // Определяем текущие данные в зависимости от активной вкладки
    const getCurrentEvents = (): Event[] => {
        switch (activeTab) {
            case 'all':
                return allEvents;
            case 'participating':
                return participatingEventsData;
            case 'organized':
                return organizedEvents;
            default:
                return allEvents;
        }
    };

    const getCurrentLoading = (): boolean => {
        switch (activeTab) {
            case 'all':
                return isLoadingAll && !allEvents.length;
            case 'participating':
                return isLoadingParticipating && !participatingEventsData.length;
            case 'organized':
                return isLoadingOrganized && !organizedEvents.length;
            default:
                return isLoadingAll && !allEvents.length;
        }
    };

    const getCurrentError = (): any => {
        switch (activeTab) {
            case 'all':
                return errorAll;
            case 'participating':
                return errorParticipating;
            case 'organized':
                return errorOrganized;
            default:
                return errorAll;
        }
    };

    const getCurrentIsFetching = (): boolean => {
        switch (activeTab) {
            case 'all':
                return isFetchingAll;
            case 'participating':
                return isFetchingParticipating;
            case 'organized':
                return isFetchingOrganized;
            default:
                return isFetchingAll;
        }
    };

    const handleRefresh = () => {
        switch (activeTab) {
            case 'all':
                refetchAll();
                break;
            case 'participating':
                refetchParticipating();
                break;
            case 'organized':
                refetchOrganized();
                break;
        }
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
            let formattedDate;
            if (eventData.date) {
                const dateObj = new Date(eventData.date);
                if (isNaN(dateObj.getTime())) {
                    throw new Error('Invalid date');
                }
                const year = dateObj.getFullYear();
                const month = String(dateObj.getMonth() + 1).padStart(2, '0');
                const day = String(dateObj.getDate()).padStart(2, '0');
                const hours = String(dateObj.getHours()).padStart(2, '0');
                const minutes = String(dateObj.getMinutes()).padStart(2, '0');
                const seconds = String(dateObj.getSeconds()).padStart(2, '0');
                formattedDate = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
            } else {
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
            // Обновляем все списки
            refetchAll();
            refetchParticipating();
            refetchOrganized();

        } catch (err: any) {
            console.error('Error creating event:', err);
            if (err.data) {
                alert(`Ошибка: ${err.data.error || err.data.message || JSON.stringify(err.data)}`);
            } else {
                alert('Ошибка при создании события');
            }
        }
    };

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

    const currentEvents = getCurrentEvents();
    const isLoading = getCurrentLoading();
    const error = getCurrentError();
    const isFetching = getCurrentIsFetching();

    if (isLoading && !currentEvents.length) {
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

    return (
        <EventsContainer>
            {/* Вкладки навигации */}
            <TabContainer>
                <TabButton
                    isActive={activeTab === 'all'}
                    onClick={() => setActiveTab('all')}
                >
                    <i className="fas fa-calendar-alt"></i>
                    Все события
                </TabButton>
                <TabButton
                    isActive={activeTab === 'participating'}
                    onClick={() => setActiveTab('participating')}
                >
                    <i className="fas fa-user-check"></i>
                    Мои события
                </TabButton>
                <TabButton
                    isActive={activeTab === 'organized'}
                    onClick={() => setActiveTab('organized')}
                >
                    <i className="fas fa-chalkboard-user"></i>
                    Организованные мной
                </TabButton>
            </TabContainer>

            <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
                <CreateEventButton onClick={handleCreateEvent}>
                    Создать свое событие
                </CreateEventButton>
                <button onClick={handleRefresh} style={{ padding: '10px 20px' }}>
                    Обновить события
                </button>
            </div>

            {isFetching && <div>Обновление...</div>}

            {currentEvents.length > 0 ? (
                <EventsGrid>
                    {currentEvents.map((event) => (
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
                            {activeTab === 'organized' && (
                                <EventInfo>
                                    <strong>Организатор:</strong> {event.organizerName}
                                </EventInfo>
                            )}

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
                        {activeTab === 'all' && 'Пока нет запланированных событий.'}
                        {activeTab === 'participating' && 'Вы пока не участвуете ни в одном событии.'}
                        {activeTab === 'organized' && 'Вы еще не организовали ни одного события.'}
                    </EmptyText>
                    <CreateEventButton onClick={handleCreateEvent}>
                        Создать событие
                    </CreateEventButton>
                </EmptyState>
            )}
        </EventsContainer>
    );
};
