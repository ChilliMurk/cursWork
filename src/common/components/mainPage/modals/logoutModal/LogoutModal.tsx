import {FC} from 'react';
import {
    ModalButton,
    ModalButtons,
    ModalContent,
    ModalOverlay, ModalText, ModalTitle
} from "@/common/components/mainPage/modals/logoutModal/style.ts";
import {useAppDispatch} from "@/common/hooks/useAppSelector.ts";
import {logout} from "@/store/reducers/authSlice.ts";
import {resetStore} from "@/store/store";

interface LogoutModalProps {
    isOpen: boolean;
    onConfirm: () => void;
    onCancel: () => void;
}

export const LogoutModal: FC<LogoutModalProps> = ({isOpen, onConfirm, onCancel}) => {
    const dispatch = useAppDispatch();

    const handleConfirm = () => {
        dispatch(logout());
        resetStore();
        window.location.href = '/';
        onConfirm();
    };

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
                    <ModalButton variant="confirm" onClick={handleConfirm}>
                        Выйти
                    </ModalButton>
                </ModalButtons>
            </ModalContent>
        </ModalOverlay>
    );
};
