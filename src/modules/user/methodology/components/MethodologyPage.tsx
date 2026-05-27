import {FC, useState} from 'react';
import styled from '@emotion/styled';
import {
    CreateMethodologyPage
} from "@/modules/user/methodology/components/сreateMethodologyPage/CreateMethodologyPage.tsx";
import {
    MethodologyDetailsPage
} from "@/modules/user/methodology/components/methodologyDetailsPage/MethodologyDetailsPage.tsx";

export interface MethodologyContent {
    type: 'heading' | 'text' | 'image';
    content: string;
}

export interface Methodology {
    id: number;
    title: string;
    description: string;
    category: string;
    level: 'beginner' | 'intermediate' | 'advanced';
    duration: string;
    image: string;
    content: MethodologyContent[];
}

const mockMethodologies: Methodology[] = [
    {
        id: 1,
        title: 'Основы командной игры',
        description: 'Изучите базовые принципы командной работы в киберспорте',
        category: 'Командная игра',
        level: 'beginner',
        duration: '2 часа',
        image: '🎮',
        content: [
            {type: 'heading', content: 'Введение в командную игру'},
            {type: 'text', content: 'Командная работа - основа успеха в киберспорте...'},
            {type: 'image', content: '🎮'}
        ]
    },
    {
        id: 2,
        title: 'Тактики в Counter-Strike 2',
        description: 'Разберитесь с продвинутыми тактиками и стратегиями',
        category: 'Тактика',
        level: 'intermediate',
        duration: '4 часа',
        image: '🔫',
        content: [
            {type: 'heading', content: 'Тактические основы CS2'},
            {type: 'text', content: 'Изучение карт и позиций...'},
            {type: 'image', content: '🎯'}
        ]
    },
    {
        id: 3,
        title: 'Психология киберспорта',
        description: 'Узнайте о ментальной подготовке и психологической устойчивости',
        category: 'Психология',
        level: 'advanced',
        duration: '3 часа',
        image: '🧠',
        content: [
            {type: 'heading', content: 'Ментальная подготовка'},
            {type: 'text', content: 'Как сохранять хладнокровие во время матчей...'},
            {type: 'image', content: '🧘'}
        ]
    },
    {
        id: 4,
        title: 'Экономика в Dota 2',
        description: 'Мастерское управление ресурсами и золотом',
        category: 'Экономика',
        level: 'intermediate',
        duration: '2.5 часа',
        image: '💰',
        content: [
            {type: 'heading', content: 'Экономические стратегии'},
            {type: 'text', content: 'Управление золотом и предметами...'},
            {type: 'image', content: '💎'}
        ]
    }
];

const MethodologyContainer = styled.div`
    padding: 20px;
`;

const HeaderSection = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
    flex-wrap: wrap;
    gap: 15px;
`;

const PageTitle = styled.h2`
    color: #00e6ff;
    font-family: 'Orbitron', sans-serif;
    margin: 0;
