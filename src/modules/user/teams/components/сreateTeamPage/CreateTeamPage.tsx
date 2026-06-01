import { FC, useState } from 'react';
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
    TextArea,
    SubmitButton,
    CancelButton,
    ActionButtons,
    LoadingOverlay
} from "@/modules/user/teams/components/сreateTeamPage/styles.ts";
import { useCreateTeamMutation } from "@/store/reducers/teamApi/teamApi.ts";

interface CreateTeamPageProps {
    onCreateTeam: () => void;
    onCancel: () => void;
}

const gameOptions = [
    { value: "Counter-Strike 2", label: "Counter-Strike 2" },
    { value: "Dota 2", label: "Dota 2" },
    { value: "Valorant", label: "Valorant" },
    { value: "Mobile Legend", label: "Mobile Legend" }
];

export const CreateTeamPage: FC<CreateTeamPageProps> = ({ onCreateTeam, onCancel }) => {
    const [createTeam, { isLoading }] = useCreateTeamMutation();
    const [formData, setFormData] = useState({
        name: '',
        game: '',
        description: '',
        requirements: '',
        contacts: '',
    });
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [isSelectOpen, setIsSelectOpen] = useState(false);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
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

    const validateForm = () => {
        const newErrors: Record<string, string> = {};

        if (!formData.name.trim()) newErrors.name = 'Название команды обязательно';
        if (formData.name.length < 3) newErrors.name = 'Название должно содержать минимум 3 символа';
        if (formData.name.length > 50) newErrors.name = 'Название не должно превышать 50 символов';
        if (!formData.game) newErrors.game = 'Выберите игру';
        if (!formData.description.trim()) newErrors.description = 'Описание обязательно';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) return;

        try {
            await createTeam({
                name: formData.name,
                game: formData.game,
                description: formData.description,
                requirements: formData.requirements,
                contacts: formData.contacts,
            }).unwrap();

            alert('Команда успешно создана!');
            onCreateTeam();
        } catch (error: any) {
            console.error('Error creating team:', error);
            if (error.data?.message) {
                alert(`Ошибка: ${error.data.message}`);
            } else {
                alert('Произошла ошибка при создании команды');
            }
        }
    };

    const selectedGameLabel = gameOptions.find(opt => opt.value === formData.game)?.label || "Выберите игру";

    return (
        <CreateTeamContainer>
            {isLoading && (
                <LoadingOverlay>
                    <i className="fas fa-spinner fa-spin"></i>
                    <span>Создание команды...</span>
                </LoadingOverlay>
            )}

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
                                    <Arrow isOpen={isSelectOpen} />
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
                                name="contacts"
                                value={formData.contacts}
                                onChange={handleInputChange}
                                placeholder="Discord, Telegram или другой способ связи"
                            />
                        </FormGroup>

                        <ActionButtons>
                            <SubmitButton type="submit" disabled={isLoading}>
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
