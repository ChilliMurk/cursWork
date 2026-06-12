import {FC, useState} from 'react';
import {
    ApplyButton,
    CardTitle,
    PresetButton,
    PresetGroup,
    SliderHeader,
    SliderItem,
    SlidersGrid,
    StatsContainer,
    StatsTable,
    StyledRange,
    TableContainer,
    WeightNote,
    WeightsCard,
    WeightValue,
    AvgBar,
    FooterInfo,
    MemberBadge,
    LoadingSpinner,
    ErrorMessage,
    TabContainer,
    TabButton,
    TeamStatsTable
} from "@/modules/user/statistics/style.ts";
import {
    useGetGlobalRatingQuery,
    useGetTeamRatingQuery,
    useGetTeamsRatingQuery,
    RateInfoResponse,
    TeamRatesInfoResponse
} from "@/store/reducers/statsApi/statsApi";
import {useGetCurrentUserQuery} from "@/store/reducers/userApi/userApi";

type TabType = 'global' | 'team' | 'teams';

interface Importance {
    wKd: number;
    wHs: number;
    wWr: number;
    wTa: number;
    wTr: number;
    wHp: number;
}

interface Metric {
    id: keyof Importance;
    label: string;
    icon: string;
    apiKey: string;
}

const metrics: Metric[] = [
    {id: "wKd", label: "K/D (убийства/смерти)", icon: "fa-skull", apiKey: "wKd"},
    {id: "wHs", label: "Хедшоты %", icon: "fa-bullseye", apiKey: "wHs"},
    {id: "wWr", label: "WinRate (побед)", icon: "fa-trophy", apiKey: "wWr"},
    {id: "wTr", label: "Турниры", icon: "fa-medal", apiKey: "wTr"},
    {id: "wTa", label: "Тренировки %", icon: "fa-calendar-check", apiKey: "wTa"},
    {id: "wHp", label: "Часы в игре", icon: "fa-clock", apiKey: "wHp"}
];

