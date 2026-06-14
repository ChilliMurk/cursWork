import { FC } from 'react';
import {
    RequestsContainer,
    NavBar,
    BackLink,
    PageTitle,
    TeamBadge,
    StatsRow,
    StatCard,
    StatIcon,
    StatInfo,
    StatNumber,
    StatLabel,
    RequestsList,
    RequestCard,
    RequestHeader,
    PlayerInfo,
    PlayerAvatar,
    PlayerDetails,
    PlayerName,
    PlayerNick,
    RequestDate,
    CoverLetter,
    CoverLetterLabel,
    CoverLetterText,
    RequestActions,
    AcceptButton,
    DeclineButton,
    EmptyState,
    EmptyIcon,
    EmptyTitle,
    EmptyText,
    FooterNote,
} from "@/modules/myTeam/components/teamRequestsPage/style.ts";
import {
    useGetTeamRequestsQuery,
    useAcceptTeamRequestMutation,
    useDeclineTeamRequestMutation,
    TeamRequestInfoResponse,
    useGetMyTeamQuery,
    useGetResponseTimeQuery,
} from "@/store/reducers/myTeamApi/myTeamApi";

interface TeamRequestsPageProps {
    teamName: string;
    teamId: number;
    onBack: () => void;
    onRequestAccepted?: () => void;
}

const formatResponseTime = (minutes: number | null): string => {
    if (minutes === null || minutes === 0) return 'нет данных';

    if (minutes < 60) {
        return `${minutes} мин.`;
    } else {
        const hours = Math.floor(minutes / 60);
        const remainingMinutes = minutes % 60;
        if (remainingMinutes === 0) {
            return `${hours} ч.`;
        }
        return `${hours} ч. ${remainingMinutes} мин.`;
    }
};

