import { FC, useState } from 'react';
import {
    CharacterCount,
    CloseButton, FormGroup, Label, ModalBody, ModalButton,
    ModalContent, ModalFooter, ModalHeader,
    ModalOverlay, ModalText, ModalTitle, TextArea
} from "@/modules/user/events/components/eventDetailsPage/modals/joinTeamModal/styles.ts";
import { useSendTeamRequestMutation } from "@/store/reducers/teamApi/teamApi";

interface JoinTeamModalProps {
    isOpen: boolean;
    teamName: string;
    teamId: number;  // Добавлен teamId
    onClose: () => void;
    onJoin: (message: string) => void;
}

export const JoinTeamModal: FC<JoinTeamModalProps> = ({
                                                          isOpen,
                                                          teamName,
                                                          teamId,
                                                          onClose,
                                                          onJoin
                                                      }) => {
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const maxMessageLength = 500;
    const [sendRequest, { isLoading }] = useSendTeamRequestMutation();

    const handleSubmit = async () => {
        if (!message.trim()) {
            setError('Напишите сопроводительное письмо');
            return;
        }

        setError('');

        try {
            await sendRequest({ teamId, message: message.trim() }).unwrap();
            if (onJoin) {
                onJoin(message.trim());
            }
            setMessage('');
            onClose();
        } catch (error: any) {
            console.error('Error sending request:', error);
            setError(error.data?.message || 'Ошибка при отправке заявки');
        }
    };

    const handleClose = () => {
        setMessage('');
        setError('');
        onClose();
    };

    return (
        <ModalOverlay isOpen={isOpen}>
            <ModalContent>
                <ModalHeader>
                    <ModalTitle>Вступление в команду</ModalTitle>
                    <CloseButton onClick={handleClose}>&times;</CloseButton>
                </ModalHeader>

                <ModalBody>
                    <ModalText>
                        Вы хотите вступить в команду <strong>"{teamName}"</strong>.
                        Напишите, почему вы хотите присоединиться к этой команде:
                    </ModalText>

                    {error && (
                        <div style={{
                            color: '#ff6b6b',
                            padding: '10px',
                            marginBottom: '15px',
                            backgroundColor: 'rgba(255, 107, 107, 0.1)',
                            borderRadius: '8px',
                            fontSize: '0.9rem'
                        }}>
                            {error}
                        </div>
                    )}

                    <FormGroup>
                        <Label>Ваше сообщение команде *</Label>
                        <TextArea
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            placeholder="Расскажите о себе, своем опыте и почему вы хотите вступить в команду..."
                            maxLength={maxMessageLength}
                            disabled={isLoading}
                        />
                        <CharacterCount>
                            {message.length}/{maxMessageLength}
                        </CharacterCount>
                    </FormGroup>
                </ModalBody>

                <ModalFooter>
                    <ModalButton variant="secondary" onClick={handleClose} disabled={isLoading}>
                        Отмена
                    </ModalButton>
                    <ModalButton
                        variant="primary"
                        onClick={handleSubmit}
                        disabled={!message.trim() || isLoading}
                    >
                        {isLoading ? 'Отправка...' : 'Отправить заявку'}
                    </ModalButton>
                </ModalFooter>
            </ModalContent>
        </ModalOverlay>
    );
};
