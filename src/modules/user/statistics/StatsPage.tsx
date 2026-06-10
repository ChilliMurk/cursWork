import {FC, useState} from 'react';
import {
    ApplyButton,
    CardTitle, PresetButton, PresetGroup,
    SliderHeader,
    SliderItem,
    SlidersGrid,
    StatsContainer, StatsTable, StyledRange, TableContainer, WeightNote,
    WeightsCard, WeightValue, AvgBar, FooterInfo, MemberBadge
} from "@/modules/user/statistics/style.ts";

interface Player {
    name: string;
    kd: number;
    winrate: number;
    adr: number;
    hours: number;
    tournaments: number;
    attendance: number;
    role: string;
    isUser: boolean;
}

interface RatedPlayer extends Player {
    rating: number;
}

interface Importance {
    kd: number;
    winrate: number;
    adr: number;
    hours: number;
    tournaments: number;
    attendance: number;
}

interface Metric {
    id: keyof Importance;
    label: string;
    icon: string;
}

const mockPlayersData: Player[] = [
    {
        name: "A",
        kd: 1.20,
        winrate: 0.55,
        adr: 75,
        hours: 1200,
        tournaments: 8,
        attendance: 85,
        role: "IGL/Captain",
        isUser: true
    },
    {
        name: "B",
        kd: 0.90,
        winrate: 0.48,
        adr: 62,
        hours: 3000,
        tournaments: 15,
        attendance: 90,
        role: "Rifler",
        isUser: false
    },
    {
        name: "C",
        kd: 2.10,
        winrate: 0.70,
        adr: 98,
        hours: 800,
        tournaments: 4,
        attendance: 70,
        role: "AWPer",
        isUser: false
    },
    {
        name: "D",
        kd: 0.70,
        winrate: 0.40,
        adr: 55,
        hours: 450,
        tournaments: 2,
        attendance: 95,
        role: "Lurker",
        isUser: false
    },
    {
        name: "E",
        kd: 1.50,
        winrate: 0.62,
        adr: 85,
        hours: 2000,
        tournaments: 10,
        attendance: 80,
        role: "Entry",
        isUser: false
    },
    {
        name: "F",
        kd: 1.00,
        winrate: 0.52,
        adr: 70,
        hours: 600,
        tournaments: 3,
        attendance: 88,
        role: "Support",
        isUser: false
    },
    {
        name: "G",
        kd: 1.80,
        winrate: 0.65,
        adr: 90,
        hours: 1500,
        tournaments: 12,
        attendance: 75,
        role: "Star Player",
        isUser: false
    },
    {
        name: "H",
        kd: 0.80,
        winrate: 0.45,
        adr: 60,
        hours: 2500,
        tournaments: 9,
        attendance: 92,
        role: "Support",
        isUser: false
    },
    {
        name: "I",
        kd: 1.30,
        winrate: 0.58,
        adr: 78,
        hours: 1000,
        tournaments: 6,
        attendance: 82,
        role: "Flex",
        isUser: false
    },
    {
        name: "J",
        kd: 0.60,
        winrate: 0.38,
        adr: 50,
        hours: 350,
        tournaments: 1,
        attendance: 96,
        role: "Rookie",
        isUser: false
    }
];

const metrics: Metric[] = [
    {id: "kd", label: "K/D (убийства/смерти)", icon: "fa-skull"},
    {id: "winrate", label: "WinRate (побед)", icon: "fa-trophy"},
    {id: "adr", label: "ADR (урон за раунд)", icon: "fa-bolt"},
    {id: "hours", label: "Часы в игре", icon: "fa-clock"},
    {id: "tournaments", label: "Турниры", icon: "fa-medal"},
    {id: "attendance", label: "Тренировки %", icon: "fa-calendar-check"}
];

