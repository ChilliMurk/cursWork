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
    UploadingOverlay,
    popularEmojis
} from "@/modules/user/methodology/components/сreateMethodologyPage/style.ts";

interface CreateMethodologyPageProps {
    onCreateMethodology: () => void;
    onCancel: () => void;
}

export interface MethodologyContent {
    type: 'heading' | 'text' | 'image';
    content: string;
}

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

    const handleImageUpload = async (index: number, files: FileList | null) => {
        if (files && files[0]) {
            setUploadingIndex(index);
            try {
                const result = await uploadImage(files[0]).unwrap();
                console.log('Upload result:', result);

                // Сохраняем только имя файла (без слешей и без /api/uploads/)
                // result.image_url должно быть просто "497e0601-5154-4ba7-96c7-04cd4465c453.jpg"
                const imageUrl = result.image_url;
                console.log('Saving image filename:', imageUrl);

                setContent(prev => prev.map((item, i) =>
                    i === index ? {...item, content: imageUrl} : item
                ));
            } catch (err) {
                console.error('Error uploading image:', err);
                alert('Ошибка при загрузке изображения');
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

        // Правильное формирование URL для отображения изображения
        // item.content - это имя файла (например, "497e0601-5154-4ba7-96c7-04cd4465c453.jpg")
        // Полный URL для получения изображения: /api/uploads/{имя_файла}
        const imageSrc = `/api/uploads/${item.content}`;

        return (
            <ImageBlock>
                <ImagePreviewContainer>
                    <PreviewImage
                        src={imageSrc}
                        alt="Загруженное изображение"
                        onError={(e) => {
                            console.error('Image load error:', imageSrc);
                            e.currentTarget.style.display = 'none';
                        }}
                        onLoad={() => {
                            console.log('Image loaded successfully:', imageSrc);
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

        console.log('Sending methodology data:', JSON.stringify(requestData, null, 2));

        try {
            await createMethodology(requestData).unwrap();
            alert('Методичка успешно создана!');
            onCreateMethodology();
        } catch (err: any) {
            console.error('Error creating methodology:', err);
            if (err.data) {
                alert(`Ошибка: ${err.data.message || JSON.stringify(err.data)}`);
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

    return (
        <CreateMethodologyContainer>
            <BackButton onClick={onCancel}>
                <i className="fas fa-arrow-left"></i>
                Назад к методичкам
            </BackButton>

            <FormTitle>Создание новой методички</FormTitle>

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
                        <Label>Иконка методички</Label>
                        <EmojiGrid>
                            {popularEmojis.map(emoji => (
                                <EmojiButton
                                    key={emoji}
                                    type="button"
                                    selected={formData.image_url === emoji}
                                    onClick={() => setFormData(prev => ({...prev, image_url: emoji}))}
                                >
                                    {emoji}
                                </EmojiButton>
                            ))}
                        </EmojiGrid>
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
                        <SubmitButton type="submit" disabled={isLoading || content.length === 0}>
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
