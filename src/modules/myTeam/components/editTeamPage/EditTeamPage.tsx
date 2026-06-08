import { FC, useState } from 'react';
import {
    EditTeamContainer,
    BackButton,
    FormContainer,
    FormTitle,
    FormGrid,
    FormGroup,
    Label,
    Input,
    TextArea,
    Select,
    SelectHeader,
    Arrow,
    SelectList,
    SelectItem,
    RoleTags,
    RoleTag,
    ActionButtons,
    SubmitButton,
    CancelButton,
    ErrorMessage
} from "@/modules/myTeam/components/editTeamPage/style.ts";
import { useUpdateMyTeamMutation } from "@/store/reducers/myTeamApi/myTeamApi";

interface TeamMember {
    id: number;
    username: string;
}

interface UITeam {
    id: number;
    name: string;
    game: string;
    description: string;
    created: string;
    captain: string;
    captainId: number;
    membersList: TeamMember[];
    requirements: string;
    contact: string;
    rating: number;
    isCaptain: boolean;
}

const gameRoles: Record<string, string[]> = {
    "Counter-Strike 2": ["Rifler", "AWPer", "Lurker", "Support", "IGL", "Entry Fragger"],
    "Dota 2": ["Carry", "Mid", "Offlane", "Support", "Hard Support", "Roamer"],
    "Valorant": ["Duelist", "Initiator", "Controller", "Sentinel", "Flex"],
    "Mobile Legend": ["Tank", "Fighter", "Assassin", "Mage", "Marksman", "Support"]
};

const gameOptions = [
    { value: "Counter-Strike 2", label: "Counter-Strike 2" },
    { value: "Dota 2", label: "Dota 2" },
    { value: "Valorant", label: "Valorant" },
    { value: "Mobile Legend", label: "Mobile Legend" }
];

interface EditTeamPageProps {
    team: UITeam;
    onSave: (updatedTeam: UITeam) => void;
    onCancel: () => void;
}

export const EditTeamPage: FC<EditTeamPageProps> = ({ team, onSave, onCancel }) => {
    const [updateMyTeam, { isLoading: isUpdating }] = useUpdateMyTeamMutation();

    const [formData, setFormData] = useState({
        name: team.name,
        game: team.game,
        description: team.description,
        requirements: team.requirements === "Требования не указаны" ? "" : team.requirements,
        contact: team.contact === "Контактная информация не указана" ? "" : team.contact,
    });

    const [selectedRoles, setSelectedRoles] = useState<string[]>([]);
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [isSelectOpen, setIsSelectOpen] = useState(false);
    const [isSaving, setIsSaving] = useState(false);

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
        setSelectedRoles([]);

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

        setIsSaving(true);

        try {
            const updatedTeamData = await updateMyTeam({
                name: formData.name,
                game: formData.game,
                description: formData.description,
                requirements: formData.requirements || "",
                contacts: formData.contact || "",
            }).unwrap();

            const transformedTeam: UITeam = {
                ...team,
                name: updatedTeamData.name,
                game: updatedTeamData.game,
                description: updatedTeamData.description,
                requirements: updatedTeamData.requirements || "Требования не указаны",
                contact: updatedTeamData.contacts || "Контактная информация не указана",
            };

            onSave(transformedTeam);
            alert("Команда успешно обновлена!");
        } catch (error: any) {
            console.error('Error updating team:', error);
            alert(error.data?.message || "Ошибка при обновлении команды");
        } finally {
            setIsSaving(false);
        }
    };

    const selectedGameLabel = gameOptions.find(opt => opt.value === formData.game)?.label || formData.game;
    const availableRoles = formData.game ? gameRoles[formData.game] || [] : [];

    return (
        <EditTeamContainer>
            <BackButton onClick={onCancel}>
                <i className="fas fa-arrow-left"></i>
                Назад к команде
            </BackButton>

            <FormTitle>Редактирование команды</FormTitle>

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
                            <SubmitButton type="submit" disabled={isSaving || isUpdating}>
                                <i className="fas fa-save"></i>
                                {isSaving || isUpdating ? 'Сохранение...' : 'Сохранить изменения'}
                            </SubmitButton>
                            <CancelButton type="button" onClick={onCancel}>
                                <i className="fas fa-times"></i>
                                Отмена
                            </CancelButton>
                        </ActionButtons>
                    </FormGrid>
                </form>
            </FormContainer>
        </EditTeamContainer>
    );
};
