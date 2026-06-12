import {FC, useState, JSX} from 'react';
import {
    CalendarApp,
    NavButtons,
    BackButton,
    CalendarTitle,
    CalendarGridLayout,
    CalendarCard,
    MonthHeader,
    MonthYear,
    MonthNav,
    NavButton,
    Weekdays,
    Weekday,
    DaysGrid,
    DayCell,
    DayNumber,
    EventBadge,
    SidebarPanel,
    SelectedDateTitle,
    FilterSwitch,
    FilterButton,
    EventsList,
    EventItem,
    EventTitle,
    EventTime,
    EventGame,
    EventPrize,
    EmptyMessage
} from "@/modules/user/calendar/style.ts";

interface Tournament {
    id: number;
    title: string;
    date: string;
    time: string;
    type: 'tournament';
    game?: string;
    prize?: string;
}

interface SubscribedEvent {
    id: number;
    title: string;
    date: string;
    time: string;
    type: 'subscribed';
    description?: string;
    game?: string;
}

type CalendarEvent = Tournament | SubscribedEvent;

interface CalendarPageProps {
    onBack: () => void;
}

const tournaments: Tournament[] = [
    {
        id: 1,
        title: "Кубок Хищных Бобров (CS2)",
        date: "2026-05-28",
        time: "19:00",
        type: "tournament",
        game: "CS2",
        prize: "30 000₽"
    },
    {id: 2, title: "Dota 2: Northern Clash", date: "2026-05-30", time: "17:30", type: "tournament", game: "Dota 2"},
    {id: 3, title: "Valorant Pro League", date: "2026-06-05", time: "20:00", type: "tournament", game: "Valorant"},
    {id: 4, title: "Mobile Legends: Midseason Cup", date: "2026-06-12", time: "15:00", type: "tournament"},
    {id: 5, title: "CS2: Faceit Friday Showdown", date: "2026-05-23", time: "21:00", type: "tournament"}
];

const subscribedEvents: SubscribedEvent[] = [
    {
        id: 101,
        title: "Тренировка команды (основной состав)",
        date: "2026-05-25",
        time: "19:00 - 21:00",
        type: "subscribed",
        description: "Разбор тактик + демки"
    },
    {id: 102, title: "Стрим капитана: разбор меты", date: "2026-05-26", time: "20:00", type: "subscribed"},
    {id: 103, title: "Индивидуальные занятия с тренером", date: "2026-05-27", time: "18:30", type: "subscribed"},
    {id: 104, title: "Открытый воркшоп по психологии", date: "2026-06-02", time: "17:00", type: "subscribed"},
    {id: 105, title: "Матч с командой 'Wolves' (товарищеский)", date: "2026-05-29", time: "20:30", type: "subscribed"}
];

