import {FC} from 'react';
import {useNavigate} from 'react-router-dom';
import {useAppDispatch} from "@/common/hooks/useAppSelector.ts";
import {logout} from "@/store/reducers/authSlice.ts";

export const UserDashboard: FC = () => {
    const dispatch = useAppDispatch(); // Теперь useAppDispatch доступен
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(logout());
        navigate('/');
    };

    return (
        <div style={{padding: '20px'}}>
            <h2>Добро пожаловать в личный кабинет!</h2>
            <p>Вы успешно вошли в систему.</p>
            <button onClick={handleLogout}>Выйти</button>
        </div>
    );
};
