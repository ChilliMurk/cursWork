// import { FC, useState } from 'react';
// import { mockEvents } from "@/modules/user/events/components/mockEvents.tsx";
// import {
//     CreateEventButton,
//     EventCard,
//      EventInfo,
//     EventsContainer,
//     EventsGrid, EventTitle, ParticipateButton
// } from "@/modules/user/events/components/style.ts";
// import { EmptyIcon, EmptyState, EmptyText, GameButton, GameFilter } from "@/modules/user/teams/components/style.ts";
// import {CreateEventPage} from "@/modules/user/events/components/createEventPage/CreateEventPage.tsx";
// import {EventDetailsPage} from "@/modules/user/events/components/eventDetailsPage/EventDetailsPage.tsx";
//
//
// interface Event {
//     id: number;
//     title: string;
//     game: string;
//     participants: number;
//     maxParticipants: number;
//     description: string;
//     date: string;
//     status: 'upcoming' | 'ongoing' | 'completed';
//     prize: string;
// }
//
// const games = ["Все", "Counter-Strike 2", "Dota 2", "Valorant", "Mobile Legend"];
//
// export const EventsPage: FC = () => {
//     const [selectedGame, setSelectedGame] = useState("Все");
//     const [events, setEvents] = useState<Event[]>(mockEvents);
//     const [participatingEvents, setParticipatingEvents] = useState<number[]>([]);
//     const [showCreateEvent, setShowCreateEvent] = useState(false);
//     const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
//     const filteredEvents = selectedGame === "Все"
//         ? events
//         : events.filter(event => event.game === selectedGame);
//
//     const handleParticipate = (eventId: number) => {
//         if (participatingEvents.includes(eventId)) {
//             setParticipatingEvents(participatingEvents.filter(id => id !== eventId));
//             setEvents(events.map(event =>
//                 event.id === eventId
//                     ? { ...event, participants: Math.max(0, event.participants - 1) }
//                     : event
//             ));
//         } else {
//             setParticipatingEvents([...participatingEvents, eventId]);
//             setEvents(events.map(event =>
//                 event.id === eventId
//                     ? { ...event, participants: Math.min(event.maxParticipants, event.participants + 1) }
//                     : event
//             ));
//         }
//     };
//
//     const handleCreateEvent = () => {
//         setShowCreateEvent(true);
//     };
//
//     const handleCancelCreate = () => {
//         setShowCreateEvent(false);
//     };
//
//     const handleEventCreated = (eventData: Omit<Event, 'id' | 'participants'>) => {
//         const newEvent: Event = {
//             ...eventData,
//             id: Math.max(...events.map(e => e.id), 0) + 1,
//             participants: 0
//         };
//
//         setEvents([...events, newEvent]);
//         setShowCreateEvent(false);
//     };
//
//     const handleEventClick = (event: Event) => {
//         setSelectedEvent(event);
//     };
//
//     const handleBackToList = () => {
//         setSelectedEvent(null);
//     };
//
//     // const getStatusText = (status: string) => {
//     //     switch(status) {
//     //         case 'upcoming': return 'Предстоящее';
//     //         case 'ongoing': return 'Текущее';
//     //         case 'completed': return 'Завершено';
//     //         default: return status;
//     //     }
//     // };
//
//     if (showCreateEvent) {
//         return (
//             <CreateEventPage
//                 onCreateEvent={handleEventCreated}
//                 onCancel={handleCancelCreate}
//             />
//         );
//     }
//
//     if (selectedEvent) {
//         return (
//             <EventDetailsPage
//                 event={selectedEvent}
//                 onBack={handleBackToList}
//                 onParticipate={handleParticipate}
//                 participatingEvents={participatingEvents}
//             />
//         );
//     }
//
//     return (
//         <EventsContainer>
//             <GameFilter>
//                 {games.map(game => (
//                     <GameButton
//                         key={game}
//                         isActive={selectedGame === game}
//                         onClick={() => setSelectedGame(game)}
//                     >
//                         {game}
//                     </GameButton>
//                 ))}
//             </GameFilter>
//
//             <CreateEventButton onClick={handleCreateEvent}>
//                 Создать свое событие
//             </CreateEventButton>
//
//             {filteredEvents.length > 0 ? (
//                 <EventsGrid>
//                     {filteredEvents.map(event => (
//                         <EventCard
//                             key={event.id}
//                             onClick={() => handleEventClick(event)} // Добавляем обработчик клика
//                             style={{ cursor: 'pointer' }} // Меняем курсор при наведении
//                         >
//                             {/*<EventGame>{event.game}</EventGame>*/}
//                             {/*<EventStatus status={event.status}>{getStatusText(event.status)}</EventStatus>*/}
//                             <EventTitle>{event.title}</EventTitle>
//                             <EventInfo>{event.description}</EventInfo>
//
//                             {/*<EventMeta>*/}
//                             {/*    <span>Участников: {event.participants}/{event.maxParticipants}</span>*/}
//                             {/*</EventMeta>*/}
//
//                             {/*<EventDate>*/}
//                             {/*    <i className="fas fa-calendar-alt"></i>*/}
//                             {/*    <span>{event.date}</span>*/}
//                             {/*</EventDate>*/}
//
//                             {/*<EventPrize>*/}
//                             {/*    <i className="fas fa-trophy"></i> Призовой фонд: {event.prize}*/}
//                             {/*</EventPrize>*/}
//
//                             <ParticipateButton
//                                 onClick={(e) => {
//                                     e.stopPropagation(); // Предотвращаем всплытие события
//                                     handleParticipate(event.id);
//                                 }}
//                                 isParticipating={participatingEvents.includes(event.id)}
//                                 disabled={event.status === 'completed'}
//                             >
//                                 {participatingEvents.includes(event.id)
//                                     ? 'Отказаться от участия'
//                                     : event.status === 'completed'
//                                         ? 'Событие завершено'
//                                         : 'Участвовать'}
//                             </ParticipateButton>
//                         </EventCard>
//                     ))}
//                 </EventsGrid>
//             ) : (
//                 <EmptyState>
//                     <EmptyIcon>
//                         <i className="fas fa-calendar-times"></i>
//                     </EmptyIcon>
//                     <EmptyText>
//                         {selectedGame === "Все"
//                             ? "Пока нет запланированных событий. Станьте первым, создав свое событие!"
//                             : `Нет событий по игре ${selectedGame}. Станьте первым, создав событие!`}
//                     </EmptyText>
//                     <CreateEventButton onClick={handleCreateEvent}>
//                         Создать событие
//                     </CreateEventButton>
//                 </EmptyState>
//             )}
//         </EventsContainer>
//     );
// };