export const StatsPage: FC = () => {
    const {data: currentUser} = useGetCurrentUserQuery();
    const [activeTab, setActiveTab] = useState<TabType>('global');
    const [weights, setWeights] = useState<Importance>({
        wKd: 5,
        wHs: 5,
        wWr: 5,
        wTa: 5,
        wTr: 5,
        wHp: 5
    });
    const [shouldFetch, setShouldFetch] = useState(false);

    const apiParams = {
        wKd: weights.wKd,
        wHs: weights.wHs,
        wWr: weights.wWr,
        wTa: weights.wTa,
        wTr: weights.wTr,
        wHp: weights.wHp
    };

    const {
        data: globalRating,
        isLoading: globalLoading,
        error: globalError,
        refetch: refetchGlobal
    } = useGetGlobalRatingQuery(shouldFetch ? apiParams : undefined, {skip: !shouldFetch || activeTab !== 'global'});

    const {
        data: teamRating,
        isLoading: teamLoading,
        error: teamError,
        refetch: refetchTeam
    } = useGetTeamRatingQuery(shouldFetch ? apiParams : undefined, {skip: !shouldFetch || activeTab !== 'team'});

    const {
        data: teamsRating,
        isLoading: teamsLoading,
        error: teamsError,
        refetch: refetchTeams
    } = useGetTeamsRatingQuery(shouldFetch ? apiParams : undefined, {skip: !shouldFetch || activeTab !== 'teams'});

    const handleRecalculate = () => {
        setShouldFetch(true);
        setTimeout(() => {
            if (activeTab === 'global') refetchGlobal();
            if (activeTab === 'team') refetchTeam();
            if (activeTab === 'teams') refetchTeams();
        }, 0);
    };

    const handleImportanceChange = (id: keyof Importance, value: number) => {
        setWeights(prev => ({...prev, [id]: value}));
        setShouldFetch(false);
    };

    const setPreset = (preset: Importance) => {
        setWeights(preset);
        setShouldFetch(false);
    };

    const getTopPlayer = (players: RateInfoResponse[]) => {
        if (!players || players.length === 0) return null;
        return [...players].sort((a, b) => b.z_score - a.z_score)[0];
    };

    const getAvgZScore = (players: RateInfoResponse[]) => {
        if (!players || players.length === 0) return 0;
        return players.reduce((sum, p) => sum + p.z_score, 0) / players.length;
    };

    const isLoading = (activeTab === 'global' && globalLoading) ||
        (activeTab === 'team' && teamLoading) ||
        (activeTab === 'teams' && teamsLoading);

    const error = (activeTab === 'global' && globalError) ||
        (activeTab === 'team' && teamError) ||
        (activeTab === 'teams' && teamsError);

    const currentData = activeTab === 'global' ? globalRating :
        activeTab === 'team' ? teamRating : teamsRating;

    const topPlayer = activeTab !== 'teams' && currentData ? getTopPlayer(currentData as RateInfoResponse[]) : null;
    const avgZScore = activeTab !== 'teams' && currentData ? getAvgZScore(currentData as RateInfoResponse[]) : 0;

    const renderGlobalTeamTable = () => {
        const players = currentData as RateInfoResponse[];
        if (!players || players.length === 0) {
            return (
                <tr>
                    <td colSpan={9} style={{textAlign: 'center', padding: '40px'}}>
                        <i className="fas fa-chart-line" style={{fontSize: '2rem', color: '#00b4d8'}}></i>
                        <p style={{marginTop: '10px'}}>Нажмите "Пересчитать рейтинг" для отображения результатов</p>
                    </td>
                </tr>
            );
        }

        return players.map((player) => {
            const isUser = currentUser?.id === player.user_id;
            const isTopPlayer = topPlayer?.user_id === player.user_id;

            return (
                <tr key={player.user_id}
                    style={isUser ? {background: 'rgba(0, 180, 216, 0.25)', fontWeight: 'bold'} : {}}>
                    <td>
                        <strong>{player.user_name}</strong>
                        {isUser && <MemberBadge>Вы</MemberBadge>}
                        {isTopPlayer && !isUser &&
                            <i className="fas fa-crown" style={{color: '#ffd966', marginLeft: '6px'}}></i>}
                    </td>
                    <td>{player.kd.toFixed(2)}</td>
                    <td>{player.average_headshots.toFixed(1)}%</td>
                    <td>{player.win_rate.toFixed(1)}%</td>
                    <td>{player.tournament_played}</td>
                    <td>{(player.training_attendance * 100).toFixed(1)}%</td>
                    <td>{player.hours_played.toFixed(0)}</td>
                    <td>
                        <span style={{color: player.z_score >= 0 ? '#00e6ff' : '#ffaa66', fontWeight: 'bold'}}>
                            {player.z_score.toFixed(4)}
                        </span>
                    </td>
                    <td>{player.rank_position}</td>
                </tr>
            );
        });
    };

    const renderTeamsTable = () => {
        const teams = currentData as TeamRatesInfoResponse[];
        if (!teams || teams.length === 0) {
            return (
                <tr>
                    <td colSpan={3} style={{textAlign: 'center', padding: '40px'}}>
                        <i className="fas fa-chart-line" style={{fontSize: '2rem', color: '#00b4d8'}}></i>
                        <p style={{marginTop: '10px'}}>Нажмите "Пересчитать рейтинг" для отображения результатов</p>
                    </td>
                </tr>
            );
        }

        return teams.map((team) => (
            <tr key={team.team_id}>
                <td><strong>{team.team_name}</strong></td>
                <td>
                    <span style={{color: team.z_score >= 0 ? '#00e6ff' : '#ffaa66', fontWeight: 'bold'}}>
                        {team.z_score.toFixed(4)}
                    </span>
                </td>
                <td>{team.rank_position}</td>
            </tr>
        ));
    };

    return (
        <StatsContainer>
            <WeightsCard>
                <CardTitle>
                    <i className="fas fa-sliders-h"></i>
                    Оцените важность показателей (0 — неважно, 10 — максимально важно)
                </CardTitle>
                <SlidersGrid>
                    {metrics.map(metric => (
                        <SliderItem key={metric.id}>
                            <SliderHeader>
                                <span><i className={`fas ${metric.icon}`}></i> {metric.label}</span>
                                <WeightValue>{weights[metric.id]}</WeightValue>
                            </SliderHeader>
                            <StyledRange
                                type="range"
                                min="0"
                                max="10"
                                step="1"
                                value={weights[metric.id]}
                                onChange={(e) => handleImportanceChange(metric.id, parseInt(e.target.value, 10))}
                            />
                            <WeightNote>0 — неважно &nbsp;&nbsp;|&nbsp;&nbsp; 10 — максимально важно</WeightNote>
                        </SliderItem>
                    ))}
                </SlidersGrid>
                <PresetGroup>
                    <PresetButton onClick={() => setPreset({wKd: 10, wHs: 0, wWr: 10, wTa: 0, wTr: 0, wHp: 0})}>
                        <i className="fas fa-chart-line"></i> Только K/D + WinRate
                    </PresetButton>
                    <PresetButton onClick={() => setPreset({wKd: 9, wHs: 0, wWr: 1, wTa: 0, wTr: 0, wHp: 0})}>
                        <i className="fas fa-crosshairs"></i> Снайпер: K/D
                    </PresetButton>
                    <PresetButton onClick={() => setPreset({wKd: 2, wHs: 2, wWr: 2, wTa: 2, wTr: 8, wHp: 8})}>
                        <i className="fas fa-clock"></i> Ветеран: Часы + Турниры
                    </PresetButton>
                    <PresetButton onClick={() => setPreset({wKd: 2, wHs: 0, wWr: 8, wTa: 8, wTr: 2, wHp: 2})}>
                        <i className="fas fa-users"></i> Командный: WinRate + Посещ.
                    </PresetButton>
                    <PresetButton onClick={() => setPreset({wKd: 5, wHs: 5, wWr: 5, wTa: 5, wTr: 5, wHp: 5})}>
                        <i className="fas fa-undo-alt"></i> Равные веса (5/5)
                    </PresetButton>
                </PresetGroup>
                <div style={{display: 'flex', justifyContent: 'flex-end', marginTop: '12px'}}>
                    <ApplyButton onClick={handleRecalculate}>
                        <i className="fas fa-calculator"></i> Пересчитать рейтинг
                    </ApplyButton>
                </div>
                <FooterInfo style={{marginTop: '12px', textAlign: 'left', border: 'none', padding: 0}}>
                    <i className="fas fa-chart-simple"></i> Алгоритм: Z-стандартизация → взвешенная сумма (нормировка
                    весов).<br/>
                    <i className="fas fa-lightbulb"></i> Значения важности переводятся в веса автоматически (сумма = 1).
                </FooterInfo>
            </WeightsCard>

            <TabContainer>
                <TabButton isActive={activeTab === 'global'} onClick={() => setActiveTab('global')}>
                    <i className="fas fa-globe"></i> Общий рейтинг
                </TabButton>
                <TabButton isActive={activeTab === 'team'} onClick={() => setActiveTab('team')}>
                    <i className="fas fa-users"></i> Рейтинг команды
                </TabButton>
                <TabButton isActive={activeTab === 'teams'} onClick={() => setActiveTab('teams')}>
                    <i className="fas fa-trophy"></i> Рейтинг команд
                </TabButton>
            </TabContainer>

            <TableContainer>
                <div style={{padding: '1rem 1rem 0 1rem'}}>
                    <h3 style={{color: '#00e6ff'}}>
                        <i className="fas fa-chart-line"></i>
                        {activeTab === 'global' && 'Общий рейтинг игроков'}
                        {activeTab === 'team' && 'Рейтинг игроков моей команды'}
                        {activeTab === 'teams' && 'Рейтинг команд'}
                    </h3>
                </div>
                <div style={{overflowX: 'auto'}}>
                    {error ? (
                        <ErrorMessage>
                            <i className="fas fa-exclamation-triangle"></i> Ошибка загрузки данных
                        </ErrorMessage>
                    ) : isLoading && shouldFetch ? (
                        <LoadingSpinner>
                            <i className="fas fa-spinner fa-spin"></i> Загрузка...
                        </LoadingSpinner>
                    ) : activeTab === 'teams' ? (
                        <TeamStatsTable>
                            <thead>
                            <tr>
                                <th>Команда</th>
                                <th>Z-Рейтинг</th>
                                <th>Место</th>
                            </tr>
                            </thead>
                            <tbody>
                            {renderTeamsTable()}
                            </tbody>
                        </TeamStatsTable>
                    ) : (
                        <StatsTable>
                            <thead>
                            <tr>
                                <th>Игрок</th>
                                <th>K/D</th>
                                <th>Хедшоты%</th>
                                <th>WinRate</th>
                                <th>Турниры</th>
                                <th>Тренировки%</th>
                                <th>Часы</th>
                                <th>Z-Рейтинг</th>
                                <th>Место</th>
                            </tr>
                            </thead>
                            <tbody>
                            {renderGlobalTeamTable()}
                            </tbody>
                        </StatsTable>
                    )}
                </div>
                {activeTab !== 'teams' && currentData && (currentData as RateInfoResponse[]).length > 0 && (
                    <AvgBar>
                        <span><i
                            className="fas fa-chart-line"></i> Средний Z-рейтинг: <strong>{avgZScore.toFixed(4)}</strong></span>
                        <span><i
                            className="fas fa-trophy"></i> Лучший: <strong>{topPlayer ? `${topPlayer.user_name} (${topPlayer.z_score.toFixed(4)})` : '—'}</strong></span>
                    </AvgBar>
                )}
            </TableContainer>
            <FooterInfo>
                <i className="fas fa-dice-d6"></i> Веса автоматически нормализуются (сумма = 1). Рейтинг пересчитывается
                по Z-модели.
            </FooterInfo>
        </StatsContainer>
    );
};
