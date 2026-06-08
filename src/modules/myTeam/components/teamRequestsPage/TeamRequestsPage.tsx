import { FC, useState } from 'react';
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
    InviteButton,
    FooterNote,
    InviteModal,
    ModalContent,
    ModalTitle,
    ModalInput,
    ModalTextArea,
    ModalButtons,
    ModalButton
} from "@/modules/myTeam/components/teamRequestsPage/style.ts";
import {
    useGetTeamRequestsQuery,
    useAcceptTeamRequestMutation,
    useDeclineTeamRequestMutation,
    TeamRequestInfoResponse
} from "@/store/reducers/myTeamApi/myTeamApi";
import { useGetMyTeamQuery } from "@/store/reducers/myTeamApi/myTeamApi";

interface TeamRequestsPageProps {
    teamName: string;
    onBack: () => void;
    onRequestAccepted?: () => void;
}

export const TeamRequestsPage: FC<TeamRequestsPageProps> = ({
                                                                teamName,
                                                                onBack,
                                                                onRequestAccepted
                                                            }) => {
    const { refetch: refetchTeam } = useGetMyTeamQuery();
    const { data: requests = [], isLoading, refetch: refetchRequests } = useGetTeamRequestsQuery();
    const [acceptRequest] = useAcceptTeamRequestMutation();
    const [declineRequest] = useDeclineTeamRequestMutation();

    const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
    const [inviteNickname, setInviteNickname] = useState('');
    const [inviteCoverLetter, setInviteCoverLetter] = useState('');

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

    const handleInviteSubmit = () => {
        if (!inviteNickname) {
            alert("Укажите никнейм игрока.");
            return;
        }
        alert(`Приглашение отправлено игроку ${inviteNickname}!`);
        setIsInviteModalOpen(false);
        setInviteNickname('');
        setInviteCoverLetter('');
    };

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
        <>
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
                            <StatNumber>{requests.length}</StatNumber>
                            <StatLabel>Активных заявок</StatLabel>
                        </StatInfo>
                    </StatCard>

                    <StatCard>
                        <StatIcon>
                            <i className="fas fa-clock"></i>
                        </StatIcon>
                        <StatInfo>
                            <StatNumber>~2 дн.</StatNumber>
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
                                Пригласите игроков, и они смогут отправить заявку с сопроводительным письмом
                            </EmptyText>
                        </EmptyState>
                    ) : (
                        requests.map((request: TeamRequestInfoResponse) => (
                            <RequestCard key={request.id}>
                                <RequestHeader>
                                    <PlayerInfo>
                                        <PlayerAvatar>
                                            {request.user_name?.charAt(0)?.toUpperCase() || '?'}
                                        </PlayerAvatar>
                                        <PlayerDetails>
                                            <PlayerName>{request.user_name}</PlayerName>
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
                            </RequestCard>
                        ))
                    )}
                </RequestsList>

                <div style={{ textAlign: 'center' }}>
                    <InviteButton onClick={() => setIsInviteModalOpen(true)}>
                        <i className="fas fa-user-plus"></i>
                        Пригласить игрока
                    </InviteButton>
                </div>

                <FooterNote>
                    <i className="fas fa-file-alt"></i>
                    Кандидаты оставляют сопроводительное письмо. Вы можете принять или отклонить заявку.
                </FooterNote>
            </RequestsContainer>

            <InviteModal isOpen={isInviteModalOpen}>
                <ModalContent>
                    <ModalTitle>
                        <i className="fas fa-paper-plane"></i>
                        Пригласить игрока
                    </ModalTitle>
                    <p style={{ fontSize: '0.85rem', marginBottom: '1rem', color: '#a0a0a0' }}>
                        Игрок получит приглашение и оставит своё сопроводительное письмо.
                    </p>
                    <ModalInput
                        type="text"
                        placeholder="Никнейм игрока"
                        value={inviteNickname}
                        onChange={(e) => setInviteNickname(e.target.value)}
                    />
                    <ModalTextArea
                        rows={4}
                        placeholder="Сопроводительное письмо (что хотите видеть в команде, почему приглашаете?)"
                        value={inviteCoverLetter}
                        onChange={(e) => setInviteCoverLetter(e.target.value)}
                    />
                    <ModalButtons>
                        <ModalButton variant="secondary" onClick={() => setIsInviteModalOpen(false)}>
                            Отмена
                        </ModalButton>
                        <ModalButton variant="primary" onClick={handleInviteSubmit}>
                            Отправить приглашение
                        </ModalButton>
                    </ModalButtons>
                </ModalContent>
            </InviteModal>
        </>
    );
};
