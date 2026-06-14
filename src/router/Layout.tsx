import {FC, useEffect, useState} from 'react';
import {Outlet, useNavigate, useLocation} from 'react-router-dom';
import {useAppSelector} from "@/common/hooks/useAppSelector.ts";

export const Layout: FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [isInitialized, setIsInitialized] = useState(false);

    const authState = useAppSelector((state) => state.authReducer);
    const isAuthenticated = authState?.isAuthenticated ?? false;

    useEffect(() => {
        // Даем время для восстановления состояния из localStorage
        const timer = setTimeout(() => {
            setIsInitialized(true);
        }, 300);

        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        if (!isInitialized) return;

        console.log('Layout - isAuthenticated:', isAuthenticated);
        console.log('Layout - location:', location.pathname);

        // Если пользователь авторизован и пытается зайти на главную страницу
        if (isAuthenticated && location.pathname === '/') {
            console.log('Layout - redirecting to /user');
            navigate('/user', {replace: true});
            return;
        }

        // Если пользователь НЕ авторизован и пытается зайти на защищенный маршрут
        if (!isAuthenticated && location.pathname !== '/') {
            console.log('Layout - redirecting to / (not authenticated)');
            navigate('/', {replace: true});
            return;
        }
    }, [isAuthenticated, location.pathname, navigate, isInitialized]);

    // Показываем спиннер только во время начальной инициализации
    if (!isInitialized) {
        return (
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
                background: '#0a1929',
                color: '#00e6ff'
            }}>
                <i className="fas fa-spinner fa-spin" style={{fontSize: '2rem'}}></i>
            </div>
        );
    }

    return <Outlet />;
};
