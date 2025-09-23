import {FC, useState} from 'react';
import {
    FormFooter, FormFooterLink,
    FormGroup, FormInput, FormLabel, FormSubmit,
    Modal,
    ModalClose,
    ModalHeader,
    ModalOverlay,
    ModalSubtitle,
    ModalTitle
} from "@/common/components/mainPage/modals/style.ts";
import {useAppDispatch} from "@/common/hooks/useAppSelector.ts";
import {registerStart, registerSuccess, registerFailure} from '@/store/reducers/authSlice';
import {useRegisterMutation} from "@/store/reducers/auth/auth.ts"; // импорт actions

interface RegisterModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSwitchToLogin: () => void;
    onSuccess: () => void;
}

export const RegisterModal: FC<RegisterModalProps> = ({isOpen, onClose, onSwitchToLogin, onSuccess}) => {
    const dispatch = useAppDispatch();
    const [register, {isLoading, error}] = useRegisterMutation();

    const [formData, setFormData] = useState({
        login: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const [formErrors, setFormErrors] = useState({
        login: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {id, value} = e.target;
        setFormData(prev => ({
            ...prev,
            [id]: value
        }));

        // Очищаем ошибки при изменении поля
        setFormErrors(prev => ({
            ...prev,
            [id]: ''
        }));
    };

    const validateForm = () => {
        const errors = {
            login: '',
            email: '',
            password: '',
            confirmPassword: ''
        };

        let isValid = true;

        if (!formData.login.trim()) {
            errors.login = 'Имя пользователя обязательно';
            isValid = false;
        }

        if (!formData.email.trim()) {
            errors.email = 'Email обязателен';
            isValid = false;
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            errors.email = 'Некорректный email';
            isValid = false;
        }

        if (!formData.password) {
            errors.password = 'Пароль обязателен';
            isValid = false;
        } else if (formData.password.length < 6) {
            errors.password = 'Пароль должен содержать минимум 6 символов';
            isValid = false;
        }

        if (formData.password !== formData.confirmPassword) {
            errors.confirmPassword = 'Пароли не совпадают';
            isValid = false;
        }

        setFormErrors(errors);
        return isValid;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) return;

        try {
            dispatch(registerStart());

            const result = await register({
                login: formData.login,
                email: formData.email,
                password: formData.password
            }).unwrap();

            dispatch(registerSuccess({
                user: {
                    id: result.id,
                    email: result.email,
                    name: result.login
                }
            }));

            onClose();
            onSuccess();

        } catch (error: any) {
            const errorMessage = error.data?.message || 'Ошибка регистрации';
            dispatch(registerFailure(errorMessage));
        }
    };

    return (
        <ModalOverlay isOpen={isOpen} onClick={onClose}>
            <Modal isOpen={isOpen} onClick={(e) => e.stopPropagation()}>
                <ModalClose onClick={onClose}>&times;</ModalClose>
                <ModalHeader>
                    <ModalTitle>Регистрация</ModalTitle>
                    <ModalSubtitle>Присоединяйтесь к нашей стае</ModalSubtitle>
                </ModalHeader>

                {error && (
                    <div style={{
                        color: '#ff6b6b',
                        padding: '10px',
                        marginBottom: '15px',
                        backgroundColor: 'rgba(255, 107, 107, 0.1)',
                        borderRadius: '8px'
                    }}>
                        {typeof error === 'string' ? error : 'Ошибка регистрации'}
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    <FormGroup>
                        <FormLabel htmlFor="login">Имя пользователя</FormLabel>
                        <FormInput
                            type="text"
                            id="login"
                            placeholder="Придумайте имя"
                            value={formData.login}
                            onChange={handleInputChange}
                            required
                        />
                        {formErrors.login &&
                            <span style={{color: '#ff6b6b', fontSize: '0.9rem'}}>{formErrors.login}</span>}
                    </FormGroup>

                    <FormGroup>
                        <FormLabel htmlFor="email">Email</FormLabel>
                        <FormInput
                            type="email"
                            id="email"
                            placeholder="your@email.com"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                        />
                        {formErrors.email &&
                            <span style={{color: '#ff6b6b', fontSize: '0.9rem'}}>{formErrors.email}</span>}
                    </FormGroup>

                    <FormGroup>
                        <FormLabel htmlFor="password">Пароль</FormLabel>
                        <FormInput
                            type="password"
                            id="password"
                            placeholder="Придумайте пароль"
                            value={formData.password}
                            onChange={handleInputChange}
                            required
                        />
                        {formErrors.password &&
                            <span style={{color: '#ff6b6b', fontSize: '0.9rem'}}>{formErrors.password}</span>}
                    </FormGroup>

                    <FormGroup>
                        <FormLabel htmlFor="confirmPassword">Подтверждение пароля</FormLabel>
                        <FormInput
                            type="password"
                            id="confirmPassword"
                            placeholder="Повторите пароль"
                            value={formData.confirmPassword}
                            onChange={handleInputChange}
                            required
                        />
                        {formErrors.confirmPassword &&
                            <span style={{color: '#ff6b6b', fontSize: '0.9rem'}}>{formErrors.confirmPassword}</span>}
                    </FormGroup>

                    <FormSubmit
                        type="submit"
                        disabled={isLoading}
                    >
                        {isLoading ? 'Регистрация...' : 'Создать аккаунт'}
                    </FormSubmit>

                    <FormFooter>
                        Уже есть аккаунт? <FormFooterLink href="#" onClick={onSwitchToLogin}>Войти</FormFooterLink>
                    </FormFooter>
                </form>
            </Modal>
        </ModalOverlay>
    );
};
