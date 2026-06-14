import {FC, useState} from 'react';
import {
    ForgotPassword, FormFooter, FormFooterLink,
    FormGroup, FormInput, FormLabel, FormOptions, FormSubmit,
    Modal,
    ModalClose, ModalHeader,
    ModalOverlay,
    ModalSubtitle,
    ModalTitle, RememberMe
} from "@/common/components/mainPage/modals/style.ts";
import {loginSuccess} from "@/store/reducers/authSlice.ts";
import {useAppDispatch} from "@/common/hooks/useAppSelector.ts";
import {useLoginMutation} from "@/store/reducers/auth/auth.ts";

interface LoginModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSwitchToRegister: () => void;
    onSuccess: () => void;
}

export const LoginModal: FC<LoginModalProps> = ({isOpen, onClose, onSwitchToRegister, onSuccess}) => {
    const dispatch = useAppDispatch();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const [login, {isLoading}] = useLoginMutation();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        try {
            const response = await login({
                username: username,
                password: password
            }).unwrap();

            // Сохраняем данные пользователя
            dispatch(loginSuccess({
                user: {
                    id: response.id,
                    email: response.email,
                    name: response.name || response.username || response.login || username,
                    login: response.username || response.login || username,
                    username: response.username || response.login || username,
                    roles: response.roles || [],
                },
                token: response.token || ''
            }));

            onClose();
            setUsername('');
            setPassword('');

            // Даем время Redux для сохранения состояния
            // Используем setTimeout, чтобы дать возможность Redux обновить store
            setTimeout(() => {
                onSuccess();
            }, 100);

        } catch (err: any) {
            setError(err.data?.message || 'Ошибка при входе. Проверьте логин и пароль.');
        }
    };

    return (
        <ModalOverlay isOpen={isOpen} onClick={onClose}>
            <Modal isOpen={isOpen} onClick={(e) => e.stopPropagation()}>
                <ModalClose onClick={onClose}>&times;</ModalClose>
                <ModalHeader>
                    <ModalTitle>Вход в аккаунт</ModalTitle>
                    <ModalSubtitle>Войдите, чтобы присоединиться к стае</ModalSubtitle>
                </ModalHeader>
                <form onSubmit={handleSubmit}>
                    <FormGroup>
                        <FormLabel htmlFor="username">Имя пользователя</FormLabel>
                        <FormInput
                            type="text"
                            id="username"
                            placeholder="Ваш логин"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                            disabled={isLoading}
                        />
                    </FormGroup>
                    <FormGroup>
                        <FormLabel htmlFor="loginPassword">Пароль</FormLabel>
                        <FormInput
                            type="password"
                            id="loginPassword"
                            placeholder="Ваш пароль"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            disabled={isLoading}
                        />
                    </FormGroup>

                    {error && (
                        <div style={{
                            color: '#dc3545',
                            marginBottom: '15px',
                            fontSize: '14px',
                            textAlign: 'center'
                        }}>
                            {error}
                        </div>
                    )}

                    <FormOptions>
                        <RememberMe>
                            <input type="checkbox" id="rememberMe" disabled={isLoading}/>
                            <label htmlFor="rememberMe">Запомнить меня</label>
                        </RememberMe>
                        <ForgotPassword href="#">Забыли пароль?</ForgotPassword>
                    </FormOptions>

                    <FormSubmit
                        type="submit"
                        disabled={isLoading}
                        style={{opacity: isLoading ? 0.7 : 1}}
                    >
                        {isLoading ? 'Вход...' : 'Войти'}
                    </FormSubmit>

                    <FormFooter>
                        Нет аккаунта? <FormFooterLink
                        href="#"
                        onClick={onSwitchToRegister}
                        style={{pointerEvents: isLoading ? 'none' : 'auto'}}
                    >
                        Зарегистрироваться
                    </FormFooterLink>
                    </FormFooter>
                </form>
            </Modal>
        </ModalOverlay>
    );
};
