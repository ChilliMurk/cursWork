import React, { FC, useState } from 'react';
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
    EmptyMessage,
    TrainingItem,
    TrainingTitle,
    TrainingDate,
    AttendanceSection,
    AttendanceTitle,
    AttendanceList,
    AttendanceItem,
    AttendanceUserName,
    MarkAttendanceButton,
    AttendanceHeader,
    AttendanceCheckbox,
    AttendanceActions,
    SaveAttendanceButton
} from "@/modules/user/calendar/style.ts";
import {
    useGetParticipatingEventsQuery,
    useGetTeamTrainingsQuery,
    useGetTrainingAttendanceQuery,
    useMarkAttendanceMutation,
    Event,
    Training,
    AttendanceInfoResponse
} from "@/store/reducers/eventApi/eventApi";

interface CalendarPageProps {
    onBack: () => void;
}

type CalendarItem = (Event & { type: 'event' }) | (Training & { type: 'training' });

export const CalendarPage: FC<CalendarPageProps> = ({ onBack }) => {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [currentDisplayYear, setCurrentDisplayYear] = useState(new Date().getFullYear());
    const [currentDisplayMonth, setCurrentDisplayMonth] = useState(new Date().getMonth());
    const [currentFilter, setCurrentFilter] = useState<'all' | 'event' | 'training'>('all');
    const [selectedTrainingId, setSelectedTrainingId] = useState<number | null>(null);
    const [localAttendance, setLocalAttendance] = useState<AttendanceInfoResponse[]>([]);
    const [isSaving, setIsSaving] = useState(false);

    const { data: participatingEvents = [], refetch: refetchEvents } = useGetParticipatingEventsQuery({
        month: currentDisplayMonth + 1,
        year: currentDisplayYear
    });

    const { data: trainings = [] } = useGetTeamTrainingsQuery({
        month: currentDisplayMonth + 1,
        year: currentDisplayYear
    });

    const { data: attendance = [], refetch: refetchAttendance } = useGetTrainingAttendanceQuery(
        selectedTrainingId || 0,
        { skip: !selectedTrainingId }
    );

    const [markAttendance] = useMarkAttendanceMutation();

    const getAllEventsForMonth = (): CalendarItem[] => {
        const events: CalendarItem[] = [
            ...participatingEvents.map(e => ({ ...e, type: 'event' as const })),
        ];

        const userEventIds = new Set(participatingEvents.map(e => e.id));
        const filteredTrainings = trainings.filter(t => userEventIds.has(t.id));

        const allItems: CalendarItem[] = [
            ...events,
            ...filteredTrainings.map(t => ({ ...t, type: 'training' as const }))
        ];

        const uniqueEvents = allItems.filter((item, index, self) =>
            index === self.findIndex((e) => e.id === item.id)
        );
        return uniqueEvents;
    };

    const getEventsForDate = (dateKey: string): CalendarItem[] => {
        const allEvents = getAllEventsForMonth();
        return allEvents.filter(item => {
            const itemDate = item.date.split('T')[0];
            return itemDate === dateKey;
        });
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

    const handleTrainingClick = async (trainingId: number) => {
        if (selectedTrainingId === trainingId) {
            setSelectedTrainingId(null);
            setLocalAttendance([]);
        } else {
            setSelectedTrainingId(trainingId);
            await refetchAttendance();
            setLocalAttendance([...attendance]);
        }
    };

    const handleAttendanceToggle = (userId: number, currentAttended: boolean) => {
        setLocalAttendance(prev =>
            prev.map(a =>
                a.user_id === userId
                    ? { ...a, attended: !currentAttended }
                    : a
            )
        );
    };

    const handleSaveAttendance = async (eventId: number) => {
        setIsSaving(true);
        try {
            for (const record of localAttendance) {
                await markAttendance({
                    eventId,
                    userId: record.user_id,
                    attended: record.attended
                }).unwrap();
            }
            alert('Посещаемость успешно сохранена!');
            await refetchAttendance();
            await refetchEvents();
        } catch (error) {
            console.error('Error saving attendance:', error);
            alert('Ошибка при сохранении посещаемости');
        } finally {
            setIsSaving(false);
        }
    };

    const renderCalendar = () => {
        const firstDayOfMonth = new Date(currentDisplayYear, currentDisplayMonth, 1);
        let startWeekday = firstDayOfMonth.getDay();
        let startOffset = startWeekday === 0 ? 6 : startWeekday - 1;
        const daysInMonth = new Date(currentDisplayYear, currentDisplayMonth + 1, 0).getDate();
        const prevMonthDays = new Date(currentDisplayYear, currentDisplayMonth, 0).getDate();

        const days: React.ReactElement[] = [];

        for (let i = startOffset - 1; i >= 0; i--) {
            const dayNum = prevMonthDays - i;
            const dateObj = new Date(currentDisplayYear, currentDisplayMonth - 1, dayNum);
            const year = dateObj.getFullYear();
            const month = String(dateObj.getMonth() + 1).padStart(2, '0');
            const day = String(dayNum).padStart(2, '0');
            const dateKey = `${year}-${month}-${day}`;
            const eventsToday = getEventsForDate(dateKey);
            const eventCount = eventsToday.filter(e => e.type === 'event').length;
            const trainingCount = eventsToday.filter(e => e.type === 'training').length;
            const isSelected = selectedDate.toDateString() === dateObj.toDateString();

            days.push(
                <DayCell key={`prev-${i}`} isOtherMonth isSelected={isSelected}
                         onClick={() => handleDateSelect(dateObj)}>
                    <DayNumber>{dayNum}</DayNumber>
                    {eventCount > 0 && <EventBadge type="event">📅 {eventCount} событий</EventBadge>}
                    {trainingCount > 0 && <EventBadge type="training">🏋️ {trainingCount} тренировок</EventBadge>}
                </DayCell>
            );
        }

        for (let d = 1; d <= daysInMonth; d++) {
            const dateObj = new Date(currentDisplayYear, currentDisplayMonth, d);
            const dateKey = `${currentDisplayYear}-${String(currentDisplayMonth + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
            const eventsToday = getEventsForDate(dateKey);
            const eventCount = eventsToday.filter(e => e.type === 'event').length;
            const trainingCount = eventsToday.filter(e => e.type === 'training').length;
            const isSelected = selectedDate.toDateString() === dateObj.toDateString();

            days.push(
                <DayCell key={`current-${d}`} isOtherMonth={false} isSelected={isSelected}
                         onClick={() => handleDateSelect(dateObj)}>
                    <DayNumber>{d}</DayNumber>
                    {eventCount > 0 && <EventBadge type="event">📅 {eventCount} событий</EventBadge>}
                    {trainingCount > 0 && <EventBadge type="training">🏋️ {trainingCount} тренировок</EventBadge>}
                </DayCell>
            );
        }

        const totalCells = days.length;
        const remaining = 42 - totalCells;
        for (let i = 1; i <= remaining; i++) {
            const dateObj = new Date(currentDisplayYear, currentDisplayMonth + 1, i);
            const year = dateObj.getFullYear();
            const month = String(dateObj.getMonth() + 1).padStart(2, '0');
            const day = String(i).padStart(2, '0');
            const dateKey = `${year}-${month}-${day}`;
            const eventsToday = getEventsForDate(dateKey);
            const eventCount = eventsToday.filter(e => e.type === 'event').length;
            const trainingCount = eventsToday.filter(e => e.type === 'training').length;
            const isSelected = selectedDate.toDateString() === dateObj.toDateString();

            days.push(
                <DayCell key={`next-${i}`} isOtherMonth isSelected={isSelected}
                         onClick={() => handleDateSelect(dateObj)}>
                    <DayNumber>{i}</DayNumber>
                    {eventCount > 0 && <EventBadge type="event">📅 {eventCount} событий</EventBadge>}
                    {trainingCount > 0 && <EventBadge type="training">🏋️ {trainingCount} тренировок</EventBadge>}
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
        if (currentFilter === 'event') filteredEvents = events.filter(e => e.type === 'event');
        if (currentFilter === 'training') filteredEvents = events.filter(e => e.type === 'training');

        if (filteredEvents.length === 0) {
            return (
                <EmptyMessage>
                    <i className="far fa-frown"></i> Нет событий на этот день
                </EmptyMessage>
            );
        }

        return filteredEvents.map(item => {
            if (item.type === 'event') {
                const event = item as Event & { type: 'event' };
                return (
                    <EventItem key={event.id} type="event">
                        <EventTitle>
                            <i className="fas fa-trophy"></i> {event.title}
                        </EventTitle>
                        <EventTime>
                            <i className="far fa-clock"></i>
                            {new Date(event.date).toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })}
                        </EventTime>
                        {event.game && <EventGame>Игра: {event.game}</EventGame>}
                        {event.prize && event.prize !== '0' && <EventPrize>Приз: {event.prize}</EventPrize>}
                    </EventItem>
                );
            } else {
                const training = item as Training & { type: 'training' };
                const displayAttendance = localAttendance.length > 0 ? localAttendance : attendance;

                return (
                    <TrainingItem key={training.id} onClick={() => handleTrainingClick(training.id)}>
                        <TrainingTitle>
                            <i className="fas fa-futbol"></i> {training.title}
                        </TrainingTitle>
                        <TrainingDate>{new Date(training.date).toLocaleDateString()} в {training.time}</TrainingDate>
                        {selectedTrainingId === training.id && (
                            <AttendanceSection>
                                <AttendanceHeader>
                                    <AttendanceTitle>
                                        <i className="fas fa-users"></i> Посещаемость тренировки
                                    </AttendanceTitle>
                                    <SaveAttendanceButton
                                        onClick={() => handleSaveAttendance(training.id)}
                                        disabled={isSaving}
                                    >
                                        {isSaving ? 'Сохранение...' : 'Сохранить посещаемость'}
                                    </SaveAttendanceButton>
                                </AttendanceHeader>
                                <AttendanceList>
                                    {displayAttendance.length === 0 ? (
                                        <AttendanceItem>
                                            <span>Нет данных о посещаемости</span>
                                        </AttendanceItem>
                                    ) : (
                                        displayAttendance.map(a => (
                                            <AttendanceItem key={a.id}>
                                                <AttendanceUserName>{a.user_name}</AttendanceUserName>
                                                <AttendanceCheckbox>
                                                    <MarkAttendanceButton
                                                        attended={a.attended}
                                                        onClick={() => handleAttendanceToggle(a.user_id, a.attended)}
                                                    >
                                                        {a.attended ? '✅ Присутствовал' : '❌ Отсутствовал'}
                                                    </MarkAttendanceButton>
                                                </AttendanceCheckbox>
                                            </AttendanceItem>
                                        ))
                                    )}
                                </AttendanceList>
                                <AttendanceActions>
                                    <small>Нажмите на кнопку, чтобы изменить статус посещаемости</small>
                                </AttendanceActions>
                            </AttendanceSection>
                        )}
                    </TrainingItem>
                );
            }
        });
    };

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
                <div style={{ width: '80px' }}></div>
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
                        {['ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ', 'ВС'].map(day => (
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
                        <FilterButton isActive={currentFilter === 'event'} onClick={() => setCurrentFilter('event')}>
                            Турниры
                        </FilterButton>
                        <FilterButton isActive={currentFilter === 'training'} onClick={() => setCurrentFilter('training')}>
                            Тренировки
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