// import { FC, useState, useEffect } from 'react';
// import { useAppSelector } from "@/common/hooks/useAppSelector.ts";
// import {
//     CreateEventButton,
//     EventCard,
//     EventInfo,
//     EventsContainer,
//     EventsGrid,
//     EventTitle,
//     ParticipateButton,
//     LoadingSpinner,
//     ErrorMessage
// } from "@/modules/user/events/components/style.ts";
// import { EmptyIcon, EmptyState, EmptyText, GameButton, GameFilter } from "@/modules/user/teams/components/style.ts";
// import { CreateEventPage } from "@/modules/user/events/components/createEventPage/CreateEventPage.tsx";
// import { EventDetailsPage } from "@/modules/user/events/components/eventDetailsPage/EventDetailsPage.tsx";
// import { useGetAdminEventsQuery, useGetAllEventsQuery, ServerEvent } from "@/store/reducers/eventApi/eventApi.ts";
//
// // Расширенный интерфейс для отображения на фронтенде
// interface DisplayEvent extends ServerEvent {
//     game: string;
//     participants: number;
//     maxParticipants: number;
//     date: string;
//     status: 'upcoming' | 'ongoing' | 'completed';
//     prize: string;
// }
//
// const games = ["Все", "Counter-Strike 2", "Dota 2", "Valorant", "Mobile Legend"];
//
// // Функция для преобразования серверных данных в данные для отображения
// const transformServerEvent = (serverEvent: ServerEvent): DisplayEvent => {
//     return {
//         ...serverEvent,
//         // Здесь вы можете добавить логику для определения этих полей
//         // или использовать значения по умолчанию
//         game: "Counter-Strike 2", // Замените на реальную логику
//         participants: 0,
//         maxParticipants: 10,
//         date: new Date().toLocaleDateString(),
//         status: 'upcoming',
//         prize: '0 ₽'
//     };
// };
//
// export const EventsPage: FC = () => {
//     const [selectedGame, setSelectedGame] = useState("Все");
//     const [showCreateEvent, setShowCreateEvent] = useState(false);
//     const [selectedEvent, setSelectedEvent] = useState<DisplayEvent | null>(null);
//     const [displayEvents, setDisplayEvents] = useState<DisplayEvent[]>([]);
//
//     const user = useAppSelector((state) => state.authReducer.user);
//     const isAdmin = user?.role === 'admin';
//
//     const {
//         data: serverEvents = [],
//         isLoading,
//         error,
//         refetch
//     } = isAdmin
//         ? useGetAdminEventsQuery()
//         : useGetAllEventsQuery();
//
//     // Преобразуем серверные данные при их получении
//     useEffect(() => {
//         const transformed = serverEvents.map(transformServerEvent);
//         setDisplayEvents(transformed);
//     }, [serverEvents]);
//
//     // Обновляем данные при монтировании компонента
//     useEffect(() => {
//         refetch();
//     }, [refetch]);
//
//     // Фильтрация по игре (временно отключаем, пока нет поля game)
//     const filteredEvents = selectedGame === "Все"
//         ? displayEvents
//         : displayEvents.filter(event => event.game === selectedGame);
//
//     const handleParticipate = (eventId: number) => {
//         console.log('Participate in event:', eventId);
//     };
//
//     const handleCreateEvent = () => {
//         setShowCreateEvent(true);
//     };
//
//     const handleCancelCreate = () => {
//         setShowCreateEvent(false);
//     };
//
//     const handleEventCreated = () => {
//         refetch();
//         setShowCreateEvent(false);
//     };
//
//     const handleEventClick = (event: DisplayEvent) => {
//         setSelectedEvent(event);
//     };
//
//     const handleBackToList = () => {
//         setSelectedEvent(null);
//     };
//
//     if (isLoading) {
//         return (
//             <EventsContainer>
//                 <LoadingSpinner>Загрузка событий...</LoadingSpinner>
//             </EventsContainer>
//         );
//     }
//
//     if (error) {
//         return (
//             <EventsContainer>
//                 <ErrorMessage>
//                     Ошибка при загрузке событий. Пожалуйста, попробуйте позже.
//                 </ErrorMessage>
//             </EventsContainer>
//         );
//     }
//
//     if (showCreateEvent) {
//         return (
//             <CreateEventPage
//                 onCreateEvent={handleEventCreated}
//                 onCancel={handleCancelCreate}
//             />
//         );
//     }
//
//     if (selectedEvent) {
//         return (
//             <EventDetailsPage
//                 event={selectedEvent}
//                 onBack={handleBackToList}
//                 onParticipate={handleParticipate}
//                 participatingEvents={[]}
//             />
//         );
//     }
//
//     return (
//         <EventsContainer>
//             <GameFilter>
//                 {games.map(game => (
//                     <GameButton
//                         key={game}
//                         isActive={selectedGame === game}
//                         onClick={() => setSelectedGame(game)}
//                     >
//                         {game}
//                     </GameButton>
//                 ))}
//             </GameFilter>
//
//             <CreateEventButton onClick={handleCreateEvent}>
//                 Создать свое событие
//             </CreateEventButton>
//
//             {filteredEvents.length > 0 ? (
//                 <EventsGrid>
//                     {filteredEvents.map(event => (
//                         <EventCard
//                             key={event.id}
//                             onClick={() => handleEventClick(event)}
//                             style={{ cursor: 'pointer' }}
//                         >
//                             <EventTitle>{event.title}</EventTitle>
//                             <EventInfo>{event.description}</EventInfo>
//
//                             <ParticipateButton
//                                 onClick={(e) => {
//                                     e.stopPropagation();
//                                     handleParticipate(event.id);
//                                 }}
//                                 isParticipating={false} // или любое другое значение по умолчанию
//                             >
//                                 Участвовать
//                             </ParticipateButton>
//                         </EventCard>
//                     ))}
//                 </EventsGrid>
//             ) : (
//                 <EmptyState>
//                     <EmptyIcon>
//                         <i className="fas fa-calendar-times"></i>
//                     </EmptyIcon>
//                     <EmptyText>
//                         {selectedGame === "Все"
//                             ? "Пока нет запланированных событий. Станьте первым, создав свое событие!"
//                             : `Нет событий по игре ${selectedGame}. Станьте первым, создав событие!`}
//                     </EmptyText>
//                     <CreateEventButton onClick={handleCreateEvent}>
//                         Создать событие
//                     </CreateEventButton>
//                 </EmptyState>
//             )}
//         </EventsContainer>
//     );
// };












