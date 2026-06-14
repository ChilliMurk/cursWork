import { FC, useState } from 'react';
import { Methodology } from "@/store/reducers/methodologyApi/methodologyApi.ts";
import { EditMethodologyPage } from "../editMethodologyPage/EditMethodologyPage";
import {
    BackButton,
    ButtonGroup, ContentHeading, ContentImage, ContentItem, ContentSection, ContentText,
    DetailsContainer,
    EditButton, MetaBadge,
    MethodologyHeader, MethodologyImage, MethodologyMeta, MethodologyTitle,
    SectionTitle
} from "@/modules/user/methodology/components/methodologyDetailsPage/style.ts";
import { useUpdateMethodologyMutation } from "@/store/reducers/methodologyApi/methodologyApi";

interface MethodologyDetailsPageProps {
    methodology: Methodology;
    onBack: () => void;
    onEdit?: (methodology: Methodology) => void;
    canEdit?: boolean;
}

export const MethodologyDetailsPage: FC<MethodologyDetailsPageProps> = ({
                                                                            methodology,
                                                                            onBack,
                                                                            onEdit,
                                                                            canEdit = true
                                                                        }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [updateMethodology, { isLoading: isUpdating }] = useUpdateMethodologyMutation();

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleSave = async (updatedMethodology: Methodology) => {
        try {
            // Преобразуем блоки в формат API
            const blocks = updatedMethodology.blocks.map((block, index) => ({
                orderIndex: index,
                type: block.type === 'heading' ? 'HEADER' :
                    block.type === 'text' ? 'TEXT' : 'IMAGE',
                content: block.content || ''  // Убеждаемся, что content не undefined
            }));

            const levelMap: Record<string, string> = {
                'beginner': 'EASY',
                'intermediate': 'INTERMEDIATE',
                'advanced': 'ADVANCED'
            };

            const requestData = {
                info: {
                    title: updatedMethodology.title || '',
                    description: updatedMethodology.description || '',
                    image_url: updatedMethodology.image_url || '',
                    duration: updatedMethodology.duration || '',
                    category: updatedMethodology.category || '',
                    level: levelMap[updatedMethodology.level] || 'EASY'
                },
                content: blocks
            };

            console.log('Updating methodology with data:', requestData);

            const result = await updateMethodology({
                methodologyId: updatedMethodology.id,
                data: requestData
            }).unwrap();

            console.log('Update result:', result);

            // Показываем успешное уведомление
            alert('Методичка успешно обновлена!');

            if (onEdit) {
                onEdit(updatedMethodology);
            }
            setIsEditing(false);
        } catch (error: any) {
            console.error('Error updating methodology:', error);
            // Показываем детальную ошибку
            const errorMessage = error.data?.message || error.data?.error || 'Ошибка при обновлении методички';
            alert(`Ошибка: ${errorMessage}`);
        }
    };

    const handleCancel = () => {
        setIsEditing(false);
    };

    if (isEditing) {
        return (
            <EditMethodologyPage
                methodology={methodology}
                onSave={handleSave}
                onCancel={handleCancel}
            />
        );
    }

    return (
        <DetailsContainer>
            <ButtonGroup>
                <BackButton onClick={onBack}>
                    <i className="fas fa-arrow-left"></i>
                    Назад к методичкам
                </BackButton>
                {canEdit && onEdit && (
                    <EditButton onClick={handleEdit} disabled={isUpdating}>
                        <i className="fas fa-edit"></i>
                        Редактировать
                    </EditButton>
                )}
            </ButtonGroup>

            <MethodologyHeader>
                <MethodologyImage>
                    {methodology.image_url ? (
                        <img
                            src={`/api/uploads/${methodology.image_url}`}
                            alt={methodology.title}
                            style={{ width: '64px', height: '64px', objectFit: 'cover', borderRadius: '8px' }}
                            onError={(e) => {
                                console.error('Image load error:', `/api/uploads/${methodology.image_url}`);
                                e.currentTarget.style.display = 'none';
                                const parent = e.currentTarget.parentElement;
                                if (parent) {
                                    parent.innerHTML = '📚';
                                }
                            }}
                        />
                    ) : (
                        '📚'
                    )}
                </MethodologyImage>
                <MethodologyTitle>{methodology.title}</MethodologyTitle>
                <MethodologyMeta>
                    <MetaBadge type="category">{methodology.category}</MetaBadge>
                    <MetaBadge type="level">
                        {methodology.level === 'beginner' ? 'Начинающий' :
                            methodology.level === 'intermediate' ? 'Средний' : 'Продвинутый'}
                    </MetaBadge>
                    <MetaBadge type="duration">
                        <i className="fas fa-clock"></i> {methodology.duration}
                    </MetaBadge>
                </MethodologyMeta>
            </MethodologyHeader>

            <ContentSection>
                <SectionTitle>Описание</SectionTitle>
                <ContentText>
                    {methodology.description}
                </ContentText>
            </ContentSection>

            <ContentSection>
                <SectionTitle>Содержание</SectionTitle>

                {methodology.blocks && methodology.blocks.length > 0 ? (
                    methodology.blocks.map((item, index) => (
                        <ContentItem key={item.id || index}>
                            {item.type === "heading" && <ContentHeading>{item.content}</ContentHeading>}
                            {item.type === "text" && <ContentText>{item.content}</ContentText>}
                            {item.type === "image" && item.content && (
                                <ContentImage
                                    src={`/api/uploads/${item.content}`}
                                    alt="Иллюстрация"
                                    onError={(e) => {
                                        console.error('Image load error:', `/api/uploads/${item.content}`);
                                        e.currentTarget.style.display = 'none';
                                    }}
                                />
                            )}
                        </ContentItem>
                    ))
                ) : (
                    <ContentText>
                        Эта методичка еще не содержит контента.
                    </ContentText>
                )}
            </ContentSection>

            <ContentSection>
                <SectionTitle>Дополнительная информация</SectionTitle>
                <ContentText>
                    Для углубленного изучения темы рекомендуем ознакомиться с дополнительными материалами
                    и видеоуроками от профессиональных игроков.
                </ContentText>
            </ContentSection>
        </DetailsContainer>
    );
};
