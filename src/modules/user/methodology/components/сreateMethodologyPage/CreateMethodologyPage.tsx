import {FC, useState, useRef, useEffect} from 'react';
import {useCreateMethodologyMutation} from "@/store/reducers/methodologyApi/methodologyApi.ts";
import {useUploadImageMutation} from "@/store/reducers/uploadApi/uploadApi.ts";
import {
    CreateMethodologyContainer,
    ContentBlock,
    HeadingBlock,
    TextBlock,
    ImageBlock,
    BlockActions,
    EditButton,
    DeleteButton,
    EditModal,
    ModalOverlay,
    ModalHeader,
    ModalTitle,
    CloseButton,
    ModalContent,
    ModalTextArea,
    ModalActions,
    SaveModalButton,
    CancelModalButton,
    BackButton,
    FormTitle,
    FormContainer,
    FormGroup,
    Label,
    Input,
    TextArea,
    Select,
    EmojiGrid,
    EmojiButton,
    ContentSection,
    SectionTitle,
    ContentList,
    BlockSelectContainer,
    BlockSelectButton,
    DropdownMenu,
    DropdownItem,
    ActionButtons,
    SubmitButton,
    CancelButton,
    ErrorMessage,
    ImageUploadContainer,
    UploadArea,
    UploadIcon,
    UploadText,
    ImagePreviewContainer,
    PreviewImage,
    ChangeImageButton,
    UploadingOverlay
} from "@/modules/user/methodology/components/сreateMethodologyPage/style.ts";

const popularEmojis = ['🎮', '🔫', '🧠', '💰', '⚔️', '🛡️', '🎯', '🏆', '🚀', '💡', '📚', '🎓', '🤝', '🌟', '⚡', '🔥'];

interface CreateMethodologyPageProps {
    onCreateMethodology: () => void;
    onCancel: () => void;
}

export interface MethodologyContent {
    type: 'heading' | 'text' | 'image';
    content: string;
}