export const StatsPage: FC = () => {
    const [importance, setImportance] = useState<Importance>({
        kd: 5,
        winrate: 5,
        adr: 3,
        hours: 2,
        tournaments: 3,
        attendance: 2
    });

    const [ratedPlayers, setRatedPlayers] = useState<RatedPlayer[]>([]);

    const importanceToWeights = (imp: Importance): Importance => {
        const total = Object.values(imp).reduce((sum, val) => sum + val, 0);
        if (total === 0) {
            const eq = 1 / Object.keys(imp).length;
            const weights: Importance = {...imp};
            Object.keys(weights).forEach(key => {
                weights[key as keyof Importance] = eq;
            });
            return weights;
        }
        const weights: Importance = {...imp};
        Object.keys(weights).forEach(key => {
            weights[key as keyof Importance] = imp[key as keyof Importance] / total;
        });
        return weights;
    };

    const computeZMatrix = (players: Player[]) => {
        const n = players.length;
        const getArr = (key: keyof Player) => players.map(p => p[key] as number);

        const kdArr = getArr('kd');
        const wrArr = getArr('winrate');
        const adrArr = getArr('adr');
        const hrsArr = getArr('hours');
        const tourArr = getArr('tournaments');
        const attArr = getArr('attendance');

        const calc = (arr: number[]) => {
            const mean = arr.reduce((a, b) => a + b, 0) / n;
            const variance = arr.reduce((a, b) => a + Math.pow(b - mean, 2), 0) / n;
            const std = Math.sqrt(variance) === 0 ? 1 : Math.sqrt(variance);
            return {mean, std};
        };

        const kdStat = calc(kdArr);
        const wrStat = calc(wrArr);
        const adrStat = calc(adrArr);
        const hrsStat = calc(hrsArr);
        const tourStat = calc(tourArr);
        const attStat = calc(attArr);

        return players.map(p => ({
            zKd: (p.kd - kdStat.mean) / kdStat.std,
            zWr: (p.winrate - wrStat.mean) / wrStat.std,
            zAdr: (p.adr - adrStat.mean) / adrStat.std,
            zHours: (p.hours - hrsStat.mean) / hrsStat.std,
            zTour: (p.tournaments - tourStat.mean) / tourStat.std,
            zAtt: (p.attendance - attStat.mean) / attStat.std
        }));
    };

    const computeRatings = (players: Player[], imp: Importance): RatedPlayer[] => {
        const weights = importanceToWeights(imp);
        const zMat = computeZMatrix(players);

        return players.map((p, idx) => {
            const z = zMat[idx];
            const rating = (z.zKd * weights.kd) +
                (z.zWr * weights.winrate) +
                (z.zAdr * weights.adr) +
                (z.zHours * weights.hours) +
                (z.zTour * weights.tournaments) +
                (z.zAtt * weights.attendance);
            return {...p, rating};
        });
    };

    const handleRecalculate = () => {
        const newRatedPlayers = computeRatings(mockPlayersData, importance);
        setRatedPlayers(newRatedPlayers);
    };

    const handleImportanceChange = (id: keyof Importance, value: number) => {
        setImportance(prev => ({...prev, [id]: value}));
    };

    const setPreset = (preset: Importance) => {
        setImportance(preset);
        const newRatedPlayers = computeRatings(mockPlayersData, preset);
        setRatedPlayers(newRatedPlayers);
    };

    const getPlayerPlace = (rating: number) => {
        return ratedPlayers.filter(p => p.rating > rating).length + 1;
    };

    const getTopPlayer = () => {
        if (ratedPlayers.length === 0) return null;
        return [...ratedPlayers].sort((a, b) => b.rating - a.rating)[0];
    };

    const getAvgRating = () => {
        if (ratedPlayers.length === 0) return 0;
        return ratedPlayers.reduce((sum, p) => sum + p.rating, 0) / ratedPlayers.length;
    };

    const topPlayer = getTopPlayer();
    const avgRating = getAvgRating();

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
                                <WeightValue>{importance[metric.id]}</WeightValue>
                            </SliderHeader>
                            <StyledRange
                                type="range"
                                min="0"
                                max="10"
                                step="1"
                                value={importance[metric.id]}
                                onChange={(e) => handleImportanceChange(metric.id, parseInt(e.target.value, 10))}
                            />
                            <WeightNote>0 — неважно &nbsp;&nbsp;|&nbsp;&nbsp; 10 — максимально важно</WeightNote>
                        </SliderItem>
                    ))}
                </SlidersGrid>
                <PresetGroup>
                    <PresetButton onClick={() => setPreset({
                        kd: 10,
                        winrate: 10,
                        adr: 0,
                        hours: 0,
                        tournaments: 0,
                        attendance: 0
                    })}>
                        <i className="fas fa-chart-line"></i> Только K/D + WinRate
                    </PresetButton>
                    <PresetButton
                        onClick={() => setPreset({kd: 9, winrate: 2, adr: 9, hours: 1, tournaments: 1, attendance: 0})}>
                        <i className="fas fa-crosshairs"></i> Снайпер: K/D + ADR
                    </PresetButton>
                    <PresetButton onClick={() => setPreset({
                        kd: 3,
                        winrate: 3,
                        adr: 2,
                        hours: 10,
                        tournaments: 8,
                        attendance: 2
                    })}>
                        <i className="fas fa-clock"></i> Ветеран: Часы + Турниры
                    </PresetButton>
                    <PresetButton
                        onClick={() => setPreset({kd: 3, winrate: 8, adr: 2, hours: 2, tournaments: 3, attendance: 7})}>
                        <i className="fas fa-users"></i> Командный: WinRate + Посещ.
                    </PresetButton>
                    <PresetButton
                        onClick={() => setPreset({kd: 5, winrate: 5, adr: 5, hours: 5, tournaments: 5, attendance: 5})}>
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

            <TableContainer>
                <div style={{padding: '1rem 1rem 0 1rem'}}>
                    <h3 style={{color: '#00e6ff'}}>
                        <i className="fas fa-chart-line"></i> Рейтинг команды (Z-оценка + взвешенная сумма)
                    </h3>
                </div>
                <div style={{overflowX: 'auto'}}>
                    <StatsTable>
                        <thead>
                        <tr>
                            <th>Игрок</th>
                            <th>K/D</th>
                            <th>WinRate</th>
                            <th>ADR</th>
                            <th>Часы</th>
                            <th>Турниры</th>
                            <th>Тренировки%</th>
                            <th>Роль</th>
                            <th>Z-Рейтинг</th>
                            <th>Место</th>
                        </tr>
                        </thead>
                        <tbody>
                        {ratedPlayers.length === 0 ? (
                            <tr>
                                <td colSpan={10} style={{textAlign: 'center', padding: '40px'}}>
                                    <i className="fas fa-chart-line" style={{fontSize: '2rem', color: '#00b4d8'}}></i>
                                    <p style={{marginTop: '10px'}}>Нажмите "Пересчитать рейтинг" для отображения
                                        результатов</p>
                                </td>
                            </tr>
                        ) : (
                            ratedPlayers.map((player, idx) => {
                                const isUser = player.isUser;
                                const place = getPlayerPlace(player.rating);
                                const isTopPlayer = topPlayer?.name === player.name;

                                return (
                                    <tr key={idx} style={isUser ? {
                                        background: 'rgba(0, 180, 216, 0.25)',
                                        fontWeight: 'bold'
                                    } : {}}>
                                        <td>
                                            <strong>{player.name}</strong>
                                            {isUser && <MemberBadge>Вы</MemberBadge>}
                                            {isTopPlayer && !isUser && <i className="fas fa-crown" style={{
                                                color: '#ffd966',
                                                marginLeft: '6px'
                                            }}></i>}
                                        </td>
                                        <td>{player.kd.toFixed(2)}</td>
                                        <td>{(player.winrate * 100).toFixed(1)}%</td>
                                        <td>{player.adr}</td>
                                        <td>{player.hours}</td>
                                        <td>{player.tournaments}</td>
                                        <td>{player.attendance}%</td>
                                        <td>{player.role}</td>
                                        <td>
                                                <span style={{
                                                    color: player.rating >= 0 ? '#00e6ff' : '#ffaa66',
                                                    fontWeight: 'bold'
                                                }}>
                                                    {player.rating.toFixed(4)}
                                                </span>
                                        </td>
                                        <td>{place}</td>
                                    </tr>
                                );
                            })
                        )}
                        </tbody>
                    </StatsTable>
                </div>
                <AvgBar>
                    <span><i className="fas fa-chart-line"></i> Средний рейтинг: <strong>{avgRating.toFixed(4)}</strong></span>
                    <span><i
                        className="fas fa-trophy"></i> Лучший: <strong>{topPlayer ? `${topPlayer.name} (${topPlayer.rating.toFixed(4)})` : '—'}</strong></span>
                </AvgBar>
            </TableContainer>
            <FooterInfo>
                <i className="fas fa-dice-d6"></i> Веса автоматически нормализуются (сумма = 1). Рейтинг пересчитывается
                по Z-модели.
            </FooterInfo>
        </StatsContainer>
    );
};
