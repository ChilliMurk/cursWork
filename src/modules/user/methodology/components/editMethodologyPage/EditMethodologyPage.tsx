import {FC, useState, useRef, useEffect} from 'react';
import {Methodology, MethodologyBlock} from "@/store/reducers/methodologyApi/methodologyApi.ts";
import {useUploadImageMutation} from "@/store/reducers/uploadApi/uploadApi.ts";
import {
    BlockActions,
    ContentBlock,
    ImageBlock, ImagePreviewContainer,
    ImageUploadContainer, PreviewImage,
    UploadArea,
    UploadIcon, UploadText, EditButton,
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
    ErrorMessage, Input, TextArea, HeadingBlock, TextBlock, UploadingOverlay
} from "@/modules/user/methodology/components/editMethodologyPage/style.ts";

interface EditMethodologyPageProps {
    methodology: Methodology;
    onSave: (updatedMethodology: Methodology) => Promise<void>;
    onCancel: () => void;
}

interface UIContent {
    type: 'heading' | 'text' | 'image';
    content: string;
}

const popularEmojis = ['🎮', '🔫', '🧠', '💰', '⚔️', '🛡️', '🎯', '🏆', '🚀', '💡', '📚', '🎓', '🤝', '🌟', '⚡', '🔥'];

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

const convertBlocksToUIContent = (blocks: MethodologyBlock[]): UIContent[] => {
    return blocks.map(block => ({
        type: mapBlockTypeToUI(block.type),
        content: block.content
    }));
};

const convertUIContentToBlocks = (content: UIContent[]): MethodologyBlock[] => {
    const filteredContent = content.filter(item => {
        if (item.type === 'image' && !item.content) {
            return false;
        }
        return true;
    });

    return filteredContent.map((item, index) => ({
        order_index: index,
        type: item.type,
        content: item.content
    }));
};

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
        ctx.fillStyle = 'transparent';
        ctx.fillRect(0, 0, size, size);

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

const deleteImage = async (imageUrl: string): Promise<boolean> => {
    if (!imageUrl) return true;

    try {
        const response = await fetch(`/api/uploads/${imageUrl}`, {
            method: 'DELETE',
        });

        if (response.ok || response.status === 404) {
            console.log(`Image ${imageUrl} deleted successfully`);
            return true;
        } else {
            console.warn(`Failed to delete image ${imageUrl}: ${response.status}`);
            return false;
        }
    } catch (error) {
        console.error(`Error deleting image ${imageUrl}:`, error);
        return false;
    }
};