// import { useGetAdminEventsQuery } from "@/store/reducers/eventApi/eventApi.ts";
// import {
//     CreateEventButton,
//     EventCard,
//     EventInfo,
//     EventsContainer,
//     EventsGrid,
//     EventTitle,
//     ParticipateButton,
//     LoadingSpinner,
//     ErrorMessage
// } from "@/modules/user/events/components/style.ts";
// import { EmptyIcon, EmptyState, EmptyText } from "@/modules/user/teams/components/style.ts";
// import {FC, useState} from "react";
//
// // Интерфейс для события
// interface Event {
//     id: number;
//     title: string;
//     description: string;
// }
//
// export const EventsPage: FC = () => {
//     const [showCreateEvent, setShowCreateEvent] = useState(false);
//     const [participatingEvents, setParticipatingEvents] = useState<number[]>([]);
//
//     // Используем правильный эндпоинт для админа
//     const {
//         data: events = [],
//         isLoading,
//         error,
//         refetch
//     } = useGetAdminEventsQuery();
//
//     console.log('Events loaded:', events); // для отладки
//
//     const handleParticipate = (eventId: number) => {
//         setParticipatingEvents(prev =>
//             prev.includes(eventId)
//                 ? prev.filter(id => id !== eventId)
//                 : [...prev, eventId]
//         );
//     };
//
//     const handleCreateEvent = () => {
//         setShowCreateEvent(true);
//     };
//
//     const handleCancelCreate = () => {
//         setShowCreateEvent(false);
//     };
//
//     const handleEventClick = (event: Event) => {
//         console.log('Event clicked:', event);
//         // TODO: добавить детальный просмотр
//     };
//
//     if (isLoading) {
//         return (
//             <EventsContainer>
//                 <LoadingSpinner>Загрузка событий...</LoadingSpinner>
//             </EventsContainer>
//         );
//     }
//
//     if (error) {
//         console.error('Error loading events:', error);
//         return (
//             <EventsContainer>
//                 <ErrorMessage>
//                     <h3>Ошибка при загрузке событий</h3>
//                     <p>Пожалуйста, попробуйте позже.</p>
//                     <button onClick={() => refetch()}>
//                         Повторить попытку
//                     </button>
//                 </ErrorMessage>
//             </EventsContainer>
//         );
//     }
//
//     if (showCreateEvent) {
//         return (
//             <div>
//                 <h2>Создание события (в разработке)</h2>
//                 <button onClick={handleCancelCreate}>Назад</button>
//             </div>
//         );
//     }
//
//     return (
//         <EventsContainer>
//             <CreateEventButton onClick={handleCreateEvent}>
//                 Создать свое событие
//             </CreateEventButton>
//
//             {events.length > 0 ? (
//                 <EventsGrid>
//                     {events.map((event) => (
//                         <EventCard
//                             key={event.id}
//                             onClick={() => handleEventClick(event)}
//                             style={{ cursor: 'pointer' }}
//                         >
//                             <EventTitle>{event.title || 'Без названия'}</EventTitle>
//                             <EventInfo>{event.description || 'Нет описания'}</EventInfo>
//
//                             <ParticipateButton
//                                 onClick={(e) => {
//                                     e.stopPropagation();
//                                     handleParticipate(event.id);
//                                 }}
//                                 isParticipating={participatingEvents.includes(event.id)}
//                             >
//                                 {participatingEvents.includes(event.id)
//                                     ? 'Отказаться от участия'
//                                     : 'Участвовать'}
//                             </ParticipateButton>
//                         </EventCard>
//                     ))}
//                 </EventsGrid>
//             ) : (
//                 <EmptyState>
//                     <EmptyIcon>
//                         <i className="fas fa-calendar-times"></i>
//                     </EmptyIcon>
//                     <EmptyText>
//                         Пока нет запланированных событий. Станьте первым, создав свое событие!
//                     </EmptyText>
//                     <CreateEventButton onClick={handleCreateEvent}>
//                         Создать событие
//                     </CreateEventButton>
//                 </EmptyState>
//             )}
//         </EventsContainer>
//     );
// };



