import {FC} from 'react';
import {useGetUserRatingQuery} from '@/store/reducers/statsApi/statsApi';
import {
    ErrorContainer,
    LoadingContainer,
    StatsWrapper,
    StatsGrid,
    StatsCard, StatsIcon, StatsValue, StatsLabel
} from "@/modules/user/profile/components/PlayerStats/style.ts";


interface PlayerStatsProps {
    userId: number;
}

export const PlayerStats: FC<PlayerStatsProps> = ({userId}) => {
    const {data: stats, isLoading, error, refetch} = useGetUserRatingQuery(userId);

    if (isLoading) {
        return (
            <LoadingContainer>
                <i className="fas fa-spinner fa-spin"></i>
                <p>Загрузка статистики...</p>
            </LoadingContainer>
        );
    }

    if (error || !stats) {
        return (
            <ErrorContainer>
                <i className="fas fa-exclamation-triangle"></i>
                <p>Не удалось загрузить статистику</p>
                <button onClick={() => refetch()}>
                    <i className="fas fa-sync-alt"></i> Повторить
                </button>
            </ErrorContainer>
        );
    }

    return (
        <StatsWrapper>
            <StatsGrid>
                <StatsCard>
                    <StatsIcon className="fas fa-crosshairs"/>
                    <StatsValue>{stats.kd?.toFixed(2) || '0.00'}</StatsValue>
                    <StatsLabel>K/D Ratio</StatsLabel>
                </StatsCard>

                <StatsCard>
                    <StatsIcon className="fas fa-bullseye"/>
                    <StatsValue>{stats.average_headshots?.toFixed(1) || '0'}%</StatsValue>
                    <StatsLabel>Headshots</StatsLabel>
                </StatsCard>

                <StatsCard>
                    <StatsIcon className="fas fa-trophy"/>
                    <StatsValue>{stats.win_rate?.toFixed(1) || '0'}%</StatsValue>
                    <StatsLabel>Win Rate</StatsLabel>
                </StatsCard>

                <StatsCard>
                    <StatsIcon className="fas fa-calendar-alt"/>
                    <StatsValue>{stats.tournament_played || 0}</StatsValue>
                    <StatsLabel>Турниров сыграно</StatsLabel>
                </StatsCard>

                <StatsCard>
                    <StatsIcon className="fas fa-chalkboard-user"/>
                    <StatsValue>{stats.training_attendance || 0}</StatsValue>
                    <StatsLabel>Тренировок посещено</StatsLabel>
                </StatsCard>

                <StatsCard>
                    <StatsIcon className="fas fa-clock"/>
                    <StatsValue>{stats.hours_played?.toFixed(1) || '0'}ч</StatsValue>
                    <StatsLabel>Наиграно часов</StatsLabel>
                </StatsCard>

                <StatsCard>
                    <StatsIcon className="fas fa-chart-line"/>
                    <StatsValue>{stats.z_score?.toFixed(2) || '0'}</StatsValue>
                    <StatsLabel>Z-Score рейтинг</StatsLabel>
                </StatsCard>

                <StatsCard>
                    <StatsIcon className="fas fa-medal"/>
                    <StatsValue>#{stats.rank_position || '—'}</StatsValue>
                    <StatsLabel>Место в рейтинге</StatsLabel>
                </StatsCard>
            </StatsGrid>
        </StatsWrapper>
    );
};
