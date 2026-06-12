import {FC, useState} from 'react';
import styled from '@emotion/styled';

const ModalOverlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.8);
    backdrop-filter: blur(5px);
    z-index: 1000;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const ModalContainer = styled.div`
    background: linear-gradient(145deg, #132f4c, #0a1929);
    border: 2px solid rgba(0, 180, 216, 0.5);
    border-radius: 20px;
    padding: 30px;
    width: 90%;
    max-width: 450px;
    box-shadow: 0 0 40px rgba(0, 180, 216, 0.3);
`;

const ModalTitle = styled.h3`
    font-family: 'Orbitron', sans-serif;
    font-size: 1.5rem;
    color: #00e6ff;
    margin-bottom: 20px;
    display: flex;
    align-items: center;
    gap: 10px;
    text-shadow: 0 0 10px rgba(0, 230, 255, 0.3);
`;

const ModalDescription = styled.p`
    color: #cceeff;
    margin-bottom: 20px;
    font-size: 0.9rem;
`;

const InputLabel = styled.label`
    display: block;
    color: #a0a0a0;
    margin-bottom: 8px;
    font-weight: 600;
`;

const Input = styled.input`
    width: 100%;
    padding: 12px 16px;
    background: rgba(0, 180, 216, 0.1);
    border: 1px solid rgba(0, 180, 216, 0.4);
    border-radius: 10px;
    color: #e0e0e0;
    font-family: 'Rajdhani', sans-serif;
    font-size: 1rem;
    margin-bottom: 20px;
    transition: all 0.3s;

    &:focus {
        outline: none;
        border-color: #00b4d8;
        box-shadow: 0 0 15px rgba(0, 180, 216, 0.3);
        background: rgba(0, 180, 216, 0.15);
    }

    &::placeholder {
        color: #6a8aae;
    }
`;

const ButtonGroup = styled.div`
    display: flex;
    gap: 15px;
    justify-content: flex-end;
`;

const ConnectButton = styled.button`
    padding: 10px 24px;
    background: linear-gradient(90deg, #0066cc, #00b4d8);
    color: white;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    font-family: 'Rajdhani', sans-serif;
    font-weight: 600;
    transition: all 0.3s;

    &:hover:not(:disabled) {
        transform: translateY(-2px);
        box-shadow: 0 0 15px rgba(0, 180, 216, 0.5);
    }

    &:disabled {
        opacity: 0.6;
        cursor: not-allowed;
    }
`;

const CancelButton = styled.button`
    padding: 10px 24px;
    background: rgba(0, 180, 216, 0.15);
    color: #00e6ff;
    border: 1px solid #00b4d8;
    border-radius: 8px;
    cursor: pointer;
    font-family: 'Rajdhani', sans-serif;
    font-weight: 600;
    transition: all 0.3s;

    &:hover {
        background: rgba(0, 180, 216, 0.25);
        transform: translateY(-2px);
    }
`;

const ErrorText = styled.p`
    color: #ff6b6b;
    font-size: 0.85rem;
    margin-top: -15px;
    margin-bottom: 15px;
`;

interface FaceItConnectModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConnect: (nickname: string) => Promise<void>;
    isConnecting: boolean;
}

export const FaceItConnectModal: FC<FaceItConnectModalProps> = ({
                                                                    isOpen,
                                                                    onClose,
                                                                    onConnect,
                                                                    isConnecting
                                                                }) => {
    const [nickname, setNickname] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async () => {
        if (!nickname.trim()) {
            setError('Введите никнейм FaceIt аккаунта');
            return;
        }

        setError('');
        await onConnect(nickname.trim());
        setNickname('');
    };

    const handleClose = () => {
        setNickname('');
        setError('');
        onClose();
    };

    if (!isOpen) return null;

    return (
        <ModalOverlay onClick={handleClose}>
            <ModalContainer onClick={(e) => e.stopPropagation()}>
                <ModalTitle>
                    <i className="fab fa-faceit"></i>
                    Подключение FaceIt
                </ModalTitle>
                <ModalDescription>
                    Введите никнейм вашего аккаунта на FaceIt. После подключения вам станет доступна статистика игр.
                </ModalDescription>
                <InputLabel>Никнейм FaceIt</InputLabel>
                <Input
                    type="text"
                    placeholder="Введите никнейм..."
                    value={nickname}
                    onChange={(e) => setNickname(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSubmit()}
                />
                {error && <ErrorText>{error}</ErrorText>}
                <ButtonGroup>
                    <CancelButton onClick={handleClose}>
                        Отмена
                    </CancelButton>
                    <ConnectButton onClick={handleSubmit} disabled={isConnecting}>
                        {isConnecting ? (
                            <>
                                <i className="fas fa-spinner fa-spin"></i> Подключение...
                            </>
                        ) : (
                            <>
                                <i className="fab fa-faceit"></i> Подключить
                            </>
                        )}
                    </ConnectButton>
                </ButtonGroup>
            </ModalContainer>
        </ModalOverlay>
    );
};