`;

const CreateButton = styled.button`
    padding: 12px 20px;
    background: linear-gradient(90deg, #0066cc, #00b4d8);
    color: #ffffff;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.3s;
    font-family: 'Rajdhani', sans-serif;
    font-weight: 600;

    &:hover {
        box-shadow: 0 0 15px rgba(0, 180, 216, 0.4);
        transform: translateY(-2px);
    }
`;

const MethodologyGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 20px;
    margin-top: 20px;
`;

const MethodologyCard = styled.div`
    background: linear-gradient(145deg, #132f4c, #0a1929);
    border: 1px solid rgba(0, 180, 216, 0.2);
    border-radius: 12px;
    padding: 20px;
    cursor: pointer;
    transition: all 0.3s ease;

    &:hover {
        transform: translateY(-5px);
        box-shadow: 0 10px 25px rgba(0, 180, 216, 0.2);
        border-color: rgba(0, 180, 216, 0.4);
    }
`;

const MethodologyImage = styled.div`
    font-size: 3rem;
    text-align: center;
    margin-bottom: 15px;
`;

const MethodologyTitle = styled.h3`
    color: #00e6ff;
    font-family: 'Orbitron', sans-serif;
    margin-bottom: 10px;
    font-size: 1.2rem;
`;

const MethodologyDescription = styled.p`
    color: #e0e0e0;
    margin-bottom: 15px;
    line-height: 1.5;
`;

const MethodologyMeta = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 15px;
`;

const MethodologyCategory = styled.span`
    background: rgba(0, 180, 216, 0.2);
    color: #00e6ff;
    padding: 4px 8px;
    border-radius: 12px;
    font-size: 0.8rem;
`;

const MethodologyLevel = styled.span<{ level: string }>`
    background: ${props =>
            props.level === 'beginner' ? 'rgba(76, 175, 80, 0.2)' :
                    props.level === 'intermediate' ? 'rgba(255, 152, 0, 0.2)' :
                            'rgba(244, 67, 54, 0.2)'};
    color: ${props =>
            props.level === 'beginner' ? '#4caf50' :
                    props.level === 'intermediate' ? '#ff9800' :
                            '#f44336'};
    padding: 4px 8px;
    border-radius: 12px;
    font-size: 0.8rem;
`;

const MethodologyDuration = styled.div`
    color: #a0a0a0;
    font-size: 0.9rem;
`;

interface MethodologyPageProps {
    onMethodologySelect: (methodology: Methodology) => void;
}

export const MethodologyPage: FC<MethodologyPageProps> = ({onMethodologySelect}) => {
    const [methodologies, setMethodologies] = useState<Methodology[]>(mockMethodologies);
    const [selectedMethodology, setSelectedMethodology] = useState<Methodology | null>(null);
    const [isCreating, setIsCreating] = useState(false);

    const handleMethodologyClick = (methodology: Methodology) => {
        setSelectedMethodology(methodology);
        onMethodologySelect(methodology);
    };

    const handleCreateClick = () => {
        setIsCreating(true);
    };

    const handleCancelCreate = () => {
        setIsCreating(false);
    };

    const handleCreateMethodology = (methodologyData: Omit<Methodology, 'id'>) => {
        const newMethodology: Methodology = {
            ...methodologyData,
            id: Math.max(...methodologies.map(m => m.id), 0) + 1
        };

        setMethodologies(prev => [...prev, newMethodology]);
        setIsCreating(false);
        alert(`Методичка "${newMethodology.title}" успешно создана!`);
    };

    if (isCreating) {
        return (
            <CreateMethodologyPage
                onCreateMethodology={handleCreateMethodology}
                onCancel={handleCancelCreate}
            />
        );
    }

    if (selectedMethodology) {
        return (
            <MethodologyDetailsPage
                methodology={selectedMethodology}
                onBack={() => setSelectedMethodology(null)}
            />
        );
    }

    return (
        <MethodologyContainer>
            <HeaderSection>
                <PageTitle>Учебные методички</PageTitle>
                <CreateButton onClick={handleCreateClick}>
                    <i className="fas fa-plus"></i> Создать методичку
                </CreateButton>
            </HeaderSection>

            <MethodologyGrid>
                {methodologies.map(methodology => (
                    <MethodologyCard
                        key={methodology.id}
                        onClick={() => handleMethodologyClick(methodology)}
                    >
                        <MethodologyImage>
                            {methodology.image}
                        </MethodologyImage>
                        <MethodologyTitle>{methodology.title}</MethodologyTitle>
                        <MethodologyDescription>{methodology.description}</MethodologyDescription>
                        <MethodologyMeta>
                            <MethodologyCategory>{methodology.category}</MethodologyCategory>
                            <MethodologyLevel level={methodology.level}>
                                {methodology.level === 'beginner' ? 'Начинающий' :
                                    methodology.level === 'intermediate' ? 'Средний' : 'Продвинутый'}
                            </MethodologyLevel>
                        </MethodologyMeta>
                        <MethodologyDuration>
                            <i className="fas fa-clock"></i> Длительность: {methodology.duration}
                        </MethodologyDuration>
                    </MethodologyCard>
                ))}
            </MethodologyGrid>
        </MethodologyContainer>
    );
};
