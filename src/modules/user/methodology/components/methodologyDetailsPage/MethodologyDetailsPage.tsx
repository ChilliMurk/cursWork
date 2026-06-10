import {FC, useState} from 'react';
import {Methodology} from "@/store/reducers/methodologyApi/methodologyApi.ts"; // Импортируем из API, а не из MethodologyPage
import {EditMethodologyPage} from "../editMethodologyPage/EditMethodologyPage";
import {
    BackButton,
    ButtonGroup, ContentHeading, ContentImage, ContentItem, ContentSection, ContentText,
    DetailsContainer,
    EditButton, MetaBadge,
    MethodologyHeader, MethodologyImage, MethodologyMeta, MethodologyTitle,
    SectionTitle
} from "@/modules/user/methodology/components/methodologyDetailsPage/style.ts";

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

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleSave = (updatedMethodology: Methodology) => {
        if (onEdit) {
            onEdit(updatedMethodology);
        }
        setIsEditing(false);
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
                    <EditButton onClick={handleEdit}>
                        <i className="fas fa-edit"></i>
                        Редактировать
                    </EditButton>
                )}
            </ButtonGroup>

            <MethodologyHeader>
                <MethodologyImage>{methodology.image_url ? (
                    <img src={methodology.image_url} alt={methodology.title}
                         style={{width: '64px', height: '64px', objectFit: 'cover', borderRadius: '8px'}}/>
                ) : '📚'}</MethodologyImage>
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
                            {item.type === "image" && (
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
