import { FC, useState } from 'react';
import styled from '@emotion/styled';
import { useAppSelector } from "@/common/hooks/useAppSelector.ts";
import {
    useGetAvailableMethodologiesQuery,
    useGetAllMethodologiesQuery,
    useGetMethodologyByIdQuery,
    useDeleteMethodologyMutation
} from "@/store/reducers/methodologyApi/methodologyApi.ts";
import { CreateMethodologyPage } from "@/modules/user/methodology/components/сreateMethodologyPage/CreateMethodologyPage.tsx";
import { MethodologyDetailsPage } from "@/modules/user/methodology/components/methodologyDetailsPage/MethodologyDetailsPage.tsx";

type MethodologyTab = 'available' | 'all';

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

const TabContainer = styled.div`
    display: flex;
    justify-content: center;
    gap: 10px;
    margin-bottom: 30px;
    flex-wrap: wrap;
    border-bottom: 1px solid rgba(0, 180, 216, 0.2);
    padding-bottom: 0;
`;

const TabButton = styled.button<{ isActive: boolean }>`
    padding: 12px 28px;
    background: ${props => props.isActive
            ? 'linear-gradient(90deg, #0066cc, #00b4d8)'
            : 'transparent'};
    color: ${props => props.isActive ? '#ffffff' : '#00e6ff'};
    border: none;
    border-bottom: ${props => props.isActive ? 'none' : '1px solid transparent'};
    border-radius: 8px 8px 0 0;
    cursor: pointer;
    transition: all 0.3s;
    font-family: 'Rajdhani', sans-serif;
    font-weight: 600;
    font-size: 1rem;

    &:hover {
        background: ${props => props.isActive
                ? 'linear-gradient(90deg, #0066cc, #00b4d8)'
                : 'rgba(0, 180, 216, 0.1)'};
        transform: translateY(-2px);
    }

    i {
        margin-right: 8px;
    }
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

const DeleteButton = styled.button`
    padding: 8px 16px;
    background: rgba(244, 67, 54, 0.15);
    color: #ff5252;
    border: 1px solid rgba(244, 67, 54, 0.5);
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.3s;
    font-family: 'Rajdhani', sans-serif;
    font-weight: 600;
    display: flex;
    align-items: center;
    gap: 8px;
    margin-top: 10px;
    width: 100%;
    justify-content: center;

    &:hover {
        background: rgba(244, 67, 54, 0.25);
        box-shadow: 0 0 15px rgba(244, 67, 54, 0.3);
        transform: translateY(-2px);
    }
`;

const CardFooter = styled.div`
    margin-top: 15px;
`;

const LoadingSpinner = styled.div`
    text-align: center;
    padding: 40px;
    color: #00b4d8;
    font-size: 18px;
`;

const ErrorMessage = styled.div`
    text-align: center;
    padding: 40px;
    color: #ff6b6b;
    font-size: 18px;
    background: rgba(255, 107, 107, 0.1);
    border-radius: 12px;
    margin: 20px;
