// import { FC, useState } from 'react';
// import {mockEvents} from "@/modules/user/events/components/mockEvents.tsx";
// import {
//     CreateEventButton,
//     EventCard, EventDate,
//     EventGame, EventInfo, EventMeta, EventPrize,
//     EventsContainer,
//     EventsGrid, EventStatus, EventTitle, ParticipateButton
// } from "@/modules/user/events/components/style.ts";
// import {EmptyIcon, EmptyState, EmptyText, GameButton, GameFilter} from "@/modules/user/teams/components/style.ts";
//
//
// import {useNavigate} from "react-router-dom";
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
//     const [events] = useState<Event[]>(mockEvents);
//     const [participatingEvents, setParticipatingEvents] = useState<number[]>([]);
//
//
//     const filteredEvents = selectedGame === "Все"
//         ? events
//         : events.filter(event => event.game === selectedGame);
//
//     const handleParticipate = (eventId: number) => {
//         if (participatingEvents.includes(eventId)) {
//             setParticipatingEvents(participatingEvents.filter(id => id !== eventId));
//             alert(`Вы отказались от участия в событии ${eventId}`);
//         } else {
//             setParticipatingEvents([...participatingEvents, eventId]);
//             alert(`Вы успешно зарегистрировались на событие ${eventId}`);
//         }
//     };
//
//     const navigate = useNavigate();
//
//     const handleCreateEvent = () => {
//         navigate('/events/create'); // Переход на страницу создания
//     };
//
//     const getStatusText = (status: string) => {
//         switch(status) {
//             case 'upcoming': return 'Предстоящее';
//             case 'ongoing': return 'Текущее';
//             case 'completed': return 'Завершено';
//             default: return status;
//         }
//     };
//
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
//                         <EventCard key={event.id}>
//                             <EventGame>{event.game}</EventGame>
//                             <EventStatus status={event.status}>{getStatusText(event.status)}</EventStatus>
//                             <EventTitle>{event.title}</EventTitle>
//                             <EventInfo>{event.description}</EventInfo>
//
//                             <EventMeta>
//                                 <span>Участников: {event.participants}/{event.maxParticipants}</span>
//                             </EventMeta>
//
//                             <EventDate>
//                                 <i className="fas fa-calendar-alt"></i>
//                                 <span>{event.date}</span>
//                             </EventDate>
//
//                             <EventPrize>
//                                 <i className="fas fa-trophy"></i> Призовой фонд: {event.prize}
//                             </EventPrize>
//
//                             <ParticipateButton
//                                 onClick={() => handleParticipate(event.id)}
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



import { FC, useState } from 'react';
import {mockEvents} from "@/modules/user/events/components/mockEvents.tsx";
import {
    CreateEventButton,
    EventCard, EventDate,
    EventGame, EventInfo, EventMeta, EventPrize,
    EventsContainer,
    EventsGrid, EventStatus, EventTitle, ParticipateButton
} from "@/modules/user/events/components/style.ts";
import {EmptyIcon, EmptyState, EmptyText, GameButton, GameFilter} from "@/modules/user/teams/components/style.ts";
import {CreateEventPage} from "@/modules/user/events/components/createEventPage/CreateEventPage.tsx";


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

const games = ["Все", "Counter-Strike 2", "Dota 2", "Valorant", "Mobile Legend"];

export const EventsPage: FC = () => {
    const [selectedGame, setSelectedGame] = useState("Все");
    const [events, setEvents] = useState<Event[]>(mockEvents);
    const [participatingEvents, setParticipatingEvents] = useState<number[]>([]);
    const [showCreateEvent, setShowCreateEvent] = useState(false); // Новое состояние

    const filteredEvents = selectedGame === "Все"
        ? events
        : events.filter(event => event.game === selectedGame);

    const handleParticipate = (eventId: number) => {
        if (participatingEvents.includes(eventId)) {
            setParticipatingEvents(participatingEvents.filter(id => id !== eventId));
            alert(`Вы отказались от участия в событии ${eventId}`);
        } else {
            setParticipatingEvents([...participatingEvents, eventId]);
            alert(`Вы успешно зарегистрировались на событие ${eventId}`);
        }
    };

    const handleCreateEvent = () => {
        setShowCreateEvent(true); // Переключаем на страницу создания
    };

    const handleCancelCreate = () => {
        setShowCreateEvent(false); // Возвращаемся к списку событий
    };

    const handleEventCreated = (eventData: Omit<Event, 'id' | 'participants'>) => {
        // Создаем новое событие с уникальным ID
        const newEvent: Event = {
            ...eventData,
            id: Math.max(...events.map(e => e.id), 0) + 1, // Генерируем новый ID
            participants: 0 // Начинаем с 0 участников
        };

        setEvents([...events, newEvent]);
        setShowCreateEvent(false); // Возвращаемся к списку
        alert('Событие успешно создано!');
    };

    const getStatusText = (status: string) => {
        switch(status) {
            case 'upcoming': return 'Предстоящее';
            case 'ongoing': return 'Текущее';
            case 'completed': return 'Завершено';
            default: return status;
        }
    };

    // Если показываем страницу создания, рендерим её
    if (showCreateEvent) {
        return (
            <CreateEventPage
                onCreateEvent={handleEventCreated}
                onCancel={handleCancelCreate}
            />
        );
    }

    // Иначе рендерим обычную страницу событий
    return (
        <EventsContainer>
            <GameFilter>
                {games.map(game => (
                    <GameButton
                        key={game}
                        isActive={selectedGame === game}
                        onClick={() => setSelectedGame(game)}
                    >
                        {game}
                    </GameButton>
                ))}
            </GameFilter>

            <CreateEventButton onClick={handleCreateEvent}>
                Создать свое событие
            </CreateEventButton>

            {filteredEvents.length > 0 ? (
                <EventsGrid>
                    {filteredEvents.map(event => (
                        <EventCard key={event.id}>
                            <EventGame>{event.game}</EventGame>
                            <EventStatus status={event.status}>{getStatusText(event.status)}</EventStatus>
                            <EventTitle>{event.title}</EventTitle>
                            <EventInfo>{event.description}</EventInfo>

                            <EventMeta>
                                <span>Участников: {event.participants}/{event.maxParticipants}</span>
                            </EventMeta>

                            <EventDate>
                                <i className="fas fa-calendar-alt"></i>
                                <span>{event.date}</span>
                            </EventDate>

                            <EventPrize>
                                <i className="fas fa-trophy"></i> Призовой фонд: {event.prize}
                            </EventPrize>

                            <ParticipateButton
                                onClick={() => handleParticipate(event.id)}
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
                        {selectedGame === "Все"
                            ? "Пока нет запланированных событий. Станьте первым, создав свое событие!"
                            : `Нет событий по игре ${selectedGame}. Станьте первым, создав событие!`}
                    </EmptyText>
                    <CreateEventButton onClick={handleCreateEvent}>
                        Создать событие
                    </CreateEventButton>
                </EmptyState>
            )}
        </EventsContainer>
    );
};
