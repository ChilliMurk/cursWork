import {FC, useState} from 'react';
import {
    useGetAllEventsQuery,
    useGetEventsOrganizedByMeQuery,
    useGetParticipatingEventsQuery,
    useGetTeamEventsQuery,
    useGetCommonEventsQuery,
    useCreateCommonEventMutation,
    useCreateTeamEventMutation,
    useParticipateInEventMutation,
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
import {EmptyIcon, EmptyState, EmptyText} from "@/modules/user/teams/components/style.ts";
import {EventDetailsPage} from "./eventDetailsPage/EventDetailsPage.tsx";
import {CreateEventPage} from "./createEventPage/CreateEventPage.tsx";
import {useGetCurrentUserQuery} from "@/store/reducers/userApi/userApi";

type EventTab = 'common' | 'team' | 'all' | 'participating' | 'organized';

// Функция для проверки, прошло ли событие
const isEventPast = (eventDate: string): boolean => {
    const eventDateTime = new Date(eventDate);
    const now = new Date();
    return eventDateTime < now;
};

const hasRole = (userRoles: string[] | undefined, role: string): boolean => {
    return userRoles?.some(r => r === role || r === `ROLE_${role}`) || false;
};

export const EventsPage: FC = () => {
    const {data: userData} = useGetCurrentUserQuery();
    const userRoles = userData?.roles || [];

    const isAdmin = hasRole(userRoles, 'ADMIN');
    const isCaptain = hasRole(userRoles, 'CAPTAIN');
    const isPlayer = hasRole(userRoles, 'PLAYER');
    const isAuthenticated = !!userData;

    const [activeTab, setActiveTab] = useState<EventTab>(
        isAdmin ? 'all' : 'common'
    );
    const [showCreateEvent, setShowCreateEvent] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
    const [eventType, setEventType] = useState<'common' | 'team'>('common');

    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1;
    const currentYear = currentDate.getFullYear();

    const shouldSkip = !isAuthenticated;

    // Все события (только для ADMIN)
    const {
        data: allEvents = [],
        isLoading: isLoadingAll,
        error: errorAll,
        refetch: refetchAll,
        isFetching: isFetchingAll
    } = useGetAllEventsQuery(undefined, {skip: shouldSkip || !isAdmin});

    // Общие события (доступны всем)
    const {
        data: commonEvents = [],
        isLoading: isLoadingCommon,
        error: errorCommon,
        refetch: refetchCommon,
        isFetching: isFetchingCommon
    } = useGetCommonEventsQuery(
        {month: currentMonth, year: currentYear},
        {skip: shouldSkip}
    );

    // Командные события (для капитана и игроков команды)
    const {
        data: teamEvents = [],
        isLoading: isLoadingTeam,
        error: errorTeam,
        refetch: refetchTeam,
        isFetching: isFetchingTeam
    } = useGetTeamEventsQuery(
        {month: currentMonth, year: currentYear},
        {skip: shouldSkip || !(isCaptain || isPlayer)}
    );

    const {
        data: participatingEventsData = [],
        isLoading: isLoadingParticipating,
        error: errorParticipating,
        refetch: refetchParticipating,
        isFetching: isFetchingParticipating
    } = useGetParticipatingEventsQuery(
        {month: currentMonth, year: currentYear},
        {skip: shouldSkip}
    );

    const {
        data: organizedEvents = [],
        isLoading: isLoadingOrganized,
        error: errorOrganized,
        refetch: refetchOrganized,
        isFetching: isFetchingOrganized
    } = useGetEventsOrganizedByMeQuery(undefined, {skip: shouldSkip});

    const [createCommonEvent, {isLoading: isCreatingCommon}] = useCreateCommonEventMutation();
    const [createTeamEvent, {isLoading: isCreatingTeam}] = useCreateTeamEventMutation();
    const [participateInEvent] = useParticipateInEventMutation();

    const isCreating = isCreatingCommon || isCreatingTeam;
    const participatingEventIds = participatingEventsData.map(e => e.id);

    const getCurrentEvents = (): Event[] => {
        switch (activeTab) {
            case 'all':
                return allEvents;
            case 'common':
                return commonEvents;
            case 'team':
                return teamEvents;
            case 'participating':
                return participatingEventsData;
            case 'organized':
                return organizedEvents;
            default:
                return commonEvents;
        }
    };

    const getCurrentLoading = (): boolean => {
        switch (activeTab) {
            case 'all':
                return isLoadingAll && !allEvents.length;
            case 'common':
                return isLoadingCommon && !commonEvents.length;
            case 'team':
                return isLoadingTeam && !teamEvents.length;
            case 'participating':
                return isLoadingParticipating && !participatingEventsData.length;
            case 'organized':
                return isLoadingOrganized && !organizedEvents.length;
            default:
                return isLoadingCommon && !commonEvents.length;
        }
    };

    const getCurrentError = (): any => {
        switch (activeTab) {
            case 'all':
                return errorAll;
            case 'common':
                return errorCommon;
            case 'team':
                return errorTeam;
            case 'participating':
                return errorParticipating;
            case 'organized':
                return errorOrganized;
            default:
                return errorCommon;
        }
    };

    const getCurrentIsFetching = (): boolean => {
        switch (activeTab) {
            case 'all':
                return isFetchingAll;
            case 'common':
                return isFetchingCommon;
            case 'team':
                return isFetchingTeam;
            case 'participating':
                return isFetchingParticipating;
            case 'organized':
                return isFetchingOrganized;
            default:
                return isFetchingCommon;
        }
    };

    const handleRefresh = () => {
        switch (activeTab) {
            case 'all':
                refetchAll();
                break;
            case 'common':
                refetchCommon();
                break;
            case 'team':
                refetchTeam();
                break;
            case 'participating':
                refetchParticipating();
                break;
            case 'organized':
                refetchOrganized();
                break;
        }
    };

    const handleParticipate = async (eventId: number) => {
        try {
            await participateInEvent(eventId).unwrap();
            alert('Вы успешно зарегистрировались на событие!');
            refetchAll();
            refetchCommon();
            refetchTeam();
            refetchParticipating();
            refetchOrganized();
        } catch (error: any) {
            console.error('Error participating in event:', error);
            alert(error.data?.message || 'Ошибка при регистрации на событие');
        }
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

            if (eventType === 'common') {
                await createCommonEvent(requestData).unwrap();
                alert('Общее событие успешно создано!');
            } else {
                await createTeamEvent(requestData).unwrap();
                alert('Командное событие успешно создано!');
            }

            setShowCreateEvent(false);
            refetchAll();
            refetchCommon();
            refetchTeam();
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
                isParticipating={participatingEventIds.includes(selectedEvent.id)}
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
            <TabContainer>
                {/* Все события - только для ADMIN */}
                {isAdmin && (
                    <TabButton
                        isActive={activeTab === 'all'}
                        onClick={() => setActiveTab('all')}
                    >
                        <i className="fas fa-globe"></i>
                        Все события
                    </TabButton>
                )}

                {/* Общие события - доступны всем авторизованным пользователям */}
                <TabButton
                    isActive={activeTab === 'common'}
                    onClick={() => setActiveTab('common')}
                >
                    <i className="fas fa-users"></i>
                    Общие события
                </TabButton>

                {/* Командные события - только для капитана и игроков команды */}
                {(isCaptain || isPlayer) && (
                    <TabButton
                        isActive={activeTab === 'team'}
                        onClick={() => setActiveTab('team')}
                    >
                        <i className="fas fa-users-between"></i>
                        Командные события
                    </TabButton>
                )}

                {/* Мои события - доступны всем авторизованным пользователям */}
                <TabButton
                    isActive={activeTab === 'participating'}
                    onClick={() => setActiveTab('participating')}
                >
                    <i className="fas fa-user-check"></i>
                    Мои события
                </TabButton>

                {/* Организованные мной - доступны всем авторизованным пользователям */}
                <TabButton
                    isActive={activeTab === 'organized'}
                    onClick={() => setActiveTab('organized')}
                >
                    <i className="fas fa-chalkboard-user"></i>
                    Организованные мной
                </TabButton>
            </TabContainer>

            <div style={{display: 'flex', gap: '10px', marginBottom: '20px'}}>
                <CreateEventButton onClick={handleCreateEvent}>
                    Создать свое событие
                </CreateEventButton>
            </div>

            {isFetching && <div>Обновление...</div>}

            {currentEvents.length > 0 ? (
                <EventsGrid>
                    {currentEvents.map((event) => {
                        const isParticipating = participatingEventIds.includes(event.id);
                        const eventPast = isEventPast(event.date);

                        const isDisabled = event.status === 'completed' || eventPast || isParticipating;

                        let buttonText = 'Участвовать';
                        if (isParticipating) {
                            buttonText = '✓ Вы участвуете';
                        } else if (event.status === 'completed') {
                            buttonText = 'Событие завершено';
                        } else if (eventPast) {
                            buttonText = 'Событие прошло';
                        }

                        return (
                            <EventCard
                                key={event.id}
                                onClick={() => handleEventClick(event)}
                                style={{cursor: 'pointer'}}
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
                                        if (!isDisabled && !isParticipating) {
                                            handleParticipate(event.id);
                                        }
                                    }}
                                    isParticipating={isParticipating}
                                    disabled={isDisabled}
                                >
                                    {buttonText}
                                </ParticipateButton>
                            </EventCard>
                        );
                    })}
                </EventsGrid>
            ) : (
                <EmptyState>
                    <EmptyIcon>
                        <i className="fas fa-calendar-times"></i>
                    </EmptyIcon>
                    <EmptyText>
                        {activeTab === 'all' && 'Нет событий для отображения.'}
                        {activeTab === 'common' && 'Нет общих событий.'}
                        {activeTab === 'team' && 'Нет командных событий.'}
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
