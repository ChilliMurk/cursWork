import {FC, useState, useRef, useEffect} from 'react';
import {Methodology, MethodologyBlock} from "@/store/reducers/methodologyApi/methodologyApi.ts";
import {
    BlockActions,
    ChangeImageButton, ContentBlock,
    ImageBlock, ImagePreviewContainer,
    ImageUploadContainer, PreviewImage,
    UploadArea,
    UploadIcon, UploadInput, UploadText, EditButton,
    FormGroup, Label,
    CloseButton,
    FormContainer,
    ActionButtons,
    CancelButton,
    ContentSection,
    EditMethodologyContainer,
    EditModal,
    ModalActions,
    SaveModalButton,
    CancelModalButton,
    ModalContent,
    ModalHeader,
    ModalTitle, BackButton,
    BlockSelectContainer,
    DropdownMenu, FormTitle,
    DropdownItem,
    BlockSelectButton,
    ContentList,
    InfoMessage,
    EmojiGrid,
    EmojiButton, DeleteButton,
    Select, SubmitButton, ModalTextArea, ModalOverlay, SectionTitle,
    ErrorMessage, Input, TextArea, HeadingBlock, TextBlock,
} from "@/modules/user/methodology/components/editMethodologyPage/style.ts";

interface EditMethodologyPageProps {
    methodology: Methodology;
    onSave: (updatedMethodology: Methodology) => void;
    onCancel: () => void;
}

interface UIContent {
    type: 'heading' | 'text' | 'image';
    content: string;
}

const popularEmojis = ['🎮', '🔫', '🧠', '💰', '⚔️', '🛡️', '🎯', '🏆', '🚀', '💡', '📚', '🎓', '🤝', '🌟', '⚡', '🔥'];

// Функция для преобразования типа блока из API в UI тип
const mapBlockTypeToUI = (type: string): 'heading' | 'text' | 'image' => {
    switch (type) {
        case 'heading':
            return 'heading';
        case 'text':
            return 'text';
        case 'image':
            return 'image';
        default:
            return 'text';
    }
};

// Функция для преобразования блоков из API в UI формат
const convertBlocksToUIContent = (blocks: MethodologyBlock[]): UIContent[] => {
    return blocks.map(block => ({
        type: mapBlockTypeToUI(block.type),
        content: block.content
    }));
};

// Функция для преобразования UI контента обратно в формат API
const convertUIContentToBlocks = (content: UIContent[]): MethodologyBlock[] => {
    return content.map((item, index) => ({
        id: undefined,
        order_index: index,
        type: item.type,
        content: item.content
    }));
};