export const TeamRequestsPage: FC<TeamRequestsPageProps> = ({
                                                                teamName,
                                                                teamId,
                                                                onBack,
                                                                onRequestAccepted
                                                            }) => {
    const { refetch: refetchTeam } = useGetMyTeamQuery();
    const { data: requests = [], isLoading, refetch: refetchRequests } = useGetTeamRequestsQuery();
    const { data: responseTimeMinutes, isLoading: isResponseTimeLoading } = useGetResponseTimeQuery(teamId);

    const [acceptRequest] = useAcceptTeamRequestMutation();
    const [declineRequest] = useDeclineTeamRequestMutation();

    const { data: teamData } = useGetMyTeamQuery();
    const teamMembersCount = teamData?.members?.length || 0;

    const getDaysAgo = (dateString: string) => {
        const past = new Date(dateString);
        const now = new Date();
        const diffDays = Math.floor((now.getTime() - past.getTime()) / (1000 * 60 * 60 * 24));
        if (diffDays === 0) return 'сегодня';
        if (diffDays === 1) return 'вчера';
        return `${diffDays} дня(ей) назад`;
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('ru-RU', {
            day: 'numeric',
            month: 'long',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const escapeHtml = (str: string) => {
        if (!str) return '';
        return str
            .replace(/[&<>]/g, (m) => {
                if (m === '&') return '&amp;';
                if (m === '<') return '&lt;';
                if (m === '>') return '&gt;';
                return m;
            })
            .replace(/\n/g, '<br>');
    };

    const handleAcceptRequest = async (requestId: number, userName: string) => {
        try {
            await acceptRequest(requestId).unwrap();
            alert(`✅ Игрок ${userName} принят в команду!`);
            refetchRequests();
            refetchTeam();
            if (onRequestAccepted) onRequestAccepted();
        } catch (error: any) {
            console.error('Error accepting request:', error);
            alert(error.data?.message || "Ошибка при принятии заявки");
        }
    };

    const handleDeclineRequest = async (requestId: number, userName: string) => {
        try {
            await declineRequest(requestId).unwrap();
            alert(`❌ Заявка от ${userName} отклонена.`);
            refetchRequests();
        } catch (error: any) {
            console.error('Error declining request:', error);
            alert(error.data?.message || "Ошибка при отклонении заявки");
        }
    };

    // Подсчет активных заявок (только AWAITING)
    const activeRequestsCount = requests.filter(r => r.status === 'AWAITING').length;

    const formattedResponseTime = formatResponseTime(responseTimeMinutes ?? null);

    if (isLoading) {
        return (
            <RequestsContainer>
                <NavBar>
                    <BackLink onClick={onBack}>
                        <i className="fas fa-arrow-left"></i>
                        Назад к команде
                    </BackLink>
                    <PageTitle>
                        <i className="fas fa-door-open"></i>
                        Заявки на вступление
                        <TeamBadge>
                            <i className="fas fa-paw"></i> {teamName}
                        </TeamBadge>
                    </PageTitle>
                    <div style={{ width: '30px' }}></div>
                </NavBar>
                <div style={{ textAlign: 'center', padding: '50px', color: '#00e6ff' }}>
                    <i className="fas fa-spinner fa-spin" style={{ fontSize: '2rem' }}></i>
                    <p>Загрузка заявок...</p>
                </div>
            </RequestsContainer>
        );
    }

    return (
        <RequestsContainer>
            <NavBar>
                <BackLink onClick={onBack}>
                    <i className="fas fa-arrow-left"></i>
                    Назад к команде
                </BackLink>
                <PageTitle>
                    <i className="fas fa-door-open"></i>
                    Заявки на вступление
                    <TeamBadge>
                        <i className="fas fa-paw"></i> {teamName}
                    </TeamBadge>
                </PageTitle>
                <div style={{ width: '30px' }}></div>
            </NavBar>

            <StatsRow>
                <StatCard>
                    <StatIcon>
                        <i className="fas fa-envelope-open-text"></i>
                    </StatIcon>
                    <StatInfo>
                        <StatNumber>{activeRequestsCount}</StatNumber>
                        <StatLabel>Активных заявок</StatLabel>
                    </StatInfo>
                </StatCard>

                <StatCard>
                    <StatIcon>
                        <i className="fas fa-clock"></i>
                    </StatIcon>
                    <StatInfo>
                        <StatNumber>
                            {isResponseTimeLoading ? (
                                <i className="fas fa-spinner fa-spin"></i>
                            ) : (
                                formattedResponseTime
                            )}
                        </StatNumber>
                        <StatLabel>Среднее время отклика</StatLabel>
                    </StatInfo>
                </StatCard>

                <StatCard>
                    <StatIcon>
                        <i className="fas fa-users"></i>
                    </StatIcon>
                    <StatInfo>
                        <StatNumber>{teamMembersCount}</StatNumber>
                        <StatLabel>Участников в команде</StatLabel>
                    </StatInfo>
                </StatCard>
            </StatsRow>

            <RequestsList>
                {requests.length === 0 ? (
                    <EmptyState>
                        <EmptyIcon>
                            <i className="fas fa-inbox"></i>
                        </EmptyIcon>
                        <EmptyTitle>Нет входящих заявок</EmptyTitle>
                        <EmptyText>
                            Когда игроки отправят заявки на вступление, они появятся здесь
                        </EmptyText>
                    </EmptyState>
                ) : (
                    requests.map((request: TeamRequestInfoResponse) => {
                        const isAwaiting = request.status === 'AWAITING';
                        const isAccepted = request.status === 'ACCEPTED';
                        const isDeclined = request.status === 'DECLINED';

                        let statusBadge = null;
                        if (isAccepted) {
                            statusBadge = <span style={{ color: '#4caf50', fontSize: '0.8rem', marginLeft: '10px' }}>✓ Принят</span>;
                        } else if (isDeclined) {
                            statusBadge = <span style={{ color: '#f44336', fontSize: '0.8rem', marginLeft: '10px' }}>✗ Отклонен</span>;
                        }

                        return (
                            <RequestCard key={request.id}>
                                <RequestHeader>
                                    <PlayerInfo>
                                        <PlayerAvatar>
                                            {request.user_name?.charAt(0)?.toUpperCase() || '?'}
                                        </PlayerAvatar>
                                        <PlayerDetails>
                                            <PlayerName>
                                                {request.user_name}
                                                {statusBadge}
                                            </PlayerName>
                                            <PlayerNick>
                                                <i className="fas fa-id-card"></i>
                                                Заявка от {formatDate(request.created_date)}
                                            </PlayerNick>
                                        </PlayerDetails>
                                    </PlayerInfo>
                                    <RequestDate>
                                        <i className="far fa-clock"></i> {getDaysAgo(request.created_date)}
                                    </RequestDate>
                                </RequestHeader>

                                {request.message && (
                                    <CoverLetter>
                                        <CoverLetterLabel>
                                            <i className="fas fa-feather-alt"></i>
                                            Сопроводительное письмо:
                                        </CoverLetterLabel>
                                        <CoverLetterText
                                            dangerouslySetInnerHTML={{ __html: escapeHtml(request.message) }}
                                        />
                                    </CoverLetter>
                                )}

                                {/* Кнопки действий только для заявок в статусе AWAITING */}
                                {isAwaiting && (
                                    <RequestActions>
                                        <AcceptButton onClick={() => handleAcceptRequest(request.id, request.user_name)}>
                                            <i className="fas fa-check-circle"></i>
                                            Принять в команду
                                        </AcceptButton>
                                        <DeclineButton onClick={() => handleDeclineRequest(request.id, request.user_name)}>
                                            <i className="fas fa-times-circle"></i>
                                            Отклонить
                                        </DeclineButton>
                                    </RequestActions>
                                )}

                                {isAccepted && (
                                    <RequestActions>
                                        <div style={{
                                            padding: '10px',
                                            background: 'rgba(76, 175, 80, 0.1)',
                                            borderRadius: '8px',
                                            color: '#4caf50',
                                            textAlign: 'center',
                                            width: '100%'
                                        }}>
                                            <i className="fas fa-check-circle"></i> Заявка принята, игрок добавлен в команду
                                        </div>
                                    </RequestActions>
                                )}

                                {isDeclined && (
                                    <RequestActions>
                                        <div style={{
                                            padding: '10px',
                                            background: 'rgba(244, 67, 54, 0.1)',
                                            borderRadius: '8px',
                                            color: '#f44336',
                                            textAlign: 'center',
                                            width: '100%'
                                        }}>
                                            <i className="fas fa-times-circle"></i> Заявка отклонена
                                        </div>
                                    </RequestActions>
                                )}
                            </RequestCard>
                        );
                    })
                )}
            </RequestsList>

            <FooterNote>
                <i className="fas fa-file-alt"></i>
                Кандидаты оставляют сопроводительное письмо. Вы можете принять или отклонить заявку.
                {activeRequestsCount === 0 && requests.length > 0 && (
                    <span style={{ display: 'block', marginTop: '8px', color: '#ff9800' }}>
                        <i className="fas fa-info-circle"></i> Все заявки уже обработаны
                    </span>
                )}
            </FooterNote>
        </RequestsContainer>
    );
};