//
// import { FC, useState, useEffect } from 'react';
// import { useAppSelector } from "@/common/hooks/useAppSelector.ts";
// import { useGetAdminEventsQuery } from "@/store/reducers/eventApi/eventApi.ts";
// import {
//     CreateEventButton,
//     EventCard,
//     EventInfo,
//     EventsContainer,
//     EventsGrid,
//     EventTitle,
//     ParticipateButton,
//     LoadingSpinner,
//     ErrorMessage
// } from "@/modules/user/events/components/style.ts";
// import { EmptyIcon, EmptyState, EmptyText } from "@/modules/user/teams/components/style.ts";
//
// // Интерфейс для события с правильными полями
// interface Event {
//     id: number;
//     name: string;        // важно: name, а не title!
//     description: string;
// }
//
// export const EventsPage: FC = () => {
//     const [showCreateEvent, setShowCreateEvent] = useState(false);
//     const [participatingEvents, setParticipatingEvents] = useState<number[]>([]);
//
//     const user = useAppSelector((state) => state.authReducer.user);
//
//     const {
//         data: events = [],
//         isLoading,
//         error,
//         refetch
//     } = useGetAdminEventsQuery();
//
//     // Отладка - смотрим что приходит
//     useEffect(() => {
//         console.log('User token:', user?.token);
//         console.log('Events from server:', events);
//     }, [events, user]);
//
//     const handleParticipate = (eventId: number) => {
//         setParticipatingEvents(prev =>
//             prev.includes(eventId)
//                 ? prev.filter(id => id !== eventId)
//                 : [...prev, eventId]
//         );
//     };
//
//     const handleCreateEvent = () => {
//         setShowCreateEvent(true);
//     };
//
//     const handleCancelCreate = () => {
//         setShowCreateEvent(false);
//     };
//
//     const handleEventClick = (event: Event) => {
//         console.log('Event clicked:', event);
//     };
//
//     if (isLoading) {
//         return (
//             <EventsContainer>
//                 <LoadingSpinner>Загрузка событий...</LoadingSpinner>
//             </EventsContainer>
//         );
//     }
//
//     if (error) {
//         console.error('Error details:', error);
//         return (
//             <EventsContainer>
//                 <ErrorMessage>
//                     <h3>Ошибка при загрузке событий</h3>
//                     <p>Пожалуйста, попробуйте позже.</p>
//                     <button onClick={() => refetch()}>
//                         Повторить попытку
//                     </button>
//                 </ErrorMessage>
//             </EventsContainer>
//         );
//     }
//
//     if (showCreateEvent) {
//         return (
//             <div>
//                 <h2>Создание события (в разработке)</h2>
//                 <button onClick={handleCancelCreate}>Назад</button>
//             </div>
//         );
//     }
//
//     return (
//         <EventsContainer>
//             <CreateEventButton onClick={handleCreateEvent}>
//                 Создать свое событие
//             </CreateEventButton>
//
//             {events.length > 0 ? (
//                 <EventsGrid>
//                     {events.map((event) => (
//                         <EventCard
//                             key={event.id}
//                             onClick={() => handleEventClick(event)}
//                             style={{ cursor: 'pointer' }}
//                         >
//                             {/* Важно: используем event.name, а не event.title! */}
//                             <EventTitle>{event.name || 'Без названия'}</EventTitle>
//                             <EventInfo>{event.description || 'Нет описания'}</EventInfo>
//
//                             <ParticipateButton
//                                 onClick={(e) => {
//                                     e.stopPropagation();
//                                     handleParticipate(event.id);
//                                 }}
//                                 isParticipating={participatingEvents.includes(event.id)}
//                             >
//                                 {participatingEvents.includes(event.id)
//                                     ? 'Отказаться от участия'
//                                     : 'Участвовать'}
//                             </ParticipateButton>
//                         </EventCard>
//                     ))}
//                 </EventsGrid>
//             ) : (
//                 <EmptyState>
//                     <EmptyIcon>
//                         <i className="fas fa-calendar-times"></i>
//                     </EmptyIcon>
//                     <EmptyText>
//                         Пока нет запланированных событий. Станьте первым, создав свое событие!
//                     </EmptyText>
//                     <CreateEventButton onClick={handleCreateEvent}>
//                         Создать событие
//                     </CreateEventButton>
//                 </EmptyState>
//             )}
//         </EventsContainer>
//     );
// };


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