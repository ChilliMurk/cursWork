import {FC} from 'react';
import styled from '@emotion/styled';
import {Methodology} from "@/modules/user/methodology/components/MethodologyPage.tsx";


interface MethodologyDetailsPageProps {
    methodology: Methodology;
    onBack: () => void;
}

const DetailsContainer = styled.div`
    padding: 20px;
    max-width: 800px;
    margin: 0 auto;
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

const MethodologyHeader = styled.div`
    text-align: center;
    margin-bottom: 30px;
`;

const MethodologyImage = styled.div`
    font-size: 4rem;
    margin-bottom: 20px;
`;

const MethodologyTitle = styled.h1`
    color: #00e6ff;
    font-family: 'Orbitron', sans-serif;
    font-size: 2.2rem;
    margin-bottom: 15px;
`;

const MethodologyMeta = styled.div`
    display: flex;
    justify-content: center;
    gap: 15px;
    margin-bottom: 20px;
    flex-wrap: wrap;
`;

const MetaBadge = styled.span<{ type: string }>`
    padding: 8px 16px;
    border-radius: 20px;
    font-size: 0.9rem;
    font-weight: 600;

    ${props => props.type === 'category' ? `
    background: rgba(0, 180, 216, 0.2);
    color: #00e6ff;
  ` : props.type === 'level' ? `
    background: ${props.children === 'Начинающий' ? 'rgba(76, 175, 80, 0.2)' :
            props.children === 'Средний' ? 'rgba(255, 152, 0, 0.2)' :
                    'rgba(244, 67, 54, 0.2)'};
    color: ${props.children === 'Начинающий' ? '#4caf50' :
            props.children === 'Средний' ? '#ff9800' :
                    '#f44336'};
  ` : `
    background: rgba(158, 158, 158, 0.2);
    color: #e0e0e0;
  `}
`;

const ContentSection = styled.section`
    margin-bottom: 30px;
`;

const SectionTitle = styled.h2`
    color: #00e6ff;
    font-family: 'Orbitron', sans-serif;
    margin-bottom: 15px;
    font-size: 1.5rem;
`;

const ContentItem = styled.div`
    margin-bottom: 25px;
`;

const ContentHeading = styled.h3`
    color: #00e6ff;
    font-family: 'Orbitron', sans-serif;
    margin-bottom: 10px;
    font-size: 1.4rem;
`;

const ContentText = styled.p`
    color: #e0e0e0;
    line-height: 1.6;
    margin-bottom: 15px;
    font-size: 1.1rem;
`;

const ContentImage = styled.img`
    width: 100%;
    max-width: 600px;
    border-radius: 8px;
    margin: 10px 0;
    border: 1px solid rgba(0, 180, 216, 0.2);

    @media (max-width: 768px) {
        max-width: 100%;
    }
`;

export const MethodologyDetailsPage: FC<MethodologyDetailsPageProps> = ({
                                                                            methodology,
                                                                            onBack
                                                                        }) => {
    return (
        <DetailsContainer>
            <BackButton onClick={onBack}>
                <i className="fas fa-arrow-left"></i>
                Назад к методичкам
            </BackButton>

            <MethodologyHeader>
                <MethodologyImage>{methodology.image}</MethodologyImage>
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

            {/* Секция с динамическим контентом методички */}
            <ContentSection>
                <SectionTitle>Содержание</SectionTitle>

                {methodology.content && methodology.content.length > 0 ? (
                    methodology.content.map((item, index) => (
                        <ContentItem key={index}>
                            {item.type === "heading" && <ContentHeading>{item.content}</ContentHeading>}
                            {item.type === "text" && <ContentText>{item.content}</ContentText>}
                            {item.type === "image" && (
                                <ContentImage
                                    src={item.content}
                                    alt="Иллюстрация"
                                    onError={(e) => {
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
