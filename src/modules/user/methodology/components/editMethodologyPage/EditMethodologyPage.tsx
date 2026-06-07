import { FC, useState, useRef, useEffect } from 'react';
import styled from '@emotion/styled';
import { Methodology, MethodologyBlock } from "@/store/reducers/methodologyApi/methodologyApi.ts";

interface EditMethodologyPageProps {
    methodology: Methodology;
    onSave: (updatedMethodology: Methodology) => void;
    onCancel: () => void;
}

interface UIContent {
    type: 'heading' | 'text' | 'image';
    content: string;
}

const ContentBlock = styled.div`
    background: rgba(0, 180, 216, 0.05);
    border: 1px solid rgba(0, 180, 216, 0.2);
    border-radius: 12px;
    padding: 25px;
    margin-bottom: 20px;
    position: relative;
`;

const HeadingBlock = styled.h3`
    color: #00e6ff;
    font-family: 'Orbitron', sans-serif;
    font-size: 1.5rem;
    margin: 0 0 15px 0;
    font-weight: 600;
`;

const TextBlock = styled.p`
    color: #e0e0e0;
    font-family: 'Rajdhani', sans-serif;
    font-size: 1.1rem;
    line-height: 1.6;
    margin: 0;
    white-space: pre-wrap;
`;

const ImageBlock = styled.div`
    display: flex;
    flex-direction: column;
    gap: 15px;
`;

const BlockActions = styled.div`
    position: absolute;
    top: 15px;
    right: 15px;
    display: flex;
    gap: 10px;
`;

const EditButton = styled.button`
    background: rgba(255, 152, 0, 0.1);
    color: #ff9800;
    border: 1px solid rgba(255, 152, 0, 0.3);
    border-radius: 6px;
    padding: 6px 12px;
    cursor: pointer;
    font-family: 'Rajdhani', sans-serif;
    font-size: 0.9rem;
    transition: all 0.3s ease;

    &:hover {
        background: rgba(255, 152, 0, 0.2);
    }
`;

const DeleteButton = styled.button`
    background: rgba(244, 67, 54, 0.1);
    color: #f44336;
    border: 1px solid rgba(244, 67, 54, 0.3);
    border-radius: 6px;
    padding: 6px 12px;
    cursor: pointer;
    font-family: 'Rajdhani', sans-serif;
    font-size: 0.9rem;
    transition: all 0.3s ease;

    &:hover {
        background: rgba(244, 67, 54, 0.2);
    }
`;

const EditModal = styled.div`
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: rgba(19, 47, 76, 0.95);
    border: 2px solid rgba(0, 180, 216, 0.4);
    border-radius: 16px;
    padding: 30px;
    z-index: 1000;
    min-width: 500px;
    backdrop-filter: blur(10px);
`;

const ModalOverlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.7);
    z-index: 999;
`;

const ModalHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
    padding-bottom: 15px;
    border-bottom: 1px solid rgba(0, 180, 216, 0.3);
`;

const ModalTitle = styled.h3`
    color: #00e6ff;
    font-family: 'Orbitron', sans-serif;
    margin: 0;
`;

const CloseButton = styled.button`
    background: none;
    border: none;
    color: #00e6ff;
    font-size: 1.5rem;
    cursor: pointer;
    padding: 0;
`;

const ModalContent = styled.div`
    display: flex;
    flex-direction: column;
    gap: 15px;
`;

const ModalTextArea = styled.textarea`
    padding: 14px 16px;
    background: rgba(0, 180, 216, 0.1);
    border: 1px solid rgba(0, 180, 216, 0.4);
    border-radius: 10px;
    color: #e0e0e0;
    font-family: 'Rajdhani', sans-serif;
    font-size: 1rem;
    min-height: 120px;
    resize: vertical;

    &:focus {
        outline: none;
        border-color: #00b4d8;
    }
`;

const ModalActions = styled.div`
    display: flex;
    justify-content: flex-end;
    gap: 15px;
    margin-top: 20px;
`;

