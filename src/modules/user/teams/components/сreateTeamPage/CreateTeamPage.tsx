import {FC, useState} from 'react';
import {Team} from "@/modules/user/teams/components/mockTeams.tsx";
import {
    CreateTeamContainer,
    BackButton,
    FormContainer,
    FormTitle,
    FormGrid,
    FormGroup,
    Label,
    Input,
    ErrorMessage,
    Select,
    SelectHeader,
    Arrow,
    SelectList,
    SelectItem,
    TextArea, RoleTags, RoleTag, SubmitButton, CancelButton, ActionButtons
} from "@/modules/user/teams/components/сreateTeamPage/styles.ts";

interface CreateTeamPageProps {
    onCreateTeam: (teamData: Omit<Team, 'id' | 'created' | 'members' | 'membersList'>) => void;
    onCancel: () => void;
}

const gameRoles: Record<string, string[]> = {
    "Counter-Strike 2": ["Rifler", "AWPer", "Lurker", "Support", "IGL", "Entry Fragger"],
    "Dota 2": ["Carry", "Mid", "Offlane", "Support", "Hard Support", "Roamer"],
    "Valorant": ["Duelist", "Initiator", "Controller", "Sentinel", "Flex"],
    "Mobile Legend": ["Tank", "Fighter", "Assassin", "Mage", "Marksman", "Support"]
};

const gameOptions = [
    {value: "", label: "Выберите игру"},
    {value: "Counter-Strike 2", label: "Counter-Strike 2"},
    {value: "Dota 2", label: "Dota 2"},
    {value: "Valorant", label: "Valorant"},
    {value: "Mobile Legend", label: "Mobile Legend"}
];

export const CreateTeamPage: FC<CreateTeamPageProps> = ({onCreateTeam, onCancel}) => {
    const [formData, setFormData] = useState({
        name: '',
        game: '',
        description: '',
        requirements: '',
        contact: '',
        maxMembers: 5,
        practiceSchedule: ''
    });

    const [selectedRoles, setSelectedRoles] = useState<string[]>([]);
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [isSelectOpen, setIsSelectOpen] = useState(false);

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
        setIsSelectOpen(false);

        if (errors.game) {
            setErrors(prev => ({
                ...prev,
                game: ''
            }));
        }
    };

    const handleRoleToggle = (role: string) => {
        setSelectedRoles(prev =>
            prev.includes(role)
                ? prev.filter(r => r !== role)
                : [...prev, role]
        );
    };

    const validateForm = () => {
        const newErrors: Record<string, string> = {};

        if (!formData.name.trim()) newErrors.name = 'Название команды обязательно';
        if (!formData.game) newErrors.game = 'Выберите игру';
        if (!formData.description.trim()) newErrors.description = 'Описание обязательно';
        if (formData.maxMembers < 2 || formData.maxMembers > 10) newErrors.maxMembers = 'Количество участников должно быть от 2 до 10';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) return;

        const teamData = {
            ...formData,
            lookingFor: selectedRoles,
            rating: 0, // Новые команды начинают с рейтинга 0
            achievements: [], // Новые команды без достижений
            captain: "CurrentUser", // В реальном приложении берется из данных пользователя
        };

        onCreateTeam(teamData);
    };

    const availableRoles = formData.game ? gameRoles[formData.game] || [] : [];
    const selectedGameLabel = gameOptions.find(opt => opt.value === formData.game)?.label || "Выберите игру";

    return (
        <CreateTeamContainer>
            <BackButton onClick={onCancel}>
                <i className="fas fa-arrow-left"></i>
                Назад к списку команд
            </BackButton>

            <FormTitle>Создание новой команды</FormTitle>

            <FormContainer>
                <form onSubmit={handleSubmit}>
                    <FormGrid>
                        <FormGroup className="full-width">
                            <Label>Название команды *</Label>
                            <Input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                placeholder="Введите название команды"
                                maxLength={50}
                            />
                            {errors.name && <ErrorMessage>{errors.name}</ErrorMessage>}
                        </FormGroup>

                        <FormGroup>
                            <Label>Игра *</Label>
                            <Select>
                                <SelectHeader onClick={() => setIsSelectOpen(!isSelectOpen)}>
                                    <span>{selectedGameLabel}</span>
                                    <Arrow isOpen={isSelectOpen}/>
                                </SelectHeader>
                                <SelectList isOpen={isSelectOpen}>
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
                                name="maxMembers"
                                value={formData.maxMembers}
                                onChange={handleInputChange}
                                min="2"
                                max="10"
                            />
                            {errors.maxMembers && <ErrorMessage>{errors.maxMembers}</ErrorMessage>}
                        </FormGroup>

                        <FormGroup className="full-width">
                            <Label>Описание команды *</Label>
                            <TextArea
                                name="description"
                                value={formData.description}
                                onChange={handleInputChange}
                                placeholder="Расскажите о вашей команде, целях и стиле игры..."
                                maxLength={500}
                            />
                            {errors.description && <ErrorMessage>{errors.description}</ErrorMessage>}
                        </FormGroup>

                        <FormGroup className="full-width">
                            <Label>Расписание тренировок</Label>
                            <Input
                                type="text"
                                name="practiceSchedule"
                                value={formData.practiceSchedule}
                                onChange={handleInputChange}
                                placeholder="Например: Пн, Ср, Пт с 19:00 до 21:00"
                            />
                        </FormGroup>

                        <FormGroup className="full-width">
                            <Label>Требования к участникам</Label>
                            <TextArea
                                name="requirements"
                                value={formData.requirements}
                                onChange={handleInputChange}
                                placeholder="Опишите требования к новым участникам..."
                                maxLength={300}
                            />
                        </FormGroup>

                        <FormGroup className="full-width">
                            <Label>Контактная информация</Label>
                            <Input
                                type="text"
                                name="contact"
                                value={formData.contact}
                                onChange={handleInputChange}
                                placeholder="Discord, Telegram или другой способ связи"
                            />
                        </FormGroup>

                        {availableRoles.length > 0 && (
                            <FormGroup className="full-width">
                                <Label>Ищем игроков на позиции</Label>
                                <RoleTags>
                                    {availableRoles.map(role => (
                                        <RoleTag
                                            key={role}
                                            selected={selectedRoles.includes(role)}
                                            onClick={() => handleRoleToggle(role)}
                                        >
                                            {role}
                                        </RoleTag>
                                    ))}
                                </RoleTags>
                            </FormGroup>
                        )}

                        <ActionButtons>
                            <SubmitButton type="submit">
                                <i className="fas fa-plus"></i>
                                Создать команду
                            </SubmitButton>
                            <CancelButton type="button" onClick={onCancel}>
                                <i className="fas fa-times"></i>
                                Отмена
                            </CancelButton>
                        </ActionButtons>
                    </FormGrid>
                </form>
            </FormContainer>
        </CreateTeamContainer>
    );
};
