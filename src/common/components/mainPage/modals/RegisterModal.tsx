import { FC } from 'react';
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

interface RegisterModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSwitchToLogin: () => void;
}

export const RegisterModal: FC<RegisterModalProps> = ({ isOpen, onClose, onSwitchToLogin }) => {
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Register submitted');
    };

    return (
        <ModalOverlay isOpen={isOpen} onClick={onClose}>
            <Modal isOpen={isOpen} onClick={(e) => e.stopPropagation()}>
                <ModalClose onClick={onClose}>&times;</ModalClose>
                <ModalHeader>
                    <ModalTitle>Регистрация</ModalTitle>
                    <ModalSubtitle>Присоединяйтесь к нашей стае</ModalSubtitle>
                </ModalHeader>
                <form onSubmit={handleSubmit}>
                    <FormGroup>
                        <FormLabel htmlFor="registerUsername">Имя пользователя</FormLabel>
                        <FormInput
                            type="text"
                            id="registerUsername"
                            placeholder="Придумайте имя"
                            required
                        />
                    </FormGroup>
                    <FormGroup>
                        <FormLabel htmlFor="registerEmail">Email</FormLabel>
                        <FormInput
                            type="email"
                            id="registerEmail"
                            placeholder="your@email.com"
                            required
                        />
                    </FormGroup>
                    <FormGroup>
                        <FormLabel htmlFor="registerPassword">Пароль</FormLabel>
                        <FormInput
                            type="password"
                            id="registerPassword"
                            placeholder="Придумайте пароль"
                            required
                        />
                    </FormGroup>
                    <FormGroup>
                        <FormLabel htmlFor="confirmPassword">Подтверждение пароля</FormLabel>
                        <FormInput
                            type="password"
                            id="confirmPassword"
                            placeholder="Повторите пароль"
                            required
                        />
                    </FormGroup>
                    <FormSubmit type="submit">Создать аккаунт</FormSubmit>
                    <FormFooter>
                        Уже есть аккаунт? <FormFooterLink href="#" onClick={onSwitchToLogin}>Войти</FormFooterLink>
                    </FormFooter>
                </form>
            </Modal>
        </ModalOverlay>
    );
};