export const EditMethodologyPage: FC<EditMethodologyPageProps> = ({
                                                                      methodology,
                                                                      onSave,
                                                                      onCancel
                                                                  }) => {
    const [formData, setFormData] = useState({
        title: methodology.title,
        description: methodology.description,
        category: methodology.category,
        level: methodology.level,
        duration: methodology.duration,
        image_url: methodology.image_url
    });

    // Преобразуем blocks из API в UI формат
    const [editableContent, setEditableContent] = useState<UIContent[]>(
        convertBlocksToUIContent(methodology.blocks || [])
    );

    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [editingIndex, setEditingIndex] = useState<number | null>(null);
    const [editValue, setEditValue] = useState('');
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [isSaving, setIsSaving] = useState(false);

    const dropdownRef = useRef<HTMLDivElement>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleAddContent = (type: 'heading' | 'text' | 'image') => {
        const newContent: UIContent = {
            type: type,
            content: type === 'heading' ? 'Новый заголовок' :
                type === 'text' ? 'Новый текст...' : ''
        };
        setEditableContent(prev => [...prev, newContent]);
        setIsDropdownOpen(false);
    };

    const handleImageUpload = (index: number, files: FileList | null) => {
        if (files && files[0]) {
            const file = files[0];
            const fileUrl = URL.createObjectURL(file);
            setEditableContent(prev => prev.map((item, i) =>
                i === index ? {...item, content: fileUrl} : item
            ));
        }
    };

    const handleChangeImage = (index: number) => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
            fileInputRef.current.onchange = (e) => {
                handleImageUpload(index, (e.target as HTMLInputElement).files);
            };
        }
    };

    const renderImageBlock = (item: UIContent, index: number) => {
        if (!item.content) {
            return (
                <ImageUploadContainer>
                    <UploadArea onClick={() => handleChangeImage(index)}>
                        <UploadIcon>
                            <i className="fas fa-plus"></i>
                        </UploadIcon>
                        <UploadText>Добавить файлы</UploadText>
                        <UploadText>Нажмите чтобы загрузить изображение</UploadText>
                    </UploadArea>
                    <UploadInput
                        type="file"
                        accept="image/*"
                        ref={fileInputRef}
                        onChange={(e) => handleImageUpload(index, e.target.files)}
                    />
                </ImageUploadContainer>
            );
        }

        return (
            <ImageBlock>
                <ImagePreviewContainer>
                    <PreviewImage
                        src={item.content}
                        alt="Загруженное изображение"
                        onError={() => {
                            setEditableContent(prev => prev.map((contentItem, i) =>
                                i === index ? {...contentItem, content: ''} : contentItem
                            ));
                        }}
                    />
                    <ChangeImageButton onClick={() => handleChangeImage(index)}>
                        <i className="fas fa-exchange-alt"></i> Изменить
                    </ChangeImageButton>
                </ImagePreviewContainer>
            </ImageBlock>
        );
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
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

    const handleEmojiSelect = (emoji: string) => {
        setFormData(prev => ({
            ...prev,
            image_url: emoji
        }));
    };

    const handleDeleteContent = (index: number) => {
        setEditableContent(prev => prev.filter((_, i) => i !== index));
    };

    const validateForm = () => {
        const newErrors: Record<string, string> = {};

        if (!formData.title.trim()) newErrors.title = 'Название методички обязательно';
        if (!formData.description.trim()) newErrors.description = 'Описание обязательно';
        if (!formData.category.trim()) newErrors.category = 'Категория обязательна';
        if (!formData.duration.trim()) newErrors.duration = 'Длительность обязательна';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) return;

        setIsSaving(true);

        await new Promise(resolve => setTimeout(resolve, 500));

        // Преобразуем UI контент обратно в формат API
        const updatedBlocks = convertUIContentToBlocks(editableContent);

        const updatedMethodology: Methodology = {
            ...methodology,
            title: formData.title,
            description: formData.description,
            category: formData.category,
            level: formData.level,
            duration: formData.duration,
            image_url: formData.image_url,
            blocks: updatedBlocks
        };

        onSave(updatedMethodology);
        setIsSaving(false);
    };

    const handleEditContent = (index: number) => {
        setEditingIndex(index);
        setEditValue(editableContent[index].content);
    };

    const handleSaveEdit = () => {
        if (editingIndex !== null) {
            setEditableContent(prev => prev.map((item, i) =>
                i === editingIndex ? {...item, content: editValue} : item
            ));
            setEditingIndex(null);
            setEditValue('');
        }
    };

    const handleCancelEdit = () => {
        setEditingIndex(null);
        setEditValue('');
    };

    const renderContentBlock = (item: UIContent, index: number) => {
        return (
            <ContentBlock key={index}>
                <BlockActions>
                    <EditButton onClick={() => handleEditContent(index)} type="button">
                        <i className="fas fa-edit"></i>
                    </EditButton>
                    <DeleteButton onClick={() => handleDeleteContent(index)} type="button">
                        <i className="fas fa-times"></i>
                    </DeleteButton>
                </BlockActions>

                {item.type === 'heading' && (
                    <HeadingBlock>{item.content}</HeadingBlock>
                )}

                {item.type === 'text' && (
                    <TextBlock>{item.content}</TextBlock>
                )}

                {item.type === 'image' && renderImageBlock(item, index)}
            </ContentBlock>
        );
    };

    const handleClickOutside = (e: MouseEvent) => {
        if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
            setIsDropdownOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleCancelAll = () => {
        if (window.confirm('Вы уверены, что хотите отменить все изменения? Несохраненные данные будут потеряны.')) {
            onCancel();
        }
    };

    return (
        <EditMethodologyContainer>
            <BackButton onClick={handleCancelAll} type="button">
                <i className="fas fa-arrow-left"></i>
                Назад к методичке
            </BackButton>

            <FormTitle>Редактирование методички</FormTitle>

            <FormContainer>
                <form onSubmit={handleSubmit}>
                    <FormGroup>
                        <Label>Название методички *</Label>
                        <Input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleInputChange}
                            placeholder="Введите название методички"
                            maxLength={50}
                        />
                        {errors.title && <ErrorMessage>{errors.title}</ErrorMessage>}
                    </FormGroup>

                    <FormGroup className="full-width">
                        <Label>Краткое описание *</Label>
                        <TextArea
                            name="description"
                            value={formData.description}
                            onChange={handleInputChange}
                            placeholder="Опишите содержание методички..."
                            maxLength={200}
                        />
                        {errors.description && <ErrorMessage>{errors.description}</ErrorMessage>}
                    </FormGroup>

                    <FormGroup>
                        <Label>Категория *</Label>
                        <Input
                            type="text"
                            name="category"
                            value={formData.category}
                            onChange={handleInputChange}
                            placeholder="Например: Тактика, Психология"
                        />
                        {errors.category && <ErrorMessage>{errors.category}</ErrorMessage>}
                    </FormGroup>

                    <FormGroup>
                        <Label>Уровень сложности</Label>
                        <Select
                            name="level"
                            value={formData.level}
                            onChange={handleInputChange}
                        >
                            <option value="beginner">Начинающий</option>
                            <option value="intermediate">Средний</option>
                            <option value="advanced">Продвинутый</option>
                        </Select>
                    </FormGroup>

                    <FormGroup>
                        <Label>Длительность *</Label>
                        <Input
                            type="text"
                            name="duration"
                            value={formData.duration}
                            onChange={handleInputChange}
                            placeholder="Например: 2 часа, 30 минут"
                        />
                        {errors.duration && <ErrorMessage>{errors.duration}</ErrorMessage>}
                    </FormGroup>

                    <FormGroup className="full-width">
                        <Label>Иконка методички</Label>
                        <EmojiGrid>
                            {popularEmojis.map(emoji => (
                                <EmojiButton
                                    key={emoji}
                                    type="button"
                                    selected={formData.image_url === emoji}
                                    onClick={() => handleEmojiSelect(emoji)}
                                >
                                    {emoji}
                                </EmojiButton>
                            ))}
                        </EmojiGrid>
                    </FormGroup>

                    <ContentSection className="full-width">
                        <SectionTitle>Содержание методички</SectionTitle>

                        <InfoMessage>
                            <i className="fas fa-info-circle"></i>
                            Вы можете свободно добавлять, удалять и редактировать блоки.
                            Все изменения сохранятся только после нажатия кнопки "Сохранить все изменения".
                        </InfoMessage>

                        <ContentList>
                            {editableContent.map((item, index) => renderContentBlock(item, index))}
                        </ContentList>

                        <BlockSelectContainer ref={dropdownRef}>
                            <BlockSelectButton type="button" onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
                                <i className="fas fa-plus"></i>
                                Добавить блок
                                <i className={`fas fa-chevron-${isDropdownOpen ? 'up' : 'down'}`}
                                   style={{fontSize: '12px'}}></i>
                            </BlockSelectButton>

                            {isDropdownOpen && (
                                <DropdownMenu>
                                    <DropdownItem type="button" onClick={() => handleAddContent('heading')}>
                                        <i className="fas fa-heading"></i>
                                        Заголовок
                                    </DropdownItem>
                                    <DropdownItem type="button" onClick={() => handleAddContent('text')}>
                                        <i className="fas fa-paragraph"></i>
                                        Текст
                                    </DropdownItem>
                                    <DropdownItem type="button" onClick={() => handleAddContent('image')}>
                                        <i className="fas fa-image"></i>
                                        Изображение
                                    </DropdownItem>
                                </DropdownMenu>
                            )}
                        </BlockSelectContainer>
                    </ContentSection>

                    <ActionButtons>
                        <SubmitButton type="submit" disabled={isSaving}>
                            <i className="fas fa-save"></i>
                            {isSaving ? 'Сохранение...' : 'Сохранить все изменения'}
                        </SubmitButton>
                        <CancelButton type="button" onClick={handleCancelAll}>
                            <i className="fas fa-times"></i>
                            Отменить все изменения
                        </CancelButton>
                    </ActionButtons>
                </form>
            </FormContainer>

            {editingIndex !== null && (
                <>
                    <ModalOverlay onClick={handleCancelEdit}/>
                    <EditModal>
                        <ModalHeader>
                            <ModalTitle>
                                Редактирование {editableContent[editingIndex].type === 'heading' ? 'заголовка' :
                                editableContent[editingIndex].type === 'text' ? 'текста' : 'изображения'}
                            </ModalTitle>
                            <CloseButton onClick={handleCancelEdit}>
                                <i className="fas fa-times"></i>
                            </CloseButton>
                        </ModalHeader>
                        <ModalContent>
                            <ModalTextArea
                                value={editValue}
                                onChange={(e) => setEditValue(e.target.value)}
                                rows={editableContent[editingIndex].type === 'text' ? 6 : 3}
                                placeholder={editableContent[editingIndex].type === 'image' ? 'Введите URL изображения...' : ''}
                            />
                        </ModalContent>
                        <ModalActions>
                            <CancelModalButton onClick={handleCancelEdit}>
                                Отмена
                            </CancelModalButton>
                            <SaveModalButton onClick={handleSaveEdit}>
                                Сохранить блок
                            </SaveModalButton>
                        </ModalActions>
                    </EditModal>
                </>
            )}
        </EditMethodologyContainer>
    );
};