export const EditMethodologyPage: FC<EditMethodologyPageProps> = ({
                                                                      methodology,
                                                                      onSave,
                                                                      onCancel
                                                                  }) => {
    const [uploadImage] = useUploadImageMutation();
    const [uploadingIndex, setUploadingIndex] = useState<number | null>(null);
    const [isUploadingEmoji, setIsUploadingEmoji] = useState(false);
    const [selectedEmoji, setSelectedEmoji] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const [formData, setFormData] = useState({
        title: methodology.title,
        description: methodology.description,
        category: methodology.category,
        level: methodology.level,
        duration: methodology.duration,
        image_url: methodology.image_url || ''
    });

    const [editableContent, setEditableContent] = useState<UIContent[]>(
        convertBlocksToUIContent(methodology.blocks || [])
    );

    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [editingIndex, setEditingIndex] = useState<number | null>(null);
    const [editValue, setEditValue] = useState('');
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [isSaving, setIsSaving] = useState(false);

    const [imageEditIndex, setImageEditIndex] = useState<number | null>(null);
    const [isImageModalOpen, setIsImageModalOpen] = useState(false);

    const dropdownRef = useRef<HTMLDivElement>(null);

    const validateBlocks = (): string | null => {
        if (editableContent.length === 0) {
            return 'Добавьте хотя бы один блок содержания (заголовок, текст или изображение)';
        }

        const emptyBlocks = editableContent.filter(block => {
            if (block.type === 'image') {
                return !block.content || block.content.trim() === '';
            }
            return !block.content || block.content.trim() === '';
        });

        if (emptyBlocks.length > 0) {
            return 'Некоторые блоки содержат пустое содержимое. Заполните или удалите их.';
        }

        return null;
    };

    const handleAddContent = (type: 'heading' | 'text' | 'image') => {
        const newContent: UIContent = {
            type: type,
            content: type === 'heading' ? 'Новый заголовок' :
                type === 'text' ? 'Новый текст...' : ''
        };
        setEditableContent(prev => [...prev, newContent]);
        setIsDropdownOpen(false);

        if (errors.blocks) {
            setErrors(prev => ({...prev, blocks: ''}));
        }
    };

    const handleEmojiSelect = async (emoji: string) => {
        if (isUploadingEmoji) return;

        setSelectedEmoji(emoji);
        setIsUploadingEmoji(true);

        try {
            if (formData.image_url) {
                await deleteImage(formData.image_url);
            }

            const emojiBlob = await emojiToImageBlob(emoji, 128);
            const file = new File([emojiBlob], `emoji_${Date.now()}.png`, {type: 'image/png'});
            const result = await uploadImage(file).unwrap();
            const imageUrl = result.image_url;
            setFormData(prev => ({...prev, image_url: imageUrl}));
        } catch (error) {
            console.error('Error uploading emoji:', error);
            alert('Ошибка при загрузке иконки');
        } finally {
            setIsUploadingEmoji(false);
            setSelectedEmoji(null);
        }
    };

    const handleEditImageClick = (index: number) => {
        setImageEditIndex(index);
        setIsImageModalOpen(true);
    };

    const renderImageBlock = (item: UIContent, index: number) => {
        const isUploadingThis = uploadingIndex === index;

        if (!item.content) {
            return (
                <ImageUploadContainer>
                    <UploadArea onClick={() => handleEditImageClick(index)}>
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
                        onError={(e) => {
                            e.currentTarget.style.display = 'none';
                        }}
                    />
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

    const handleDeleteContent = async (index: number) => {
        const blockToDelete = editableContent[index];
        if (blockToDelete.type === 'image' && blockToDelete.content) {
            await deleteImage(blockToDelete.content);
        }

        setEditableContent(prev => prev.filter((_, i) => i !== index));

        if (errors.blocks) {
            setErrors(prev => ({...prev, blocks: ''}));
        }
    };

    const validateForm = () => {
        const newErrors: Record<string, string> = {};

        if (!formData.title.trim()) newErrors.title = 'Название методички обязательно';
        if (!formData.description.trim()) newErrors.description = 'Описание обязательно';
        if (!formData.category.trim()) newErrors.category = 'Категория обязательна';
        if (!formData.duration.trim()) newErrors.duration = 'Длительность обязательна';

        const blocksError = validateBlocks();
        if (blocksError) {
            newErrors.blocks = blocksError;
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) return;

        setIsSaving(true);

        try {
            const updatedBlocks = convertUIContentToBlocks(editableContent);

            if (updatedBlocks.length === 0) {
                alert('Нельзя сохранить методичку без блоков содержания');
                setIsSaving(false);
                return;
            }

            const updatedMethodology: Methodology = {
                ...methodology,
                title: formData.title,
                description: formData.description,
                category: formData.category,
                level: formData.level as 'beginner' | 'intermediate' | 'advanced',
                duration: formData.duration,
                image_url: formData.image_url,
                blocks: updatedBlocks
            };

            await onSave(updatedMethodology);
        } catch (error) {
            console.error('Error saving methodology:', error);
            alert('Ошибка при сохранении методички');
        } finally {
            setIsSaving(false);
        }
    };

    const handleEditContent = (index: number) => {
        const item = editableContent[index];

        if (item.type === 'image') {
            handleEditImageClick(index);
        } else {
            setEditingIndex(index);
            setEditValue(editableContent[index].content);
        }
    };

    const handleSaveEdit = () => {
        if (editingIndex !== null) {
            setEditableContent(prev => prev.map((item, i) =>
                i === editingIndex ? {...item, content: editValue} : item
            ));
            setEditingIndex(null);
            setEditValue('');
            if (errors.blocks) {
                setErrors(prev => ({...prev, blocks: ''}));
            }
        }
    };

    const handleCancelEdit = () => {
        setEditingIndex(null);
        setEditValue('');
    };

    const renderContentBlock = (item: UIContent, index: number) => {
        const isEmpty = (!item.content || item.content.trim() === '') && item.type !== 'image';

        return (
            <ContentBlock key={index} style={{border: isEmpty ? '1px solid #ff4444' : 'none'}}>
                <BlockActions>
                    <EditButton onClick={() => handleEditContent(index)} type="button">
                        <i className="fas fa-edit"></i>
                    </EditButton>
                    <DeleteButton onClick={() => handleDeleteContent(index)} type="button">
                        <i className="fas fa-times"></i>
                    </DeleteButton>
                </BlockActions>

                {item.type === 'heading' && (
                    <HeadingBlock>{item.content ||
                        <span style={{color: '#ff4444'}}>Пустой заголовок</span>}</HeadingBlock>
                )}

                {item.type === 'text' && (
                    <TextBlock>{item.content || <span style={{color: '#ff4444'}}>Пустой текст</span>}</TextBlock>
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
            </div>
        );
    };

    return (
        <EditMethodologyContainer>
            <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                style={{display: 'none'}}
                onChange={() => {
                }}
            />

            <BackButton onClick={handleCancelAll} type="button">
                <i className="fas fa-arrow-left"></i>
                Назад к методичке
            </BackButton>

            <FormTitle>Редактирование методички</FormTitle>

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
                        {isUploadingEmoji && (
                            <div style={{
                                textAlign: 'center',
                                padding: '10px',
                                marginBottom: '15px',
                                background: 'rgba(0, 180, 216, 0.1)',
                                borderRadius: '8px'
                            }}>
                                <i className="fas fa-spinner fa-spin"></i> Загрузка иконки...
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
                            <strong style={{display: 'block', marginTop: '8px', color: '#ff4444'}}>
                                ⚠️ Требуется хотя бы один заполненный блок содержания
                            </strong>
                        </InfoMessage>

                        {errors.blocks && (
                            <ErrorMessage style={{marginBottom: '15px'}}>
                                {errors.blocks}
                            </ErrorMessage>
                        )}

                        <ContentList>
                            {editableContent.length === 0 ? (
                                <InfoMessage style={{textAlign: 'center', padding: '40px'}}>
                                    <i className="fas fa-plus-circle"
                                       style={{fontSize: '48px', marginBottom: '16px'}}></i>
                                    <p>Нет блоков содержания</p>
                                    <p style={{fontSize: '14px', marginTop: '8px'}}>Нажмите кнопку "Добавить блок" чтобы
                                        начать</p>
                                </InfoMessage>
                            ) : (
                                editableContent.map((item, index) => renderContentBlock(item, index))
                            )}
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
                        <SubmitButton
                            type="submit"
                            disabled={isSaving || isUploadingEmoji || editableContent.length === 0}
                            style={{
                                opacity: editableContent.length === 0 ? 0.5 : 1,
                                cursor: editableContent.length === 0 ? 'not-allowed' : 'pointer'
                            }}
                        >
                            <i className="fas fa-save"></i>
                            {isSaving ? 'Сохранение...' : 'Сохранить все изменения'}
                        </SubmitButton>
                        <CancelButton type="button" onClick={handleCancelAll}>
                            <i className="fas fa-times"></i>
                            Отменить все изменения
                        </CancelButton>
                    </ActionButtons>

                    {editableContent.length === 0 && (
                        <InfoMessage style={{
                            textAlign: 'center',
                            marginTop: '16px',
                            backgroundColor: '#fff3cd',
                            color: '#856404'
                        }}>
                            <i className="fas fa-exclamation-triangle"></i>
                            Добавьте хотя бы один блок, чтобы сохранить методичку
                        </InfoMessage>
                    )}
                </form>
            </FormContainer>

            {/* Модальное окно для редактирования текста/заголовка */}
            {editingIndex !== null && editableContent[editingIndex]?.type !== 'image' && (
                <>
                    <ModalOverlay onClick={handleCancelEdit}/>
                    <EditModal>
                        <ModalHeader>
                            <ModalTitle>
                                Редактирование {editableContent[editingIndex]?.type === 'heading' ? 'заголовка' : 'текста'}
                            </ModalTitle>
                            <CloseButton onClick={handleCancelEdit}>
                                <i className="fas fa-times"></i>
                            </CloseButton>
                        </ModalHeader>
                        <ModalContent>
                            <ModalTextArea
                                value={editValue}
                                onChange={(e) => setEditValue(e.target.value)}
                                rows={editableContent[editingIndex]?.type === 'text' ? 6 : 3}
                                placeholder="Введите текст..."
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

            {/* Модальное окно для загрузки изображения */}
            {isImageModalOpen && (
                <>
                    <ModalOverlay onClick={() => setIsImageModalOpen(false)}/>
                    <EditModal>
                        <ModalHeader>
                            <ModalTitle>
                                {imageEditIndex !== null && editableContent[imageEditIndex]?.content ? 'Заменить изображение' : 'Добавить изображение'}
                            </ModalTitle>
                            <CloseButton onClick={() => setIsImageModalOpen(false)}>
                                <i className="fas fa-times"></i>
                            </CloseButton>
                        </ModalHeader>
                        <ModalContent>
                            <div style={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                padding: '20px',
                                border: '2px dashed #00b4d8',
                                borderRadius: '12px',
                                cursor: 'pointer',
                                transition: 'all 0.3s ease'
                            }}
                                 onClick={() => {
                                     const fileInput = document.createElement('input');
                                     fileInput.type = 'file';
                                     fileInput.accept = 'image/*';
                                     fileInput.onchange = async (e: any) => {
                                         const file = e.target.files?.[0];
                                         if (!file || imageEditIndex === null) return;

                                         setUploadingIndex(imageEditIndex);

                                         try {
                                             // Удаляем старое изображение, если есть
                                             const oldImageUrl = editableContent[imageEditIndex]?.content;
                                             if (oldImageUrl && oldImageUrl.trim() !== '') {
                                                 await deleteImage(oldImageUrl);
                                             }

                                             // Загружаем новое
                                             const result = await uploadImage(file).unwrap();
                                             const newImageUrl = result.image_url;

                                             setEditableContent(prev => prev.map((item, i) =>
                                                 i === imageEditIndex ? {...item, content: newImageUrl} : item
                                             ));

                                             setIsImageModalOpen(false);
                                             setImageEditIndex(null);

                                             if (errors.blocks) {
                                                 setErrors(prev => ({...prev, blocks: ''}));
                                             }
                                         } catch (err) {
                                             console.error('Error uploading image:', err);
                                             alert('Ошибка при загрузке изображения');
                                         } finally {
                                             setUploadingIndex(null);
                                         }
                                     };
                                     fileInput.click();
                                 }}>
                                <i className="fas fa-cloud-upload-alt"
                                   style={{fontSize: '48px', color: '#00b4d8', marginBottom: '16px'}}></i>
                                <UploadText>Нажмите чтобы выбрать изображение</UploadText>
                            </div>
                        </ModalContent>
                        <ModalActions>
                            <CancelModalButton onClick={() => setIsImageModalOpen(false)}>
                                Отмена
                            </CancelModalButton>
                        </ModalActions>
                    </EditModal>
                </>
            )}
        </EditMethodologyContainer>
    );
};
