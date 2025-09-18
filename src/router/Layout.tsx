import {FC, useEffect} from 'react';
import {Outlet, useNavigate, useLocation} from 'react-router-dom';
import {useAppSelector} from "@/common/hooks/useAppSelector.ts";

export const Layout: FC = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const authState = useAppSelector((state) => state.authReducer);
    const isAuthenticated = authState?.isAuthenticated ?? false;

    useEffect(() => {
        // Проверка авторизации только для защищенных маршрутов
        if (!isAuthenticated && location.pathname !== '/') {
            navigate('/', {replace: true});
        }

        // Если авторизован и на главной странице - перенаправляем в личный кабинет
        if (isAuthenticated && location.pathname === '/') {
            navigate('/user', {replace: true});
        }
    }, [isAuthenticated, location.pathname, navigate]);

    return (
        <div>
            <Outlet/>
        </div>
    );
};
