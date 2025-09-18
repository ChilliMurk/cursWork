import { FC } from 'react';
import {
    ForgotPassword, FormFooter, FormFooterLink,
    FormGroup, FormInput, FormLabel, FormOptions, FormSubmit,
    Modal,
    ModalClose,
    ModalHeader,
    ModalOverlay,
    ModalSubtitle,
    ModalTitle, RememberMe
} from "@/common/components/mainPage/modals/style.ts";

interface LoginModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSwitchToRegister: () => void;
}

export const LoginModal: FC<LoginModalProps> = ({ isOpen, onClose, onSwitchToRegister }) => {
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Login submitted');
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
                        <FormLabel htmlFor="loginEmail">Email</FormLabel>
                        <FormInput
                            type="email"
                            id="loginEmail"
                            placeholder="your@email.com"
                            required
                        />
                    </FormGroup>
                    <FormGroup>
                        <FormLabel htmlFor="loginPassword">Пароль</FormLabel>
                        <FormInput
                            type="password"
                            id="loginPassword"
                            placeholder="Ваш пароль"
                            required
                        />
                    </FormGroup>
                    <FormOptions>
                        <RememberMe>
                            <input type="checkbox" id="rememberMe" />
                            <label htmlFor="rememberMe">Запомнить меня</label>
                        </RememberMe>
                        <ForgotPassword href="#">Забыли пароль?</ForgotPassword>
                    </FormOptions>
                    <FormSubmit type="submit">Войти</FormSubmit>
                    <FormFooter>
                        Нет аккаунта? <FormFooterLink href="#" onClick={onSwitchToRegister}>Зарегистрироваться</FormFooterLink>
                    </FormFooter>
                </form>
            </Modal>
        </ModalOverlay>
    );
};
