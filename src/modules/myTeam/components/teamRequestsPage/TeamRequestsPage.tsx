import { FC, useState, useEffect } from 'react';
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

interface JoinRequest {
    id: number;
    nickname: string;
    avatarLetter: string;
    coverLetter: string;
    submittedAt: string;
}

interface TeamRequestsPageProps {
    teamName: string;
    teamId: number;
    onBack: () => void;
    onRequestAccepted?: (request: JoinRequest) => void;
}

export const TeamRequestsPage: FC<TeamRequestsPageProps> = ({
                                                                teamName,
                                                                onBack,
                                                                onRequestAccepted
                                                            }) => {
    const [joinRequests, setJoinRequests] = useState<JoinRequest[]>([]);
    const [teamMembersCount, setTeamMembersCount] = useState(5);
    const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
    const [inviteNickname, setInviteNickname] = useState('');
    const [inviteCoverLetter, setInviteCoverLetter] = useState('');

    useEffect(() => {
        const mockRequests: JoinRequest[] = [
            {
                id: 101,
                nickname: "X_BEAST_X",
                avatarLetter: "X",
                coverLetter: "Привет! Я опытный рифлер с рейтингом 2450 ELO. Участвовал в турнирах уровня Open Cup, имею отличную командную дисциплину. Могу играть каждый вечер, очень хочу усилить вашу команду и вместе расти до профессионального уровня. Готов к тренировкам и выступлениям.",
                submittedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString()
            },
            {
                id: 102,
                nickname: "SniperWolf",
                avatarLetter: "S",
                coverLetter: "Всем привет! Я основной AWPer, стабильный рейтинг 2380. Посещаемость 98%, имею опыт игры в коллективах из топ-100 регионального рейтинга. Умею подстраиваться под стратегии капитана, отличная коммуникация. Напишите, если нужен надёжный снайпер для турниров!",
                submittedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString()
            },
            {
                id: 103,
                nickname: "BeaverFanatic",
                avatarLetter: "B",
                coverLetter: "Очень нравится ваша команда и философия! Я саппорт / IGL, имею 3 года опыта в организации командных тактик. Могу помочь с демами и стратегиями. Хочу вписаться в ваш состав, много тренироваться и достигать побед. Моё сопроводительное письмо: ответственный, дисциплинированный, с микрофоном.",
                submittedAt: new Date().toISOString()
            }
        ];
        setJoinRequests(mockRequests);
    }, []);

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

    const acceptRequest = (requestId: number) => {
        const requestIndex = joinRequests.findIndex(r => r.id === requestId);
        if (requestIndex === -1) return;

        const acceptedPlayer = joinRequests[requestIndex];
        setTeamMembersCount(prev => prev + 1);
        setJoinRequests(prev => prev.filter(r => r.id !== requestId));

        if (onRequestAccepted) {
            onRequestAccepted(acceptedPlayer);
        }

        alert(`✅ Игрок ${acceptedPlayer.nickname} принят в команду!`);
    };

    const declineRequest = (requestId: number) => {
        const requestIndex = joinRequests.findIndex(r => r.id === requestId);
        if (requestIndex !== -1) {
            const declinedName = joinRequests[requestIndex].nickname;
            setJoinRequests(prev => prev.filter(r => r.id !== requestId));
            alert(`❌ Заявка от ${declinedName} отклонена.`);
        }
    };

    const createJoinRequest = (nickname: string, coverLetterText: string) => {
        if (!nickname || nickname.trim() === '') {
            alert("Введите никнейм игрока");
            return false;
        }

        if (joinRequests.some(r => r.nickname.toLowerCase() === nickname.toLowerCase())) {
            alert(`Заявка от ${nickname} уже ожидает рассмотрения.`);
            return false;
        }

        const newId = Date.now();
        const newRequest: JoinRequest = {
            id: newId,
            nickname: nickname.trim(),
            avatarLetter: nickname.charAt(0).toUpperCase(),
            coverLetter: coverLetterText.trim() || "Игрок хочет присоединиться к команде.",
            submittedAt: new Date().toISOString()
        };

        setJoinRequests(prev => [...prev, newRequest]);
        alert(`Приглашение отправлено! Заявка от ${nickname} создана.`);
        return true;
    };

    const handleInviteSubmit = () => {
        if (!inviteNickname) {
            alert("Укажите никнейм игрока.");
            return;
        }

        if (!inviteCoverLetter) {
            if (confirm("Сопроводительное письмо пустое. Отправить без текста?")) {
                createJoinRequest(inviteNickname, "Игрок принял приглашение, но не оставил сопроводительного письма.");
                setIsInviteModalOpen(false);
                setInviteNickname('');
                setInviteCoverLetter('');
            }
        } else {
            createJoinRequest(inviteNickname, inviteCoverLetter);
            setIsInviteModalOpen(false);
            setInviteNickname('');
            setInviteCoverLetter('');
        }
    };

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
                            <StatNumber>{joinRequests.length}</StatNumber>
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
                    {joinRequests.length === 0 ? (
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
                        joinRequests.map(request => (
                            <RequestCard key={request.id}>
                                <RequestHeader>
                                    <PlayerInfo>
                                        <PlayerAvatar>{request.avatarLetter}</PlayerAvatar>
                                        <PlayerDetails>
                                            <PlayerName>{request.nickname}</PlayerName>
                                            <PlayerNick>
                                                <i className="fas fa-id-card"></i>
                                                Заявка от {formatDate(request.submittedAt)}
                                            </PlayerNick>
                                        </PlayerDetails>
                                    </PlayerInfo>
                                    <RequestDate>
                                        <i className="far fa-clock"></i> {getDaysAgo(request.submittedAt)}
                                    </RequestDate>
                                </RequestHeader>

                                <CoverLetter>
                                    <CoverLetterLabel>
                                        <i className="fas fa-feather-alt"></i>
                                        Сопроводительное письмо:
                                    </CoverLetterLabel>
                                    <CoverLetterText
                                        dangerouslySetInnerHTML={{ __html: escapeHtml(request.coverLetter) }}
                                    />
                                </CoverLetter>

                                <RequestActions>
                                    <AcceptButton onClick={() => acceptRequest(request.id)}>
                                        <i className="fas fa-check-circle"></i>
                                        Принять в команду
                                    </AcceptButton>
                                    <DeclineButton onClick={() => declineRequest(request.id)}>
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