`;

const EmptyState = styled.div`
    text-align: center;
    padding: 60px 20px;
    background: linear-gradient(145deg, #132f4c, #0a1929);
    border: 1px solid rgba(0, 180, 216, 0.2);
    border-radius: 12px;
    margin: 40px 0;
`;

const EmptyIcon = styled.div`
    font-size: 4rem;
    color: #00b4d8;
    margin-bottom: 25px;
    opacity: 0.8;
`;

const EmptyText = styled.p`
    font-size: 1.3rem;
    color: #e0e0e0;
    margin-bottom: 30px;
    max-width: 600px;
    margin-left: auto;
    margin-right: auto;
    line-height: 1.6;
`;

interface MethodologyPageProps {
    onMethodologySelect?: (methodology: any) => void;
}

export const MethodologyPage: FC<MethodologyPageProps> = ({ onMethodologySelect }) => {
    const [activeTab, setActiveTab] = useState<MethodologyTab>('available');
    const [selectedMethodologyId, setSelectedMethodologyId] = useState<number | null>(null);
    const [isCreating, setIsCreating] = useState(false);

    const user = useAppSelector((state) => state.authReducer.user);
    const shouldSkip = !user?.token;

    // Получение доступных методичек (методичек команды)
    const {
        data: availableMethodologies = [],
        isLoading: isLoadingAvailable,
        error: errorAvailable,
        refetch: refetchAvailable
    } = useGetAvailableMethodologiesQuery(undefined, { skip: shouldSkip });

    // Получение всех методичек (админ)
    const {
        data: allMethodologies = [],
        isLoading: isLoadingAll,
        error: errorAll,
        refetch: refetchAll
    } = useGetAllMethodologiesQuery(undefined, { skip: shouldSkip });

    // Получение деталей методички по ID
    const {
        data: selectedMethodology,
        isLoading: isLoadingMethodology
    } = useGetMethodologyByIdQuery(selectedMethodologyId!, {
        skip: !selectedMethodologyId
    });

    const [deleteMethodology] = useDeleteMethodologyMutation();

    const getCurrentMethodologies = () => {
        return activeTab === 'available' ? availableMethodologies : allMethodologies;
    };

    const getCurrentLoading = () => {
        return activeTab === 'available' ? isLoadingAvailable : isLoadingAll;
    };

    const getCurrentError = () => {
        return activeTab === 'available' ? errorAvailable : errorAll;
    };

    const handleRefresh = () => {
        if (activeTab === 'available') {
            refetchAvailable();
        } else {
            refetchAll();
        }
    };

    const handleMethodologyClick = (methodologyId: number) => {
        setSelectedMethodologyId(methodologyId);
        if (onMethodologySelect) {
            onMethodologySelect({ id: methodologyId });
        }
    };

    const handleCreateClick = () => {
        setIsCreating(true);
    };

    const handleCancelCreate = () => {
        setIsCreating(false);
    };

    const handleCreateSuccess = () => {
        setIsCreating(false);
        handleRefresh();
    };

    const handleEditSuccess = () => {
        handleRefresh();
        setSelectedMethodologyId(null);
    };

    const handleDeleteMethodology = async (methodologyId: number, methodologyTitle: string, e: React.MouseEvent) => {
        e.stopPropagation();

        if (window.confirm(`Вы уверены, что хотите удалить методичку "${methodologyTitle}"?`)) {
            try {
                await deleteMethodology(methodologyId).unwrap();
                alert(`Методичка "${methodologyTitle}" успешно удалена!`);
                handleRefresh();
            } catch (err: any) {
                console.error('Error deleting methodology:', err);
                alert(err.data?.message || 'Ошибка при удалении методички');
            }
        }
    };

    const handleBackToList = () => {
        setSelectedMethodologyId(null);
    };

    // Если создаем новую методичку
    if (isCreating) {
        return (
            <CreateMethodologyPage
                onCreateMethodology={handleCreateSuccess}
                onCancel={handleCancelCreate}
            />
        );
    }

    // Если выбран конкретная методичка - показываем детали
    if (selectedMethodologyId) {
        if (isLoadingMethodology) {
            return (
                <MethodologyContainer>
                    <LoadingSpinner>Загрузка методички...</LoadingSpinner>
                </MethodologyContainer>
            );
        }

        if (selectedMethodology) {
            // Конвертируем в нужный формат для MethodologyDetailsPage
            const methodologyForDetails = {
                ...selectedMethodology,
                image: selectedMethodology.image_url || '📚',
                content: selectedMethodology.blocks?.map(block => ({
                    type: block.type,
                    content: block.content
                })) || []
            };

            return (
                <MethodologyDetailsPage
                    methodology={methodologyForDetails}
                    onBack={handleBackToList}
                    onEdit={handleEditSuccess}
                    canEdit={true}
                />
            );
        }
    }

    const methodologies = getCurrentMethodologies();
    const isLoading = getCurrentLoading();
    const error = getCurrentError();

    if (isLoading && !methodologies.length) {
        return (
            <MethodologyContainer>
                <LoadingSpinner>Загрузка методичек...</LoadingSpinner>
            </MethodologyContainer>
        );
    }

    if (error) {
        console.error('Methodologies loading error:', error);
        return (
            <MethodologyContainer>
                <ErrorMessage>
                    <h3>Ошибка при загрузке методичек</h3>
                    <p>Пожалуйста, попробуйте позже.</p>
                    <button onClick={handleRefresh}>Повторить попытку</button>
                </ErrorMessage>
            </MethodologyContainer>
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

            <TabContainer>
                <TabButton
                    isActive={activeTab === 'available'}
                    onClick={() => setActiveTab('available')}
                >
                    <i className="fas fa-users"></i>
                    Доступные методички
                </TabButton>
                <TabButton
                    isActive={activeTab === 'all'}
                    onClick={() => setActiveTab('all')}
                >
                    <i className="fas fa-book"></i>
                    Все методички
                </TabButton>
            </TabContainer>

            {methodologies.length > 0 ? (
                <MethodologyGrid>
                    {methodologies.map((methodology) => (
                        <MethodologyCard
                            key={methodology.id}
                            onClick={() => handleMethodologyClick(methodology.id)}
                        >
                            <MethodologyImage>
                                {methodology.image_url ? (
                                    <img src={methodology.image_url} alt={methodology.title} style={{ width: '48px', height: '48px', objectFit: 'cover', borderRadius: '8px' }} />
                                ) : (
                                    <i className="fas fa-book-open"></i>
                                )}
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
                            <MethodologyDuration>
                                <i className="fas fa-user"></i> Автор: {methodology.author_name}
                            </MethodologyDuration>
                            <CardFooter>
                                <DeleteButton onClick={(e) => handleDeleteMethodology(methodology.id, methodology.title, e)}>
                                    <i className="fas fa-trash-alt"></i>
                                    Удалить методичку
                                </DeleteButton>
                            </CardFooter>
                        </MethodologyCard>
                    ))}
                </MethodologyGrid>
            ) : (
                <EmptyState>
                    <EmptyIcon>
                        <i className="fas fa-book-open"></i>
                    </EmptyIcon>
                    <EmptyText>
                        {activeTab === 'available'
                            ? 'Пока нет доступных методичек.'
                            : 'Пока нет созданных методичек. Станьте первым, создав методичку!'}
                    </EmptyText>
                    <CreateButton onClick={handleCreateClick}>
                        Создать методичку
                    </CreateButton>
                </EmptyState>
            )}
        </MethodologyContainer>
    );
};