const SaveModalButton = styled.button`
    padding: 12px 24px;
    background: linear-gradient(135deg, #0066cc, #00b4d8);
    color: #ffffff;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    font-family: 'Rajdhani', sans-serif;
    font-weight: 600;
`;

const CancelModalButton = styled.button`
    padding: 12px 24px;
    background: rgba(0, 180, 216, 0.15);
    color: #00e6ff;
    border: 1px solid #00b4d8;
    border-radius: 8px;
    cursor: pointer;
    font-family: 'Rajdhani', sans-serif;
    font-weight: 600;
`;

const EditMethodologyContainer = styled.div`
    padding: 20px;
    max-width: 1000px;
    margin: 0 auto;
    background: linear-gradient(135deg, #0a1929 0%, #132f4c 100%);
    min-height: 100vh;
`;

const BackButton = styled.button`
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 10px 20px;
    background: rgba(0, 180, 216, 0.15);
    color: #00e6ff;
    border: 1px solid #00b4d8;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.3s;
    font-family: 'Rajdhani', sans-serif;
    font-weight: 600;
    margin-bottom: 25px;

    &:hover {
        background: rgba(0, 180, 216, 0.25);
        box-shadow: 0 0 15px rgba(0, 180, 216, 0.4);
    }
`;

const FormTitle = styled.h1`
    font-family: 'Orbitron', sans-serif;
    font-size: 2.2rem;
    color: #00e6ff;
    margin-bottom: 30px;
    text-align: center;
    text-shadow: 0 0 10px rgba(0, 230, 255, 0.3);
`;

const FormContainer = styled.div`
    background: rgba(19, 47, 76, 0.6);
    border: 1px solid rgba(0, 180, 216, 0.3);
    border-radius: 16px;
    padding: 0px 30px 0px 30px;
    backdrop-filter: blur(10px);
`;

const FormGroup = styled.div`
    display: flex;
    flex-direction: column;
    gap: 25px;
    margin-top: 40px;

    &.full-width {
        grid-column: 1 / -1;
    }
`;

const Label = styled.label`
    color: #00e6ff;
    font-weight: 600;
    font-size: 1rem;
    font-family: 'Rajdhani', sans-serif;
`;

const Input = styled.input`
    padding: 14px 16px;
    background: rgba(0, 180, 216, 0.08);
    border: 1px solid rgba(0, 180, 216, 0.4);
    border-radius: 10px;
    color: #e0e0e0;
    font-family: 'Rajdhani', sans-serif;
    font-size: 1rem;
    transition: all 0.3s ease;

    &:focus {
        outline: none;
        border-color: #00b4d8;
        box-shadow: 0 0 15px rgba(0, 180, 216, 0.3);
        background: rgba(0, 180, 216, 0.12);
    }

    &::placeholder {
        color: #8fa3bf;
    }
`;

const TextArea = styled.textarea`
    padding: 14px 16px;
    background: rgba(0, 180, 216, 0.08);
    border: 1px solid rgba(0, 180, 216, 0.4);
    border-radius: 10px;
    color: #e0e0e0;
    font-family: 'Rajdhani', sans-serif;
    font-size: 1rem;
    min-height: 120px;
    resize: vertical;
    transition: all 0.3s ease;

    &:focus {
        outline: none;
        border-color: #00b4d8;
        box-shadow: 0 0 15px rgba(0, 180, 216, 0.3);
        background: rgba(0, 180, 216, 0.12);
    }

    &::placeholder {
        color: #8fa3bf;
    }
`;

const Select = styled.select`
    padding: 14px 16px;
    background: rgba(0, 180, 216, 0.08);
    border: 1px solid rgba(0, 180, 216, 0.4);
    border-radius: 10px;
    color: #e0e0e0;
    font-family: 'Rajdhani', sans-serif;
    font-size: 1rem;
    transition: all 0.3s ease;

    &:focus {
        outline: none;
        border-color: #00b4d8;
        box-shadow: 0 0 15px rgba(0, 180, 216, 0.3);
        background: rgba(0, 180, 216, 0.12);
    }

    option {
        background: #0a1929;
        color: #e0e0e0;
    }
`;

const EmojiGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(8, 1fr);
    gap: 12px;
    margin-top: 12px;
    padding: 15px;
    background: rgba(0, 180, 216, 0.06);
    border-radius: 12px;
    border: 1px solid rgba(0, 180, 216, 0.2);
`;

const EmojiButton = styled.button<{ selected: boolean }>`
    padding: 12px;
    font-size: 1.8rem;
    background: ${props => props.selected
            ? 'linear-gradient(135deg, rgba(0, 180, 216, 0.3), rgba(0, 150, 200, 0.2))'
            : 'rgba(0, 180, 216, 0.08)'};
    border: 2px solid ${props => props.selected ? '#00b4d8' : 'rgba(0, 180, 216, 0.3)'};
    border-radius: 10px;
    cursor: pointer;
    transition: all 0.3s ease;

    &:hover {
        background: rgba(0, 180, 216, 0.15);
        transform: scale(1.1);
        box-shadow: 0 0 20px rgba(0, 180, 216, 0.2);
    }
`;

const ContentSection = styled.div`
    margin-top: 35px;
    padding-top: 25px;
    border-top: 2px solid rgba(0, 180, 216, 0.2);
`;

const SectionTitle = styled.h3`
    color: #00e6ff;
    font-family: 'Orbitron', sans-serif;
    margin: 0;
    font-size: 1.4rem;
`;

const ContentList = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
    margin-top: 20px;
`;

const BlockSelectContainer = styled.div`
    display: flex;
    justify-content: center;
    margin-top: 20px;
    position: relative;
`;

const BlockSelectButton = styled.button`
    padding: 12px 24px;
    background: linear-gradient(135deg, rgba(0, 180, 216, 0.2), rgba(0, 150, 200, 0.15));
    color: #00e6ff;
    border: 1px solid #00b4d8;
    border-radius: 10px;
    cursor: pointer;
    font-family: 'Rajdhani', sans-serif;
    font-weight: 600;
    display: flex;
    align-items: center;
    gap: 10px;
    transition: all 0.3s ease;

    &:hover {
        background: linear-gradient(135deg, rgba(0, 180, 216, 0.3), rgba(0, 150, 200, 0.25));
        box-shadow: 0 0 20px rgba(0, 180, 216, 0.3);
    }
`;

const DropdownMenu = styled.div`
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translateX(-50%);
    margin-top: 5px;
    background: rgba(19, 47, 76, 0.95);
    border: 1px solid rgba(0, 180, 216, 0.4);
    border-radius: 8px;
    padding: 8px 0;
    min-width: 180px;
    z-index: 1000;
    backdrop-filter: blur(10px);
`;

const DropdownItem = styled.button`
    width: 100%;
    padding: 12px 16px;
    background: none;
    border: none;
    color: #e0e0e0;
    text-align: left;
    cursor: pointer;
    font-family: 'Rajdhani', sans-serif;
    display: flex;
    align-items: center;
    gap: 10px;
    transition: all 0.2s ease;

    &:hover {
        background: rgba(0, 180, 216, 0.15);
        color: #00e6ff;
    }
`;

const ActionButtons = styled.div`
    display: flex;
    gap: 20px;
    justify-content: center;
    margin-top: 50px;
    margin-bottom: 30px;
`;

const SubmitButton = styled.button`
    padding: 16px 35px;
    background: linear-gradient(135deg, #0066cc, #00b4d8);
    color: #ffffff;
    border: none;
    border-radius: 12px;
    cursor: pointer;
    transition: all 0.3s ease;
    font-family: 'Rajdhani', sans-serif;
    font-weight: 700;
    font-size: 1.1rem;
    text-transform: uppercase;
    letter-spacing: 0.5px;

    &:hover:not(:disabled) {
        box-shadow: 0 0 25px rgba(0, 180, 216, 0.5);
        transform: translateY(-3px);
    }

    &:disabled {
        opacity: 0.6;
        cursor: not-allowed;
        transform: none;
    }
`;

