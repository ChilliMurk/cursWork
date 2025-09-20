import {FC} from 'react';
import {
    ModalButton,
    ModalButtons,
    ModalContent,
    ModalOverlay, ModalText, ModalTitle
} from "@/common/components/mainPage/modals/logoutModal/style.ts";

interface LogoutModalProps {
    isOpen: boolean;
    onConfirm: () => void;
    onCancel: () => void;
}

export const LogoutModal: FC<LogoutModalProps> = ({isOpen, onConfirm, onCancel}) => {
    return (
        <ModalOverlay isOpen={isOpen}>
            <ModalContent>
                <ModalTitle>Подтверждение выхода</ModalTitle>
                <ModalText>
                    Вы уверены, что хотите выйти из аккаунта?
                    Все несохраненные данные будут потеряны.
                </ModalText>
                <ModalButtons>
                    <ModalButton variant="cancel" onClick={onCancel}>
                        Отмена
                    </ModalButton>
                    <ModalButton variant="confirm" onClick={onConfirm}>
                        Выйти
                    </ModalButton>
                </ModalButtons>
            </ModalContent>
        </ModalOverlay>
    );
};
