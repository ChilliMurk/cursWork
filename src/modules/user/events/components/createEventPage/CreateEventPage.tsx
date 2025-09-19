import {FC, useState} from 'react';
import {
    ActionButtons,
    Arrow,
    BackButton, CancelButton,
    CreateEventContainer, ErrorMessage,
    FormContainer, FormGrid, FormGroup,
    FormTitle, Input, Label, Select, SelectHeader, SelectItem, SelectList, SubmitButton, TextArea
} from "@/modules/user/events/components/createEventPage/styles.ts";

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

interface CreateEventPageProps {
    onCreateEvent: (eventData: Omit<Event, 'id' | 'participants'>) => void;
    onCancel: () => void;
}


const gameOptions = [
    {value: "", label: "Выберите игру"},
    {value: "Counter-Strike 2", label: "Counter-Strike 2"},
    {value: "Dota 2", label: "Dota 2"},
    {value: "Valorant", label: "Valorant"},
    {value: "Mobile Legend", label: "Mobile Legend"}
];

const statusOptions = [
    {value: "upcoming", label: "Предстоящее"},
    {value: "ongoing", label: "Текущее"}
];

export const CreateEventPage: FC<CreateEventPageProps> = ({onCreateEvent, onCancel}) => {
    const [formData, setFormData] = useState<Omit<Event, 'id' | 'participants'>>({
        title: '',
        game: '',
        maxParticipants: 10,
        description: '',
        date: '',
        status: 'upcoming',
        prize: ''
    });

    const [errors, setErrors] = useState<Record<string, string>>({});
    const [isGameSelectOpen, setIsGameSelectOpen] = useState(false);
    const [isStatusSelectOpen, setIsStatusSelectOpen] = useState(false);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const {name, value} = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const handleGameSelect = (game: string) => {
        setFormData(prev => ({
            ...prev,
            game
        }));
        setIsGameSelectOpen(false);

        if (errors.game) {
            setErrors(prev => ({
                ...prev,
                game: ''
            }));
        }
    };

    const handleStatusSelect = (status: 'upcoming' | 'ongoing') => {
        setFormData(prev => ({
            ...prev,
            status
        }));
        setIsStatusSelectOpen(false);
    };

    const validateForm = () => {
        const newErrors: Record<string, string> = {};

        if (!formData.title.trim()) newErrors.title = 'Название события обязательно';
        if (!formData.game) newErrors.game = 'Выберите игру';
        if (!formData.description.trim()) newErrors.description = 'Описание обязательно';
        if (!formData.date) newErrors.date = 'Дата события обязательна';
        if (formData.maxParticipants < 2 || formData.maxParticipants > 100) {
            newErrors.maxParticipants = 'Количество участников должно быть от 2 до 100';
        }
        if (!formData.prize.trim()) newErrors.prize = 'Призовой фонд обязателен';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) return;

        onCreateEvent(formData);
    };

    const selectedGameLabel = gameOptions.find(opt => opt.value === formData.game)?.label || "Выберите игру";
    const selectedStatusLabel = statusOptions.find(opt => opt.value === formData.status)?.label || "Выберите статус";

    return (
        <CreateEventContainer>
            <BackButton onClick={onCancel}>
                <i className="fas fa-arrow-left"></i>
                Назад к событиям
            </BackButton>

            <FormTitle>Создание нового события</FormTitle>

            <FormContainer>
                <form onSubmit={handleSubmit}>
                    <FormGrid>
                        <FormGroup className="full-width">
                            <Label>Название события *</Label>
                            <Input
                                type="text"
                                name="title"
                                value={formData.title}
                                onChange={handleInputChange}
                                placeholder="Введите название события"
                                maxLength={50}
                            />
                            {errors.title && <ErrorMessage>{errors.title}</ErrorMessage>}
                        </FormGroup>

                        <FormGroup>
                            <Label>Игра *</Label>
                            <Select>
                                <SelectHeader onClick={() => setIsGameSelectOpen(!isGameSelectOpen)}>
                                    <span>{selectedGameLabel}</span>
                                    <Arrow isOpen={isGameSelectOpen}/>
                                </SelectHeader>
                                <SelectList isOpen={isGameSelectOpen}>
                                    {gameOptions.map(option => (
                                        <SelectItem
                                            key={option.value}
                                            onClick={() => handleGameSelect(option.value)}
                                        >
                                            {option.label}
                                        </SelectItem>
                                    ))}
                                </SelectList>
                            </Select>
                            {errors.game && <ErrorMessage>{errors.game}</ErrorMessage>}
                        </FormGroup>

                        <FormGroup>
                            <Label>Максимум участников *</Label>
                            <Input
                                type="number"
                                name="maxParticipants"
                                value={formData.maxParticipants}
                                onChange={handleInputChange}
                                min="2"
                                max="100"
                            />
                            {errors.maxParticipants && <ErrorMessage>{errors.maxParticipants}</ErrorMessage>}
                        </FormGroup>

                        <FormGroup>
                            <Label>Статус события</Label>
                            <Select>
                                <SelectHeader onClick={() => setIsStatusSelectOpen(!isStatusSelectOpen)}>
                                    <span>{selectedStatusLabel}</span>
                                    <Arrow isOpen={isStatusSelectOpen}/>
                                </SelectHeader>
                                <SelectList isOpen={isStatusSelectOpen}>
                                    {statusOptions.map(option => (
                                        <SelectItem
                                            key={option.value}
                                            onClick={() => handleStatusSelect(option.value as 'upcoming' | 'ongoing')}
                                        >
                                            {option.label}
                                        </SelectItem>
                                    ))}
                                </SelectList>
                            </Select>
                        </FormGroup>

                        <FormGroup>
                            <Label>Дата события *</Label>
                            <Input
                                type="datetime-local"
                                name="date"
                                value={formData.date}
                                onChange={handleInputChange}
                            />
                            {errors.date && <ErrorMessage>{errors.date}</ErrorMessage>}
                        </FormGroup>

                        <FormGroup>
                            <Label>Призовой фонд *</Label>
                            <Input
                                type="text"
                                name="prize"
                                value={formData.prize}
                                onChange={handleInputChange}
                                placeholder="Например: 1000 руб, игровая валюта и т.д."
                            />
                            {errors.prize && <ErrorMessage>{errors.prize}</ErrorMessage>}
                        </FormGroup>

                        <FormGroup className="full-width">
                            <Label>Описание события *</Label>
                            <TextArea
                                name="description"
                                value={formData.description}
                                onChange={handleInputChange}
                                placeholder="Опишите ваше событие, правила участия и другую важную информацию..."
                                maxLength={500}
                            />
                            {errors.description && <ErrorMessage>{errors.description}</ErrorMessage>}
                        </FormGroup>

                        <ActionButtons>
                            <SubmitButton type="submit">
                                <i className="fas fa-plus"></i>
                                Создать событие
                            </SubmitButton>
                            <CancelButton type="button" onClick={onCancel}>
                                <i className="fas fa-times"></i>
                                Отмена
                            </CancelButton>
                        </ActionButtons>
                    </FormGrid>
                </form>
            </FormContainer>
        </CreateEventContainer>
    );
};