export const CalendarPage: FC<CalendarPageProps> = ({onBack}) => {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [currentDisplayYear, setCurrentDisplayYear] = useState(new Date().getFullYear());
    const [currentDisplayMonth, setCurrentDisplayMonth] = useState(new Date().getMonth());
    const [currentFilter, setCurrentFilter] = useState<'all' | 'tournament' | 'subscribed'>('all');

    const getEventsForDate = (dateKey: string): CalendarEvent[] => {
        const events: CalendarEvent[] = [];
        tournaments.forEach(t => {
            if (t.date === dateKey) events.push({...t});
        });
        subscribedEvents.forEach(s => {
            if (s.date === dateKey) events.push({...s});
        });
        events.sort((a, b) => (a.time || '').localeCompare(b.time || ''));
        return events;
    };

    const handlePrevMonth = () => {
        let newMonth = currentDisplayMonth - 1;
        let newYear = currentDisplayYear;
        if (newMonth < 0) {
            newMonth = 11;
            newYear--;
        }
        setCurrentDisplayYear(newYear);
        setCurrentDisplayMonth(newMonth);
    };

    const handleNextMonth = () => {
        let newMonth = currentDisplayMonth + 1;
        let newYear = currentDisplayYear;
        if (newMonth > 11) {
            newMonth = 0;
            newYear++;
        }
        setCurrentDisplayYear(newYear);
        setCurrentDisplayMonth(newMonth);
    };

    const handleDateSelect = (date: Date) => {
        setSelectedDate(date);
    };

    const renderCalendar = () => {
        const firstDayOfMonth = new Date(currentDisplayYear, currentDisplayMonth, 1);
        let startWeekday = firstDayOfMonth.getDay();
        let startOffset = startWeekday === 0 ? 6 : startWeekday - 1;
        const daysInMonth = new Date(currentDisplayYear, currentDisplayMonth + 1, 0).getDate();
        const prevMonthDays = new Date(currentDisplayYear, currentDisplayMonth, 0).getDate();

        const days: JSX.Element[] = [];

        for (let i = startOffset - 1; i >= 0; i--) {
            const dayNum = prevMonthDays - i;
            const dateObj = new Date(currentDisplayYear, currentDisplayMonth - 1, dayNum);
            const dateKey = `${dateObj.getFullYear()}-${String(dateObj.getMonth() + 1).padStart(2, '0')}-${String(dayNum).padStart(2, '0')}`;
            const eventsToday = getEventsForDate(dateKey);
            const tourneyEvents = eventsToday.filter(e => e.type === 'tournament');
            const subscribedNow = eventsToday.filter(e => e.type === 'subscribed');
            const isSelected = selectedDate.toDateString() === dateObj.toDateString();

            days.push(
                <DayCell key={`prev-${i}`} isOtherMonth isSelected={isSelected}
                         onClick={() => handleDateSelect(dateObj)}>
                    <DayNumber>{dayNum}</DayNumber>
                    {tourneyEvents.length > 0 && (
                        <EventBadge type="tournament">
                            {tourneyEvents.length === 1 ? tourneyEvents[0].title.substring(0, 14) : `${tourneyEvents.length} турнира`}
                        </EventBadge>
                    )}
                    {subscribedNow.length > 0 && tourneyEvents.length < 2 && (
                        <EventBadge type="subscribed">
                            {subscribedNow.length === 1 ? subscribedNow[0].title.substring(0, 14) : `${subscribedNow.length} подписки`}
                        </EventBadge>
                    )}
                </DayCell>
            );
        }

        for (let d = 1; d <= daysInMonth; d++) {
            const dateObj = new Date(currentDisplayYear, currentDisplayMonth, d);
            const dateKey = `${currentDisplayYear}-${String(currentDisplayMonth + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
            const eventsToday = getEventsForDate(dateKey);
            const tourneyEvents = eventsToday.filter(e => e.type === 'tournament');
            const subscribedNow = eventsToday.filter(e => e.type === 'subscribed');
            const isSelected = selectedDate.toDateString() === dateObj.toDateString();

            days.push(
                <DayCell key={`current-${d}`} isOtherMonth={false} isSelected={isSelected}
                         onClick={() => handleDateSelect(dateObj)}>
                    <DayNumber>{d}</DayNumber>
                    {tourneyEvents.length > 0 && (
                        <EventBadge type="tournament">
                            {tourneyEvents.length === 1 ? tourneyEvents[0].title.substring(0, 14) : `${tourneyEvents.length} турнира`}
                        </EventBadge>
                    )}
                    {subscribedNow.length > 0 && tourneyEvents.length < 2 && (
                        <EventBadge type="subscribed">
                            {subscribedNow.length === 1 ? subscribedNow[0].title.substring(0, 14) : `${subscribedNow.length} подписки`}
                        </EventBadge>
                    )}
                </DayCell>
            );
        }

        const totalCells = days.length;
        const remaining = 42 - totalCells;
        for (let i = 1; i <= remaining; i++) {
            const dateObj = new Date(currentDisplayYear, currentDisplayMonth + 1, i);
            const dateKey = `${dateObj.getFullYear()}-${String(dateObj.getMonth() + 1).padStart(2, '0')}-${String(i).padStart(2, '0')}`;
            const eventsToday = getEventsForDate(dateKey);
            const tourneyEvents = eventsToday.filter(e => e.type === 'tournament');
            const subscribedNow = eventsToday.filter(e => e.type === 'subscribed');
            const isSelected = selectedDate.toDateString() === dateObj.toDateString();

            days.push(
                <DayCell key={`next-${i}`} isOtherMonth isSelected={isSelected}
                         onClick={() => handleDateSelect(dateObj)}>
                    <DayNumber>{i}</DayNumber>
                    {tourneyEvents.length > 0 && (
                        <EventBadge type="tournament">
                            {tourneyEvents.length === 1 ? tourneyEvents[0].title.substring(0, 14) : `${tourneyEvents.length} турнира`}
                        </EventBadge>
                    )}
                    {subscribedNow.length > 0 && tourneyEvents.length < 2 && (
                        <EventBadge type="subscribed">
                            {subscribedNow.length === 1 ? subscribedNow[0].title.substring(0, 14) : `${subscribedNow.length} подписки`}
                        </EventBadge>
                    )}
                </DayCell>
            );
        }

        return days;
    };

    const renderEventsForSelectedDate = () => {
        const year = selectedDate.getFullYear();
        const month = String(selectedDate.getMonth() + 1).padStart(2, '0');
        const day = String(selectedDate.getDate()).padStart(2, '0');
        const dateKey = `${year}-${month}-${day}`;

        let events = getEventsForDate(dateKey);

        let filteredEvents = events;
        if (currentFilter === 'tournament') filteredEvents = events.filter(e => e.type === 'tournament');
        if (currentFilter === 'subscribed') filteredEvents = events.filter(e => e.type === 'subscribed');

        if (filteredEvents.length === 0) {
            return (
                <EmptyMessage>
                    <i className="far fa-frown"></i> Нет событий на этот день
                </EmptyMessage>
            );
        }

        return filteredEvents.map(ev => (
            <EventItem key={ev.id} type={ev.type}>
                <EventTitle>
                    {ev.type === 'tournament' ? <i className="fas fa-trophy"></i> : <i className="fas fa-bell"></i>}
                    {' '}{ev.title}
                </EventTitle>
                <EventTime><i className="far fa-clock"></i> {ev.time || 'время уточняется'}</EventTime>
                {ev.game && <EventGame>Игра: {ev.game}</EventGame>}
                {'prize' in ev && ev.prize && <EventPrize>Приз: {ev.prize}</EventPrize>}
            </EventItem>
        ));
    };

    const weekdays = ['ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ', 'ВС'];
    const monthNames = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];

    return (
        <CalendarApp>
            <NavButtons>
                <BackButton onClick={onBack}>
                    <i className="fas fa-arrow-left"></i> Назад
                </BackButton>
                <CalendarTitle>
                    <i className="fas fa-calendar-alt"></i> Игровой календарь
                </CalendarTitle>
                <div style={{width: '80px'}}></div>
            </NavButtons>

            <CalendarGridLayout>
                <CalendarCard>
                    <MonthHeader>
                        <MonthYear>
                            {monthNames[currentDisplayMonth]} {currentDisplayYear}
                        </MonthYear>
                        <MonthNav>
                            <NavButton onClick={handlePrevMonth}>
                                <i className="fas fa-chevron-left"></i>
                            </NavButton>
                            <NavButton onClick={handleNextMonth}>
                                <i className="fas fa-chevron-right"></i>
                            </NavButton>
                        </MonthNav>
                    </MonthHeader>
                    <Weekdays>
                        {weekdays.map(day => (
                            <Weekday key={day}>{day}</Weekday>
                        ))}
                    </Weekdays>
                    <DaysGrid>
                        {renderCalendar()}
                    </DaysGrid>
                </CalendarCard>

                <SidebarPanel>
                    <SelectedDateTitle>
                        <i className="far fa-calendar-check"></i> {selectedDate.getDate()} {monthNames[selectedDate.getMonth()]} {selectedDate.getFullYear()}
                    </SelectedDateTitle>

                    <FilterSwitch>
                        <FilterButton isActive={currentFilter === 'all'} onClick={() => setCurrentFilter('all')}>
                            Все события
                        </FilterButton>
                        <FilterButton isActive={currentFilter === 'tournament'}
                                      onClick={() => setCurrentFilter('tournament')}>
                            Турниры
                        </FilterButton>
                        <FilterButton isActive={currentFilter === 'subscribed'}
                                      onClick={() => setCurrentFilter('subscribed')}>
                            Мои подписки
                        </FilterButton>
                    </FilterSwitch>

                    <EventsList>
                        {renderEventsForSelectedDate()}
                    </EventsList>
                </SidebarPanel>
            </CalendarGridLayout>
        </CalendarApp>
    );
};
