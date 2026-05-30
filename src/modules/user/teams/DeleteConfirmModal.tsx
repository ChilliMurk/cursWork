import {FC} from 'react';
import styled from "@emotion/styled";

interface DeleteConfirmModalProps {
    isOpen: boolean;
    teamName: string;
    onConfirm: () => void;
    onCancel: () => void;
}

export const DeleteConfirmModal: FC<DeleteConfirmModalProps> = ({
                                                                    isOpen,
                                                                    teamName,
                                                                    onConfirm,
                                                                    onCancel
                                                                }) => {
    if (!isOpen) return null;

    return (
        <ModalOverlay>
            <ModalContent>
                <ModalIcon>
                    <i className="fas fa-exclamation-triangle"></i>
                </ModalIcon>
                <ModalTitle>Удаление команды</ModalTitle>
                <ModalText>
                    Вы уверены, что хотите удалить команду <strong>"{teamName}"</strong>?
                </ModalText>
                <ModalSubtext>
                    Это действие нельзя отменить. Все данные команды будут потеряны навсегда.
                </ModalSubtext>
                <ModalButtons>
                    <CancelButton onClick={onCancel}>
                        <i className="fas fa-times"></i>
                        Отмена
                    </CancelButton>
                    <ConfirmButton onClick={onConfirm}>
                        <i className="fas fa-trash-alt"></i>
                        Удалить команду
                    </ConfirmButton>
                </ModalButtons>
            </ModalContent>
        </ModalOverlay>
    );
};

const ModalOverlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.85);
    backdrop-filter: blur(5px);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 2000;
    animation: fadeIn 0.2s ease;

    @keyframes fadeIn {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }
`;

const ModalContent = styled.div`
    background: linear-gradient(145deg, #132f4c, #0a1929);
    border: 2px solid rgba(244, 67, 54, 0.5);
    border-radius: 20px;
    padding: 30px;
    max-width: 450px;
    width: 90%;
    text-align: center;
    animation: slideIn 0.3s ease;

    @keyframes slideIn {
        from {
            transform: translateY(-50px);
            opacity: 0;
        }
        to {
            transform: translateY(0);
            opacity: 1;
        }
    }
`;

const ModalIcon = styled.div`
    font-size: 4rem;
    color: #ff5252;
    margin-bottom: 20px;

    i {
        text-shadow: 0 0 20px rgba(244, 67, 54, 0.5);
    }
`;

const ModalTitle = styled.h2`
    font-family: 'Orbitron', sans-serif;
    font-size: 1.8rem;
    color: #ff5252;
    margin-bottom: 15px;
`;

const ModalText = styled.p`
    color: #e0e0e0;
    font-size: 1.1rem;
    margin-bottom: 10px;
    line-height: 1.5;

    strong {
        color: #00e6ff;
    }
`;

const ModalSubtext = styled.p`
    color: #a0a0a0;
    font-size: 0.9rem;
    margin-bottom: 25px;
`;

const ModalButtons = styled.div`
    display: flex;
    gap: 15px;
    justify-content: center;
`;

const CancelButton = styled.button`
    padding: 12px 25px;
    background: rgba(0, 180, 216, 0.15);
    color: #00e6ff;
    border: 1px solid #00b4d8;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.3s;
    font-family: 'Rajdhani', sans-serif;
    font-weight: 600;
    font-size: 1rem;
    display: flex;
    align-items: center;
    gap: 8px;

    &:hover {
        background: rgba(0, 180, 216, 0.25);
        box-shadow: 0 0 15px rgba(0, 180, 216, 0.4);
        transform: translateY(-2px);
    }
`;

const ConfirmButton = styled.button`
    padding: 12px 25px;
    background: rgba(244, 67, 54, 0.2);
    color: #ff5252;
    border: 1px solid rgba(244, 67, 54, 0.5);
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.3s;
    font-family: 'Rajdhani', sans-serif;
    font-weight: 600;
    font-size: 1rem;
    display: flex;
    align-items: center;
    gap: 8px;

    &:hover {
        background: rgba(244, 67, 54, 0.35);
        box-shadow: 0 0 15px rgba(244, 67, 54, 0.4);
        transform: translateY(-2px);
    }
`;