// Функция для преобразования эмодзи в Blob (изображение)
const emojiToImageBlob = async (emoji: string, size: number = 128): Promise<Blob> => {
    return new Promise((resolve, reject) => {
        const canvas = document.createElement('canvas');
        canvas.width = size;
        canvas.height = size;
        const ctx = canvas.getContext('2d');

        if (!ctx) {
            reject(new Error('Cannot get canvas context'));
            return;
        }

        ctx.clearRect(0, 0, size, size);

        // Прозрачный фон
        ctx.fillStyle = 'transparent';
        ctx.fillRect(0, 0, size, size);

        // Рисуем эмодзи
        ctx.font = `${size * 0.6}px "Segoe UI Emoji", "Apple Color Emoji", "Noto Color Emoji", sans-serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillStyle = '#00e6ff';
        ctx.fillText(emoji, size / 2, size / 2);

        canvas.toBlob((blob) => {
            if (blob) {
                resolve(blob);
            } else {
                reject(new Error('Failed to create blob from emoji'));
            }
        }, 'image/png');
    });
};

export const CreateMethodologyPage: FC<CreateMethodologyPageProps> = ({
                                                                          onCreateMethodology,
                                                                          onCancel
                                                                      }) => {
    const [createMethodology, {isLoading}] = useCreateMethodologyMutation();
    const [uploadImage] = useUploadImageMutation();

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        category: '',
        level: 'beginner' as 'beginner' | 'intermediate' | 'advanced',
        duration: '',
        image_url: ''
    });

    const [content, setContent] = useState<MethodologyContent[]>([]);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [editingIndex, setEditingIndex] = useState<number | null>(null);
    const [editValue, setEditValue] = useState('');
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [uploadingIndex, setUploadingIndex] = useState<number | null>(null);
    const [isUploadingEmoji, setIsUploadingEmoji] = useState(false);
    const [selectedEmoji, setSelectedEmoji] = useState<string | null>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const handleAddContent = (type: 'heading' | 'text' | 'image') => {
        const newContent: MethodologyContent = {
            type: type,
            content: type === 'heading' ? 'Новый заголовок' :
                type === 'text' ? 'Новый текст...' : ''
        };
        setContent(prev => [...prev, newContent]);
        setIsDropdownOpen(false);
    };

    // Обработчик выбора эмодзи - загружает его как изображение на сервер
    const handleEmojiSelect = async (emoji: string) => {
        if (isUploadingEmoji) return;

        setSelectedEmoji(emoji);
        setIsUploadingEmoji(true);

        try {
            // 1. Преобразуем эмодзи в изображение PNG
            const emojiBlob = await emojiToImageBlob(emoji, 128);

            // 2. Создаем файл из Blob
            const file = new File([emojiBlob], `emoji_${Date.now()}.png`, {type: 'image/png'});

            // 3. Загружаем на сервер через uploadImage
            const result = await uploadImage(file).unwrap();
            const imageUrl = result.image_url;

            // 4. Сохраняем URL (имя файла) в formData
            setFormData(prev => ({...prev, image_url: imageUrl}));

            console.log('Emoji uploaded successfully:', imageUrl);
            alert('Иконка успешно загружена!');
        } catch (error) {
            console.error('Error uploading emoji:', error);
            alert('Ошибка при загрузке иконки');
            setSelectedEmoji(null);
        } finally {
            setIsUploadingEmoji(false);
        }
    };

    const handleImageUpload = async (index: number, files: FileList | null) => {
        if (files && files[0]) {
            setUploadingIndex(index);
            try {
                const result = await uploadImage(files[0]).unwrap();
                const imageUrl = result.image_url;
                setContent(prev => prev.map((item, i) =>
                    i === index ? {...item, content: imageUrl} : item
                ));
            } catch (err) {
                console.error('Error uploading image:', err);
                alert('Ошибка при загрузке изображения');
                setContent(prev => prev.map((item, i) =>
                    i === index ? {...item, content: ''} : item
                ));
            } finally {
                setUploadingIndex(null);
            }
        }
    };

    const handleChangeImage = (index: number) => {
        const fileInput = document.createElement('input');
        fileInput.type = 'file';
        fileInput.accept = 'image/*';
        fileInput.onchange = (e) => {
            handleImageUpload(index, (e.target as HTMLInputElement).files);
        };
        fileInput.click();
    };

    const renderImageBlock = (item: MethodologyContent, index: number) => {
        const isUploadingThis = uploadingIndex === index;

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
                </ImageUploadContainer>
            );
        }

        const imageSrc = `/api/uploads/${item.content}`;

        return (
            <ImageBlock>
                <ImagePreviewContainer>
                    <PreviewImage
                        src={imageSrc}
                        alt="Загруженное изображение"
                        onError={() => {
                            setContent(prev => prev.map((contentItem, i) =>
                                i === index ? {...contentItem, content: ''} : contentItem
                            ));
                        }}
                    />
                    <ChangeImageButton onClick={() => handleChangeImage(index)}>
                        <i className="fas fa-exchange-alt"></i> Изменить
                    </ChangeImageButton>
                    {isUploadingThis && (
                        <UploadingOverlay>
                            <i className="fas fa-spinner fa-spin"></i> Загрузка...
                        </UploadingOverlay>
                    )}
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

    const handleDeleteContent = (index: number) => {
        setContent(prev => prev.filter((_, i) => i !== index));
    };

    const validateForm = () => {
        const newErrors: Record<string, string> = {};

        if (!formData.title.trim()) newErrors.title = 'Название методички обязательно';
        if (!formData.description.trim()) newErrors.description = 'Описание обязательно';
        if (!formData.category.trim()) newErrors.category = 'Категория обязательна';
        if (!formData.duration.trim()) newErrors.duration = 'Длительность обязательна';
        if (!formData.image_url) newErrors.image_url = 'Выберите иконку методички';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) return;

        if (content.length === 0) {
            alert('Добавьте хотя бы один блок содержания');
            return;
        }

        const blocks = content.map((item, index) => ({
            orderIndex: index,
            type: item.type === 'heading' ? 'HEADER' :
                item.type === 'text' ? 'TEXT' : 'IMAGE',
            content: item.content
        }));

        const levelMap = {
            'beginner': 'EASY',
            'intermediate': 'INTERMEDIATE',
            'advanced': 'ADVANCED'
        };

        const requestData = {
            info: {
                title: formData.title,
                description: formData.description,
                image_url: formData.image_url,
                duration: formData.duration,
                category: formData.category,
                level: levelMap[formData.level]
            },
            content: blocks
        };

        try {
            await createMethodology(requestData).unwrap();
            alert('Методичка успешно создана!');
            onCreateMethodology();
        } catch (err: any) {
            console.error('Error creating methodology:', err);
            if (err.data?.message) {
                alert(`Ошибка: ${err.data.message}`);
            } else {
                alert('Ошибка при создании методички');
            }
        }
    };

    const handleEditContent = (index: number) => {
        setEditingIndex(index);
        setEditValue(content[index].content);
    };

    const handleSaveEdit = () => {
        if (editingIndex !== null) {
            setContent(prev => prev.map((item, i) =>
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

    const renderContentBlock = (item: MethodologyContent, index: number) => {
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

    // Отображение превью выбранной иконки
    const renderIconPreview = () => {
        if (!formData.image_url) return null;

        const iconUrl = `/api/uploads/${formData.image_url}`;
        return (
            <div style={{textAlign: 'center', marginBottom: '20px'}}>
                <div style={{
                    width: '80px',
                    height: '80px',
                    margin: '0 auto',
                    background: 'rgba(0, 180, 216, 0.1)',
                    borderRadius: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    <img
                        src={iconUrl}
                        alt="Иконка методички"
                        style={{width: '48px', height: '48px', objectFit: 'cover', borderRadius: '8px'}}
                        onError={(e) => {
                            console.error('Icon load error:', iconUrl);
                            e.currentTarget.style.display = 'none';
                        }}
                    />
                </div>
                <div style={{marginTop: '8px', color: '#00e6ff', fontSize: '0.8rem'}}>
                    Иконка загружена
                </div>
            </div>
        );
    };

    return (
        <CreateMethodologyContainer>
            <BackButton onClick={onCancel}>
                <i className="fas fa-arrow-left"></i>
                Назад к методичкам
            </BackButton>

            <FormTitle>Создание новой методички</FormTitle>

            {renderIconPreview()}

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
                            maxLength={100}
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
                            maxLength={500}
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
                        <Label>Иконка методички *</Label>
                        <div style={{marginBottom: '10px', color: '#a0a0a0', fontSize: '0.9rem'}}>
                            <i className="fas fa-info-circle"></i> Нажмите на эмодзи, чтобы загрузить его как иконку
                        </div>

                        {isUploadingEmoji && (
                            <div style={{
                                textAlign: 'center',
                                padding: '10px',
                                marginBottom: '15px',
                                background: 'rgba(0, 180, 216, 0.1)',
                                borderRadius: '8px'
                            }}>
                                <i className="fas fa-spinner fa-spin"></i> Загрузка иконки {selectedEmoji}...
                            </div>
                        )}

                        <EmojiGrid>
                            {popularEmojis.map(emoji => (
                                <EmojiButton
                                    key={emoji}
                                    type="button"
                                    selected={formData.image_url !== '' && selectedEmoji === emoji}
                                    onClick={() => handleEmojiSelect(emoji)}
                                    disabled={isUploadingEmoji}
                                    style={{
                                        opacity: isUploadingEmoji ? 0.5 : 1,
                                        cursor: isUploadingEmoji ? 'not-allowed' : 'pointer'
                                    }}
                                >
                                    {emoji}
                                </EmojiButton>
                            ))}
                        </EmojiGrid>

                        {errors.image_url && <ErrorMessage>{errors.image_url}</ErrorMessage>}

                        {formData.image_url && !isUploadingEmoji && (
                            <div style={{marginTop: '10px', fontSize: '0.8rem', color: '#2ecc71'}}>
                                <i className="fas fa-check-circle"></i> Иконка выбрана
                            </div>
                        )}
                    </FormGroup>

                    <ContentSection className="full-width">
                        <SectionTitle>Содержание методички</SectionTitle>
                        <div style={{fontSize: '0.9rem', color: '#ff9800', marginBottom: '15px'}}>
                            <i className="fas fa-info-circle"></i> Добавляйте блоки с заголовками, текстом и
                            изображениями
                        </div>

                        <ContentList>
                            {content.map((item, index) => renderContentBlock(item, index))}
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
                        <SubmitButton type="submit" disabled={isLoading || content.length === 0 || isUploadingEmoji}>
                            {isLoading ? 'Создание...' : 'Создать методичку'}
                        </SubmitButton>
                        <CancelButton type="button" onClick={onCancel}>
                            <i className="fas fa-times"></i>
                            Отмена
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
                                Редактирование {content[editingIndex].type === 'heading' ? 'заголовка' :
                                content[editingIndex].type === 'text' ? 'текста' : 'изображения'}
                            </ModalTitle>
                            <CloseButton onClick={handleCancelEdit}>
                                <i className="fas fa-times"></i>
                            </CloseButton>
                        </ModalHeader>
                        <ModalContent>
                            <ModalTextArea
                                value={editValue}
                                onChange={(e) => setEditValue(e.target.value)}
                                rows={content[editingIndex].type === 'text' ? 6 : 3}
                                placeholder={content[editingIndex].type === 'image' ? 'Введите URL изображения...' : ''}
                            />
                        </ModalContent>
                        <ModalActions>
                            <CancelModalButton onClick={handleCancelEdit}>
                                Отмена
                            </CancelModalButton>
                            <SaveModalButton onClick={handleSaveEdit}>
                                Сохранить
                            </SaveModalButton>
                        </ModalActions>
                    </EditModal>
                </>
            )}
        </CreateMethodologyContainer>
    );
};