const CancelButton = styled.button`
    padding: 16px 35px;
    background: rgba(0, 180, 216, 0.15);
    color: #00e6ff;
    border: 1px solid #00b4d8;
    border-radius: 12px;
    cursor: pointer;
    transition: all 0.3s ease;
    font-family: 'Rajdhani', sans-serif;
    font-weight: 600;
    font-size: 1.1rem;

    &:hover {
        background: rgba(0, 180, 216, 0.25);
        box-shadow: 0 0 20px rgba(0, 180, 216, 0.3);
        transform: translateY(-2px);
    }
`;

const ErrorMessage = styled.div`
    color: #ff6b6b;
    font-size: 0.9rem;
    margin-top: 6px;
    font-family: 'Rajdhani', sans-serif;
    font-weight: 500;
`;

const ImageUploadContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 15px;
`;

const UploadArea = styled.div`
    border: 2px dashed rgba(0, 180, 216, 0.4);
    border-radius: 12px;
    padding: 40px;
    text-align: center;
    cursor: pointer;
    transition: all 0.3s ease;
    background: rgba(0, 180, 216, 0.05);

    &:hover {
        border-color: #00b4d8;
        background: rgba(0, 180, 216, 0.1);
    }
`;

const UploadIcon = styled.div`
    font-size: 3rem;
    color: #00b4d8;
    margin-bottom: 15px;
`;

const UploadText = styled.p`
    color: #8fa3bf;
    font-family: 'Rajdhani', sans-serif;
    margin: 0;
    font-size: 1.1rem;
`;

const UploadInput = styled.input`
    display: none;
`;

const ImagePreviewContainer = styled.div`
    position: relative;
    display: inline-block;
`;

const PreviewImage = styled.img`
    max-width: 100%;
    max-height: 400px;
    border-radius: 8px;
    border: 1px solid rgba(0, 180, 216, 0.3);
`;

const ChangeImageButton = styled.button`
    position: absolute;
    bottom: 10px;
    right: 10px;
    background: rgba(0, 180, 216, 0.8);
    color: white;
    border: none;
    border-radius: 6px;
    padding: 8px 16px;
    cursor: pointer;
    font-family: 'Rajdhani', sans-serif;
    font-size: 0.9rem;

    &:hover {
        background: rgba(0, 180, 216, 1);
    }
`;

const InfoMessage = styled.div`
    background: rgba(255, 152, 0, 0.1);
    border-left: 4px solid #ff9800;
    padding: 12px 16px;
    border-radius: 8px;
    margin-bottom: 20px;
    display: flex;
    align-items: center;
    gap: 10px;
    color: #ff9800;
    font-family: 'Rajdhani', sans-serif;

    i {
        font-size: 1.2rem;
    }
`;

const popularEmojis = ['🎮', '🔫', '🧠', '💰', '⚔️', '🛡️', '🎯', '🏆', '🚀', '💡', '📚', '🎓', '🤝', '🌟', '⚡', '🔥'];

// Функция для преобразования типа блока из API в UI тип
const mapBlockTypeToUI = (type: string): 'heading' | 'text' | 'image' => {
    switch (type) {
        case 'heading': return 'heading';
        case 'text': return 'text';
        case 'image': return 'image';
        default: return 'text';
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
        image_url: methodology.image_url  // Используем image_url вместо image
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
                i === index ? { ...item, content: fileUrl } : item
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
                                i === index ? { ...contentItem, content: '' } : contentItem
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
                i === editingIndex ? { ...item, content: editValue } : item
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
                                   style={{ fontSize: '12px' }}></i>
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
                    <ModalOverlay onClick={handleCancelEdit} />
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
